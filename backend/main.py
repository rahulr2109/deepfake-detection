from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from services.image_service import process_image
from services.video_service import process_video

app = FastAPI()

@app.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    image = await file.read()
    result = process_image(image)
    return JSONResponse(content={"prediction": result})

@app.post("/predict/video")
async def predict_video(file: UploadFile = File(...)):
    video = await file.read()
    result = process_video(video)
    return JSONResponse(content={"prediction": result})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
