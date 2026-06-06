import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Camera, RefreshCw, X, Lightbulb, Zap, Sparkles, Wand2, ShieldAlert, Loader2, Upload } from 'lucide-react';
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";
import { ScreenPath } from '../types';

interface ShootCameraGuideViewProps {
  onNavigate: (path: ScreenPath) => void;
  onShowNotification?: (msg: string) => void;
}

const connections = [
  [11, 13], [13, 15],
  [12, 14], [14, 16],
  [11, 12],
  [11, 23], [12, 24],
  [23, 24],
  [23, 25], [25, 27],
  [24, 26], [26, 28]
];

export default function ShootCameraGuideView({ onNavigate, onShowNotification }: ShootCameraGuideViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const poseLandmarkerRef = useRef<PoseLandmarker | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef(-1);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [secondsLeft, setSecondsLeft] = useState(8);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState('');
  const [cameraError, setError] = useState<string | null>(null);
  const [realtimeTip, setRealtimeTip] = useState("正在初始化 AI 系统...");

  // Initialize MediaPipe and Camera
  useEffect(() => {
    let mounted = true;

    const initPose = async () => {
      try {
        setRealtimeTip("正在加载 AI 模型...");
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numPoses: 1
        });

        if (!mounted) return;

        poseLandmarkerRef.current = poseLandmarker;
        setRealtimeTip("正在开启摄像头...");
        startCamera();
      } catch (err) {
        console.error("AI Init error:", err);
        setError("无法初始化 AI 系统，请尝试刷新页面。");
      }
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 720 },
            height: { ideal: 1280 }
          },
          audio: false
        });
        
        if (!mounted) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            predictWebcam();
          };
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setError("无法打开摄像头，请允许浏览器访问摄像头，或使用上传视频功能。");
      }
    };

    initPose();

    return () => {
      mounted = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      poseLandmarkerRef.current?.close();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const predictWebcam = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const poseLandmarker = poseLandmarkerRef.current;

    if (!video || !canvas || !poseLandmarker) {
      animationRef.current = requestAnimationFrame(predictWebcam);
      return;
    }

    if (video.readyState >= 2 && video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;

      const width = video.videoWidth;
      const height = video.videoHeight;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        const result = poseLandmarker.detectForVideo(video, performance.now());

        if (result.landmarks && result.landmarks.length > 0) {
          drawPose(ctx, result.landmarks[0], width, height);
          updateRealtimeStatus(result.landmarks[0]);
        } else {
          setRealtimeTip("正在寻找人体...");
        }
      }
    }

    animationRef.current = requestAnimationFrame(predictWebcam);
  };

  const drawPose = (ctx: CanvasRenderingContext2D, landmarks: any[], width: number, height: number) => {
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    // Draw connections
    ctx.strokeStyle = "rgba(34, 211, 238, 0.9)";
    connections.forEach(([start, end]) => {
      const a = landmarks[start];
      const b = landmarks[end];

      if (!a || !b) return;
      if ((a.visibility ?? 1) < 0.45 || (b.visibility ?? 1) < 0.45) return;

      ctx.beginPath();
      ctx.moveTo(a.x * width, a.y * height);
      ctx.lineTo(b.x * width, b.y * height);
      ctx.stroke();
    });

    // Draw points
    landmarks.forEach((point, index) => {
      if ((point.visibility ?? 1) < 0.45) return;
      // Skip face points except nose for cleaner UI
      if (index > 0 && index < 11) return;

      const x = point.x * width;
      const y = point.y * height;

      ctx.beginPath();
      ctx.arc(x, y, (index === 15 || index === 16) ? 7 : 5, 0, Math.PI * 2);
      ctx.fillStyle = (index === 15 || index === 16) ? "#d6ff00" : "#34f58b";
      ctx.shadowBlur = 10;
      ctx.shadowColor = (index === 15 || index === 16) ? "#d6ff00" : "#34f58b";
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  };

  const updateRealtimeStatus = (landmarks: any[]) => {
    const leftWrist = landmarks[15];
    const rightWrist = landmarks[16];
    const nose = landmarks[0];
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];

    const wristsVisible = (leftWrist?.visibility ?? 0) > 0.45 || (rightWrist?.visibility ?? 0) > 0.45;
    const fullBodyVisible = (nose?.visibility ?? 0) > 0.45 && (leftAnkle?.visibility ?? 0) > 0.35 && (rightAnkle?.visibility ?? 0) > 0.35;

    if (!fullBodyVisible) {
      setRealtimeTip("请后退一点，保持全身入镜");
    } else if (!wristsVisible) {
      setRealtimeTip("请让持拍手进入画面");
    } else {
      setRealtimeTip("身体已入框，可以开始录制");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    uploadVideo(file);
  };

  const uploadVideo = async (file: File | Blob) => {
    setIsProcessing(true);
    setAnalysisStatus('正在上传视频...');

    try {
      const formData = new FormData();
      formData.append('video', file, file instanceof File ? file.name : "camera_recording.webm");
      formData.append('mode', 'action');
      formData.append('question', '请分析我的羽毛球动作');

      // UI status rotation
      const timers = [
        setTimeout(() => setAnalysisStatus('正在抽取关键帧...'), 2000),
        setTimeout(() => setAnalysisStatus('正在识别身体姿态...'), 4000),
        setTimeout(() => setAnalysisStatus('正在生成姿态标注视频...'), 6000),
        setTimeout(() => setAnalysisStatus('正在生成动作说明书...'), 8500),
      ];

      const res = await fetch('http://localhost:8000/api/analyze-video', {
        method: 'POST',
        body: formData
      });

      timers.forEach(t => clearTimeout(t));

      if (!res.ok) throw new Error('Analysis failed');

      const result = await res.json();
      if (!result.success) throw new Error(result.error || '分析失败');

      localStorage.setItem('analysisResult', JSON.stringify(result));
      onNavigate('manual-action' as ScreenPath);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '分析过程中出现错误');
      setIsProcessing(false);
    }
  };

  const startRecordingFlow = async () => {
    if (!streamRef.current) return;

    // Start 3s countdown
    setCountdown(3);
    const countTimer1 = setTimeout(() => setCountdown(2), 1000);
    const countTimer2 = setTimeout(() => setCountdown(1), 2000);

    setTimeout(() => {
      setCountdown(null);
      setIsRecording(true);
      setSecondsLeft(8);
      chunksRef.current = [];

      const recorder = new MediaRecorder(streamRef.current!, {
        mimeType: "video/webm"
      });

      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        uploadVideo(blob);
      };

      recorder.start();

      // 8s recording timer
      const recordingInterval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(recordingInterval);
            recorder.stop();
            setIsRecording(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-40 bg-[#000000] flex flex-col justify-between overflow-hidden"
    >
      {/* Top Header Controls Overlay */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 h-16 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('shoot-entrance')}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors text-white outline-none cursor-pointer"
          >
            <X size={20} />
          </button>
          <span className="font-display font-black text-sm italic uppercase text-white tracking-widest">
            {isRecording ? "正在录制 / RECORDING" : "拍动作 / AI CAMERA"}
          </span>
        </div>

        <div className="text-right">
          <div className="font-mono font-black text-xs text-[#CCFF00] leading-tight">
            {isRecording ? "REC" : "LIVE"} <span className="text-[9px] font-sans font-light text-white/50 ml-1">v4.2</span>
          </div>
        </div>
      </header>

      {/* Camera Stage */}
      <div className="absolute inset-0 z-0 bg-neutral-900">
        <div className="camera-stage w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera-preview"
          />
          <canvas
            ref={canvasRef}
            className="pose-canvas"
          />
          
          {/* Dash Scan Line */}
          <div className="camera-overlay-line z-10" />

          {/* Grid */}
          <div className="absolute inset-0 border-[1px] border-white/5 pointer-events-none grid grid-cols-4">
            <div className="border-r border-white/5" />
            <div className="border-r border-white/5" />
            <div className="border-r border-white/5" />
          </div>
        </div>
      </div>

      {/* Silhouette Overlay */}
      <div className="human-guide-frame flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-[300px] h-[520px] border-2 border-dashed border-white/10 rounded-[40px] flex items-center justify-center"
        >
          {/* Head */}
          <div className="absolute top-12 w-20 h-20 border-2 border-dashed border-[#00e3fd]/40 rounded-full" />
          {/* Shoulders */}
          <div className="absolute top-40 w-56 h-[1px] border-t border-dashed border-[#00e3fd]/30" />
          {/* Arms Area */}
          <div className="absolute top-36 -left-12 w-20 h-40 border border-dashed border-white/10 rounded-full rotate-12" />
          <div className="absolute top-36 -right-12 w-20 h-40 border border-dashed border-white/10 rounded-full -rotate-12" />
          {/* Torso */}
          <div className="absolute top-[220px] w-40 h-44 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]" />
          {/* Feet */}
          <div className="absolute bottom-10 flex justify-between w-56">
            <div className="w-16 h-8 border-b-2 border-r-2 border-[#CCFF00]/50 rounded-br-xl" />
            <div className="w-16 h-8 border-b-2 border-l-2 border-[#CCFF00]/50 rounded-bl-xl" />
          </div>
          
          <div className="absolute -bottom-12 text-[#CCFF00]/60 font-mono text-[9px] uppercase tracking-widest">
            Align body to silhouette
          </div>
        </motion.div>
      </div>

      {/* Central Overlays (Countdown / Processing) */}
      <AnimatePresence>
        {countdown !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <span className="font-display font-black text-8xl text-[#CCFF00] drop-shadow-[0_0_30px_rgba(204,255,0,0.8)]">
              {countdown}
            </span>
          </motion.div>
        )}

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <Loader2 className="animate-spin text-[#CCFF00] mb-6" size={60} />
            <h3 className="text-[#CCFF00] font-display font-black text-xl uppercase tracking-widest mb-2">
              Analysis Active
            </h3>
            <p className="text-white font-mono text-sm tracking-wider animate-pulse">{analysisStatus}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {cameraError && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[80%] bg-black/90 border border-red-500/50 p-6 rounded-2xl text-center shadow-2xl">
          <ShieldAlert className="text-red-500 mx-auto mb-4" size={40} />
          <h4 className="text-white font-bold mb-2">权限或系统错误</h4>
          <p className="text-white/70 text-xs leading-relaxed mb-6">{cameraError}</p>
          <button
            onClick={() => setError(null)}
            className="w-full py-3 bg-white/10 rounded-lg text-white text-xs uppercase font-bold"
          >
            关闭 / CLOSE
          </button>
        </div>
      )}

      {/* AI Status Labels */}
      <div className="ai-status-chip">
        <div className="flex items-center gap-2 bg-black/50 border border-[#CCFF00]/25 px-3 py-1.5 rounded-full backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
          <span className="font-mono text-[9px] text-[#CCFF00] font-black uppercase">
            {isRecording ? `正在录制 8s 动作` : realtimeTip}
          </span>
        </div>
        {!isRecording && (
          <div className="flex items-center gap-2 bg-black/40 border border-white/5 px-3 py-1.5 rounded-full backdrop-blur-md opacity-60">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="font-mono text-[9px] text-white/70 uppercase">
              请保持全身入镜
            </span>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <footer className="absolute bottom-8 inset-x-0 z-30 px-6">
        <div className="flex flex-col gap-4 bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
          {!isRecording ? (
            <>
              <div className="text-center mb-2">
                <h3 className="text-white font-display font-black text-lg uppercase tracking-tight">准备录制动作</h3>
                <p className="text-white/50 text-[10px] mt-1">站进虚线框，AI 会一步一步教你完成动作</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Upload size={18} className="text-[#00e3fd]" />
                  <span className="text-[9px] font-bold text-white uppercase">上传视频</span>
                  <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="video/*" onChange={handleFileUpload} />
                </button>

                <button
                  onClick={startRecordingFlow}
                  disabled={isProcessing}
                  className="flex-[2.5] py-4 bg-[#CCFF00] text-black rounded-xl font-display font-black text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(204,255,0,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                  开始录制 / START REC
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                />
              </div>
              <div className="flex justify-between w-full items-center">
                <span className="text-white font-mono text-xs font-black">RECORDING...</span>
                <span className="text-[#CCFF00] font-mono text-lg font-black">{secondsLeft}s</span>
              </div>
            </div>
          )}
        </div>
      </footer>
    </motion.div>
  );
}
