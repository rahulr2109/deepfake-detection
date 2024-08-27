from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from bson import ObjectId
import logging
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta

load_dotenv()
logging.basicConfig()

MONGO_DETAILS = os.getenv("MONGO_DETAILS")
SECRET_KEY = os.getenv("SECRET_KEY")
client = None
database = None
users_collection = None

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function to create a JWT token
def create_jwt_token(data: dict):
    payload = {
        "sub": data["user_id"]
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, database, users_collection
    try:
        client = AsyncIOMotorClient(MONGO_DETAILS)
        database = client.my_database
        users_collection = database.get_collection("users")
        logging.info("Connected to MongoDB successfully!")
        yield
    finally:
        if client:
            client.close()
            logging.info("MongoDB connection closed.")

app = FastAPI(lifespan=lifespan)

# Configure CORS
origins = [
    "http://localhost:5173",  # React frontend URL
    "http://127.0.0.1:5173",  # React frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)

# Define the User model for registration
class User(BaseModel):
    username: str
    email: str
    password: str

# Define the Login model
class LoginUser(BaseModel):
    email: str
    password: str

@app.post("/register")
async def register_user(user: User):
    # Check if the username or email already exists
    existing_user = await users_collection.find_one({"$or": [{"username": user.username}, {"email": user.email}]})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    
    # Hash the password
    hashed_password = pwd_context.hash(user.password)
    
    # Create a new user document
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    }
    
    # Insert the new user into the database
    result = await users_collection.insert_one(new_user)
    
    if result.inserted_id:
        # Generate JWT token
        token = create_jwt_token({"user_id": str(new_user["email"])})
        return {"message": "User registered successfully", "token": token, "status": 200}
    else:
        raise HTTPException(status_code=500, detail="Failed to register user")

@app.post("/login")
async def login_user(user: LoginUser):
    # Check if the user exists
    existing_user = await users_collection.find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Check if the password is correct
    if not pwd_context.verify(user.password, existing_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Generate JWT token
    token = create_jwt_token({"user_id": str(existing_user["email"])})
    return {"message": "Login successful", "token": token, "status": 200}

  




@app.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    image = await file.read()
    result = 'Real'
    return JSONResponse(content={"prediction": result})

@app.post("/predict/video")
async def predict_video(file: UploadFile = File(...)):
    video = await file.read()
    result = 'Real'
    return JSONResponse(content={"prediction": result})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
