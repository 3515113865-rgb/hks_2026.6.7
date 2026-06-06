import os
import cv2
import uuid
import numpy as np
from ultralytics import YOLO

# Load model once
model_path = os.path.join(os.path.dirname(__file__), "models", "yolo11n-pose.pt")
if not os.path.exists(model_path):
    # fallback to download if not exists
    model_path = "yolov8n-pose.pt"

model = YOLO(model_path)

import subprocess
import shutil

# COCO keypoint indices
KEYPOINT_NAMES = [
    "nose", "left_eye", "right_eye", "left_ear", "right_ear",
    "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
    "left_wrist", "right_wrist", "left_hip", "right_hip",
    "left_knee", "right_knee", "left_ankle", "right_ankle"
]

def create_annotated_pose_video(video_path: str, action_guess: str) -> str:
    """
    输入原视频路径，输出带 YOLO-Pose 骨骼点标注的视频。
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return ""

    fps = cap.get(cv2.CAP_PROP_FPS) or 25
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    output_name = f"annotated_{uuid.uuid4().hex[:8]}.mp4"
    temp_output_name = f"temp_{output_name}"
    
    output_dir = os.path.join(os.path.dirname(__file__), "outputs")
    output_path = os.path.join(output_dir, output_name)
    temp_output_path = os.path.join(output_dir, temp_output_name)

    # ALWAYS use mp4v for cv2, then ffmpeg it to h264 for web
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(temp_output_path, fourcc, fps, (width, height))

    frame_index = 0
    last_annotated = None
    
    # Process up to 300 frames (~10 seconds at 30fps) for MVP to keep it fast
    max_frames = 300 

    while frame_index < min(total_frames, max_frames):
        ret, frame = cap.read()
        if not ret:
            break

        # Process every 2 frames to speed up
        if frame_index % 2 == 0:
            results = model.predict(frame, verbose=False)
            if results and len(results) > 0:
                annotated_frame = results[0].plot()
                last_annotated = annotated_frame
            else:
                annotated_frame = frame
                last_annotated = frame
        else:
            annotated_frame = last_annotated if last_annotated is not None else frame

        # Ensure frame size matches writer exactly
        annotated_frame = cv2.resize(annotated_frame, (width, height))

        # Add text overlay
        cv2.putText(
            annotated_frame,
            "AI Pose Tracking",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (52, 245, 139), # bright green matching neon theme
            2
        )
        
        cv2.putText(
            annotated_frame,
            f"action: {action_guess}",
            (20, 80),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 227, 253), # cyan
            2
        )

        writer.write(annotated_frame)
        frame_index += 1

    cap.release()
    writer.release()

    # Convert to browser compatible format using ffmpeg if available
    if shutil.which("ffmpeg"):
        try:
            subprocess.run([
                "ffmpeg",
                "-y",
                "-i", temp_output_path,
                "-vcodec", "libx264",
                "-pix_fmt", "yuv420p",
                output_path
            ], check=True, capture_output=True)
            # Remove temp file
            if os.path.exists(temp_output_path):
                os.remove(temp_output_path)
        except Exception as e:
            print(f"FFmpeg conversion failed: {e}")
            # If conversion fails, rename temp to output and hope browser supports mp4v
            if os.path.exists(temp_output_path):
                os.rename(temp_output_path, output_path)
    else:
        # No ffmpeg, just use the mp4v file
        print("FFmpeg not found. Using mp4v encoding which might not be supported in some browsers.")
        if os.path.exists(temp_output_path):
            os.rename(temp_output_path, output_path)

    # verify file exists and size
    if os.path.exists(output_path):
        size = os.path.getsize(output_path)
        print(f"annotated video path: {output_path}")
        print(f"exists: True")
        print(f"size: {size}")
        if size == 0:
            return ""
            
    return f"/outputs/{output_name}"

def analyze_video_pose(video_path: str, mode: str = "action", question: str = "") -> dict:
    """
    输入视频路径，返回人体姿态识别和动作分析结果。
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return {"success": False, "error": "Cannot open video"}

    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if fps <= 0:
        fps = 30
    duration = total_frames / fps

    # Extract ~3 frames per second, max 24 frames
    sample_rate = max(1, int(fps / 3))
    max_frames_to_process = 24

    frames_processed = 0
    best_frame_data = None
    best_score = -1
    best_annotated_frame = None

    frame_idx = 0
    while cap.isOpened() and frames_processed < max_frames_to_process:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_idx % sample_rate == 0:
            # Analyze frame
            results = model.predict(frame, verbose=False)
            result = results[0]
            
            if result.keypoints is not None and len(result.keypoints.xy) > 0:
                # Get the first person's keypoints
                kpts = result.keypoints.xy[0].cpu().numpy() # (17, 2)
                confs = result.keypoints.conf[0].cpu().numpy() if result.keypoints.conf is not None else np.ones(17)
                
                # Simple heuristic for best frame:
                # We want the arm to be active, e.g., wrist as high as possible.
                # In image coordinates, smaller y is higher.
                left_wrist_y = kpts[9][1] if confs[9] > 0.5 else float('inf')
                right_wrist_y = kpts[10][1] if confs[10] > 0.5 else float('inf')
                
                # Score can be inverse of the minimum y of wrists (higher in image is better)
                # plus confidence of keypoints
                valid_kpts = np.sum(confs > 0.5)
                highest_wrist_y = min(left_wrist_y, right_wrist_y)
                
                # Height of the image to normalize
                h, w, _ = frame.shape
                
                # Avoid infinity
                if highest_wrist_y == float('inf'):
                    highest_wrist_y = h
                    
                score = valid_kpts * 10 + (h - highest_wrist_y)
                
                if score > best_score:
                    best_score = score
                    
                    # Convert keypoints to dict format for output
                    pose_keypoints = []
                    for i in range(17):
                        if confs[i] > 0.3:
                            pose_keypoints.append({
                                "name": KEYPOINT_NAMES[i],
                                "x": float(kpts[i][0]),
                                "y": float(kpts[i][1]),
                                "confidence": float(confs[i])
                            })
                    
                    box = []
                    if result.boxes is not None and len(result.boxes.xyxy) > 0:
                        b = result.boxes.xyxy[0].cpu().numpy()
                        box = [float(b[0]), float(b[1]), float(b[2]), float(b[3])]
                        
                    best_frame_data = {
                        "pose_keypoints": pose_keypoints,
                        "box": box,
                        "time": frame_idx / fps
                    }
                    best_annotated_frame = result.plot()
            
            frames_processed += 1
            
        frame_idx += 1

    cap.release()

    if not best_frame_data:
        return {"success": False, "error": "No person detected in video"}

    # Save the best frame
    output_filename = f"keyframe_{uuid.uuid4().hex[:8]}.jpg"
    output_path = os.path.join(os.path.dirname(__file__), "outputs", output_filename)
    cv2.imwrite(output_path, best_annotated_frame)
    
    keyframe_url = f"/outputs/{output_filename}"

    # Analyze action based on best frame's keypoints
    action_guess = "羽毛球击球动作"
    
    kpts_dict = {kp["name"]: kp for kp in best_frame_data["pose_keypoints"]}
    
    def get_y(name):
        return kpts_dict[name]["y"] if name in kpts_dict else None
        
    def get_x(name):
        return kpts_dict[name]["x"] if name in kpts_dict else None

    # Determine dominant arm (the one whose wrist is higher)
    left_wrist_y = get_y("left_wrist") or float('inf')
    right_wrist_y = get_y("right_wrist") or float('inf')
    
    if left_wrist_y < right_wrist_y:
        dominant_wrist = "left_wrist"
        dominant_elbow = "left_elbow"
        dominant_shoulder = "left_shoulder"
    else:
        dominant_wrist = "right_wrist"
        dominant_elbow = "right_elbow"
        dominant_shoulder = "right_shoulder"
        
    w_y = get_y(dominant_wrist)
    e_y = get_y(dominant_elbow)
    s_y = get_y(dominant_shoulder)
    n_y = get_y("nose")
    h_y = get_y("right_hip") or get_y("left_hip")
    k_y = get_y("right_knee") or get_y("left_knee")

    # Image y goes down, so smaller y means higher position
    if w_y and s_y and n_y:
        if w_y < n_y and e_y and e_y < s_y:
            # Wrist above head, elbow high -> likely Jump Smash or Clear
            # Check jump (knees high relative to hip, but in a single frame it's hard, 
            # we'll just differentiate roughly)
            action_guess = "跳杀" 
        elif w_y < s_y:
            action_guess = "高远球"
    
    if h_y and k_y and w_y and s_y:
        if w_y > s_y and (h_y - k_y) < 100: # rough estimate of low center
            action_guess = "接杀"
            
    # --- Dynamic Scoring based on rules ---
    score_power = 70
    score_hit_point = 68
    score_timing = 66
    score_coord = 72

    strengths = []
    problems = []
    frame_obs = []
    training_recs = []

    if w_y is not None and s_y is not None and n_y is not None:
        # Hit Point
        if w_y < n_y - 20: # Wrist significantly above head
            score_hit_point = 88
            strengths.append("击球点较高")
            frame_obs.append("关键帧中手腕高度明显超过头部，击球点理想")
        elif w_y < n_y + 10:
            score_hit_point = 78
            problems.append("击球点基本合理，但仍可更高")
            frame_obs.append("关键帧中手腕高度接近头部，具备一定击球高度")
            training_recs.append("高点击球挥拍 3 组")
        else:
            score_hit_point = 62
            problems.append("击球点偏低")
            frame_obs.append("手腕高度低于头部甚至接近肩部，击球点不佳")
            training_recs.append("高点击球定点练习 10 分钟")
            
        # Power / Arm Extension
        if e_y is not None:
            if e_y < s_y and w_y < e_y:
                score_power = 85
                strengths.append("挥拍链路较完整")
                frame_obs.append("右侧肩肘形成发力链路")
            elif w_y < s_y:
                score_power = 72
                problems.append("发力链路不够完整")
                frame_obs.append("手臂抬起但展开不足，肘部偏低")
                training_recs.append("拉弓引拍针对性练习 20 次")
            else:
                score_power = 58
                problems.append("主要靠手臂发力")
                frame_obs.append("手臂主要在身体前方，没有明显引拍")
                training_recs.append("发力传递链基础动作纠正")

    if h_y is not None and k_y is not None:
        # Timing / Jump
        if (k_y - h_y) > 150: # Legs extended
            score_timing = 82
            strengths.append("有起跳发力趋势")
            frame_obs.append("下肢支撑明显，重心上移")
        elif (k_y - h_y) > 80:
            score_timing = 68
            problems.append("起跳不充分")
            frame_obs.append("膝盖弯曲但重心没有明显上移")
            training_recs.append("起跳落地稳定训练 3 组")
        else:
            score_timing = 55
            problems.append("下肢参与不足")
            frame_obs.append("下肢变化不明显，发力孤立")
            training_recs.append("下肢蹬地发力练习 5 组")

    # Coordination (rough proxy using missing points)
    valid_pts = len(kpts_dict)
    if valid_pts > 12:
        score_coord = 85
        strengths.append("身体协调较好")
        frame_obs.append("身体各部位在画面中舒展自然")
    elif valid_pts > 8:
        score_coord = 72
        problems.append("转体幅度不足")
        frame_obs.append("躯干转动少，部分肢体动作被遮挡")
        training_recs.append("转体发力抗阻练习 3 组")
    else:
        score_coord = 60
        problems.append("身体稳定性不足")
        frame_obs.append("姿态不稳定或检测点缺失较多")

    # Generate dynamic summary
    if len(problems) >= 2:
        summary = f"你的{action_guess}动作已经具备基础动作框架，但{problems[0]}，{problems[1]}，建议优先进行针对性训练。"
    elif len(problems) == 1:
        summary = f"你的{action_guess}动作整体不错，但在{problems[0]}方面还有提升空间。"
    else:
        summary = f"你的{action_guess}动作整体完成度较好，发力链路和身体协调较稳定，后续可以继续巩固连续进攻能力。"

    if not kpts_dict:
        summary = "AI 已识别到视频中的羽毛球动作，但当前角度下关键点不完整。建议重新上传侧面或正侧面拍摄的视频，以获得更准确的动作分析。"
        problems = ["关键点检测不完整"]
        training_recs = ["请调整拍摄角度"]

    # Deduplicate training recommendations
    training_recs = list(set(training_recs))
    if not training_recs:
        training_recs = ["基础挥拍练习 20 次"]

    # Generate annotated video
    annotated_video_url = create_annotated_pose_video(video_path, action_guess)

    result = {
        "success": True,
        "mode": mode,
        "action_guess": action_guess,
        "confidence": 0.85, # mock overall confidence
        "video_duration": round(duration, 2),
        "keyframe_time": round(best_frame_data["time"], 2),
        "keyframe_image": keyframe_url,
        "annotated_video": annotated_video_url,
        "scores": {
            "power": score_power,
            "hit_point": score_hit_point,
            "timing": score_timing,
            "coordination": score_coord
        },
        "score_labels": {
            "power": "发力完整度",
            "hit_point": "击球点",
            "timing": "起跳时机",
            "coordination": "身体协调"
        },
        "analysis": {
            "summary": summary,
            "strengths": strengths,
            "problems": problems,
            "frame_observations": frame_obs,
            "training": training_recs
        },
        "detected_objects": [
            {
                "label": "person",
                "confidence": 0.95,
                "box": best_frame_data["box"]
            }
        ] if best_frame_data["box"] else [],
        "pose_keypoints": best_frame_data["pose_keypoints"],
        "manual": {
            "type": mode,
            "title": f"{action_guess}动作说明书",
            "summary": summary
        }
    }
    
    return result
