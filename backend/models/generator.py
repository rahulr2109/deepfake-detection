# models/generator.py
from tensorflow.keras.layers import BatchNormalization, ReLU, Dense, Reshape, Conv2DTranspose, LeakyReLU, Dropout, Flatten, Conv2D
from tensorflow.keras.models import Sequential

def build_generator():
    model = Sequential()
    model.add(Dense(256 * 8 * 8, activation="relu", input_dim=100))
    model.add(Reshape((8, 8, 256)))
    model.add(Conv2DTranspose(128, kernel_size=4, strides=2, padding="same"))
    model.add(BatchNormalization(momentum=0.8))
    model.add(ReLU())
    model.add(Conv2DTranspose(64, kernel_size=4, strides=2, padding="same"))
    model.add(BatchNormalization(momentum=0.8))
    model.add(ReLU())
    model.add(Conv2DTranspose(32, kernel_size=4, strides=2, padding="same"))
    model.add(BatchNormalization(momentum=0.8))
    model.add(ReLU())
    model.add(Conv2D(3, kernel_size=3, padding="same", activation='tanh'))
    return model
