import os
import uuid
import shutil
import logging
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pose_analyzer import analyze_video_pose

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For demo, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base directories
BASE_DIR = Path(__file__).resolve().parent
UPLOADS_DIR = BASE_DIR / "uploads"
OUTPUTS_DIR = BASE_DIR / "outputs"

UPLOADS_DIR.mkdir(exist_ok=True)
OUTPUTS_DIR.mkdir(exist_ok=True)

# Static files
app.mount("/outputs", StaticFiles(directory=str(OUTPUTS_DIR)), name="outputs")

@app.post("/api/analyze-video")
async def analyze_video(
    video: UploadFile = File(...),
    mode: str = Form("action"),
    question: str = Form("")
):
    logger.info(f"Received video analysis request: {video.filename}, mode={mode}")
    
    # Generate unique filename preserving extension
    ext = Path(video.filename).suffix or ".mp4"
    if ext.lower() == ".blob":
        ext = ".webm"
        
    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = UPLOADS_DIR / filename
    
    try:
        # Save uploaded file
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)
        
        logger.info(f"Saved upload to {filepath}")
        
        # Analyze video
        result = analyze_video_pose(str(filepath), mode, question)
        
        if not result.get("success"):
            raise HTTPException(status_code=500, detail=result.get("error", "视频分析失败"))
            
        return result
        
    except Exception as e:
        logger.error(f"Analysis failed: {repr(e)}")
        # Clean up if failed
        if filepath.exists():
            filepath.unlink()
        raise HTTPException(status_code=500, detail=f"服务器内部错误: {str(e)}")

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    # Important: host 0.0.0.0 for accessibility, port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
