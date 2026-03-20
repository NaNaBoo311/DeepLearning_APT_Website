# Deep Learning BTL Website

This repository contains the Full-Stack web application for the Deep Learning assignment.

## Project Structure

1. **`frontend/`**: The React + Tailwind CSS web application. It uses Vite as the build tool and HashRouter for compatibility with GitHub Pages.
2. **`backend/`**: A mock/placeholder FastAPI backend designed securely for future ML endpoint integration.

## Setup Instructions

### Frontend (React application)
```bash
cd frontend
npm install
npm run dev
```

### Backend (FastAPI application)
```bash
cd backend
python -m venv .venv

# Activate Virtual Environment
# Windows: .\.venv\Scripts\activate
# Mac/Linux: source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```
