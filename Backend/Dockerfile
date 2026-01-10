# Use official TensorFlow CPU image
FROM tensorflow/tensorflow:2.15.0-cpu

WORKDIR /app

# Copy requirements first (better caching)
COPY requirements.txt .

# Install only lightweight dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy app + model
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
