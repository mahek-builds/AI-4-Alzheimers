#!/bin/bash

# Ensure PORT is set by Railway
PORT=${PORT:-8000}

# Run FastAPI with Uvicorn
uvicorn main:app --host 0.0.0.0 --port $PORT
