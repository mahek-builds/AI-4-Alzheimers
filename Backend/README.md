# AI-Based Alzheimer Detection System (ML + Backend Module)

This repository contains the **Machine Learning / Deep Learning part and Backend API integration** of the AI-Based Alzheimer Detection System. It focuses on dataset preparation, CNN model training, evaluation, model saving, and FastAPI backend development for predictions.

---

## 👥 Contributors

* **Mahek** 
* **Hirdesh**

---

## 🎯 Objective

To develop a **CNN-based image classification model** that detects Alzheimer’s disease stages from MRI brain scans and exposes predictions through a backend API.

**Classification Classes:**

* Non Demented
* Very Mild Demented
* Mild Demented
* Moderate Demented

---

## 📂 Dataset Details

* MRI brain scan images
* Organized into 4 class folders
* Train–Validation Split: **80% / 20%**

### Preprocessing Steps

* Resize images to **128 × 128**
* Normalize pixel values (0–1)
* Optional data augmentation (rotation, zoom, flip)

---

## 🧠 CNN Model Architecture

* Convolutional Layers + ReLU
* MaxPooling Layers
* Dropout (to reduce overfitting)
* Fully Connected (Dense) Layers
* Softmax Output Layer

**Loss Function:** Categorical Crossentropy
**Optimizer:** Adam
**Metrics:** Accuracy

---

## 🚀 Training & Evaluation

* Epochs: **10–20**
* Validation accuracy & loss tracking
* Confusion Matrix & Classification Report
* Model saved as `cnn_model.h5`

---

## ⚡ Backend API (FastAPI)

### Features

* Accepts MRI images and returns predicted Alzheimer stage
* Stores patient info and predictions
* Health check endpoint

### Endpoints

* **POST /predict** – Upload MRI image, returns prediction JSON
* **POST /patient/save** – Store patient information
* **GET /ping** – API health check

### Technology Stack

* FastAPI
* Uvicorn
* SQLite for patient data storage
* Integration of Keras CNN model

---

## 📁 Repository Structure

```
ml_backend_alzheimer/
│
├── dataset/
│   ├── train/
│   │   ├── NonDemented/
│   │   ├── VeryMildDemented/
│   │   ├── MildDemented/
│   │   └── ModerateDemented/
│   └── val/
│       ├── NonDemented/
│       ├── VeryMildDemented/
│       ├── MildDemented/
│       └── ModerateDemented/
│
├── ml_dl/
│   ├── train_cnn.py          # CNN training script
│   ├── evaluate.py           # Model evaluation
│   └── saved_model/cnn_model.h5  # Trained model
│
├── backend/
│   ├── app.py                # FastAPI main app
│   ├── requirements.txt      # Dependencies
│   ├── database.py           # SQLite setup
│   ├── models/cnn_model.h5   # Copy of trained model
│   ├── routes/predict.py     # Predict endpoint
│   ├── routes/patient.py     # Patient info endpoint
│   └── utils/preprocess.py   # Image preprocessing
└── README.md
```

---

## 🛠️ Technologies Used

* Python
* TensorFlow / Keras
* NumPy
* OpenCV / Pillow
* Scikit-learn
* FastAPI / Uvicorn
* SQLite

---

## 📦 Deliverables

* `train_cnn.py` – CNN model training
* `evaluate.py` – Model evaluation
* `cnn_model.h5` – Trained model
* FastAPI backend scripts (`app.py`, `routes/*.py`, `database.py`, `utils/preprocess.py`)
* SQLite database `alzheimer.db`
* Preprocessed MRI dataset
* API documentation

---

## 🔗 Future Scope

* Hyperparameter tuning
* Transfer learning (VGG16, ResNet)
* Model explainability (Grad-CAM)
* Frontend (mobile/web) integration for predictions

---

## ▶️ How to Run

1. **Install dependencies**

```bash
pip install -r backend/requirements.txt
pip install -r ml_dl/requirements.txt
```

2. **Train the model (optional)**

```bash
python ml_dl/train_cnn.py
```

3. **Evaluate the model**

```bash
python ml_dl/evaluate.py
```

4. **Run FastAPI backend**

```bash
uvicorn backend.app:app --reload
```

5. **Test API endpoints** via Postman or any HTTP client

---

## 📄 License

This project is intended for academic and educational purposes only.
