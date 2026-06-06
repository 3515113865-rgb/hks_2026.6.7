import os
import uuid
import shutil
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pose_analyzer import analyze_video_pose

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

base_dir = os.path.dirname(__file__)
uploads_dir = os.path.join(base_dir, "uploads")
outputs_dir = os.path.join(base_dir, "outputs")

os.makedirs(uploads_dir, exist_ok=True)
os.makedirs(outputs_dir, exist_ok=True)

app.mount("/outputs", StaticFiles(directory=outputs_dir), name="outputs")

@app.post("/api/analyze-video")
async def analyze_video(
    video: UploadFile = File(...),
    mode: str = Form("action"),
    question: str = Form("")
):
    ext = video.filename.split(".")[-1] if "." in video.filename else "mp4"
    filename = f"{uuid.uuid4().hex}.{ext}"
    filepath = os.path.join(uploads_dir, filename)
    
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)
        
    result = analyze_video_pose(filepath, mode, question)
    
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
