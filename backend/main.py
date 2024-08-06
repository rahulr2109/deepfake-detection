from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
# from services.image_service import process_image
# from services.video_service import process_video
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",  # React frontend URL
    "http://127.0.0.1:5173",  # React frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow only specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


@app.get("/")
async def read_root():
    return {"message": "Welcome to the deepfake detection API!"}

@app.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    image = await file.read()
    # result = process_image(image)
    result = 'Real'
    return JSONResponse(content={"prediction": result})

@app.post("/predict/video")
async def predict_video(file: UploadFile = File(...)):
    video = await file.read()
    #result = process_video(video)
    result = 'Real'
    return JSONResponse(content={"prediction": result})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
