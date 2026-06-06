import io
import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import Response, JSONResponse
from PIL import Image
from ultralytics import YOLO

app = FastAPI(title="YOLO11 Pose Estimation API", description="API for body pose estimation using YOLO11.")

# Load the model
model_path = "yolo11n-pose.pt"
model = YOLO(model_path)

@app.post("/predict/pose/image")
async def predict_pose_image(file: UploadFile = File(...)):
    """
    Upload an image and get back the annotated image with pose estimation.
    """
    if not file.content_type.startswith("image/"):
        return JSONResponse(status_code=400, content={"error": "File provided is not an image."})
    
    # Read the image
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    
    # Run pose estimation
    results = model.predict(source=np.array(img), save=False, verbose=False)
    result = results[0]
    
    # Plot annotated image
    annotated_bgr = result.plot() # ndarray in BGR
    
    # Encode to JPEG
    success, encoded_image = cv2.imencode(".jpg", annotated_bgr)
    if not success:
        return JSONResponse(status_code=500, content={"error": "Failed to encode image."})
        
    return Response(content=encoded_image.tobytes(), media_type="image/jpeg")

@app.post("/predict/pose/json")
async def predict_pose_json(file: UploadFile = File(...)):
    """
    Upload an image and get back the keypoints and bounding boxes in JSON format.
    """
    if not file.content_type.startswith("image/"):
        return JSONResponse(status_code=400, content={"error": "File provided is not an image."})
    
    # Read the image
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    
    # Run pose estimation
    results = model.predict(source=np.array(img), save=False, verbose=False)
    result = results[0]
    
    # Extract keypoints and boxes
    output = []
    if result.keypoints is not None:
        keypoints = result.keypoints.xy.cpu().numpy().tolist() # shape (N, 17, 2)
        confs = result.keypoints.conf.cpu().numpy().tolist() if result.keypoints.conf is not None else None # shape (N, 17)
        boxes = result.boxes.xyxy.cpu().numpy().tolist() # shape (N, 4)
        
        for i in range(len(boxes)):
            person_data = {
                "box": boxes[i],
                "keypoints": keypoints[i],
            }
            if confs:
                person_data["keypoint_scores"] = confs[i]
            output.append(person_data)
            
    return JSONResponse(content={"persons": output})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
