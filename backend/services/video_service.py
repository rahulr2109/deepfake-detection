import cv2
import numpy as np
from models.discriminator import build_discriminator

discriminator = build_discriminator()
discriminator.load_weights('path_to_discriminator_weights')

def process_video(video_bytes):
    nparr = np.frombuffer(video_bytes, np.uint8)
    video = cv2.VideoCapture(cv2.imdecode(nparr, cv2.IMREAD_COLOR))
    frame_predictions = []

    while True:
        ret, frame = video.read()
        if not ret:
            break
        frame = cv2.resize(frame, (64, 64))
        frame = np.expand_dims(frame, axis=0)
        prediction = discriminator.predict(frame)[0][0]
        frame_predictions.append('fake' if prediction < 0.5 else 'real')

    video.release()
    return frame_predictions
