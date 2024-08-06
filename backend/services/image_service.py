import cv2
import numpy as np
from models.discriminator import build_discriminator

discriminator = build_discriminator()
discriminator.load_weights('path_to_discriminator_weights')

def process_image(image_bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    image = cv2.resize(image, (64, 64))
    image = np.expand_dims(image, axis=0)
    prediction = discriminator.predict(image)[0][0]
    return 'fake' if prediction < 0.5 else 'real'
