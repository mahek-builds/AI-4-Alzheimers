from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tensorflow as tf
from PIL import Image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

app = FastAPI(title="Alzheimer MRI Classification API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model(
    "alzheimer_Model_final.h5"
)

classes = [
    "Mild Impairment",
    "Moderate Impairment",
    "No Impairment",
    "Very Mild Impairment"
]

def prepare_image(image):
    image = image.convert("RGB")
    image = image.resize((224, 224))
    img_array = np.expand_dims(np.array(image), axis=0)
    return preprocess_input(img_array)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(file.file)
    img = prepare_image(image)

    preds = model.predict(img)
    idx = int(np.argmax(preds))
    confidence = float(np.max(preds)) * 100  # percent

    return {
        "prediction": classes[idx],
        "confidence": confidence
    }
