# Backend API Server

This is the FastAPI backend for the Deep Learning BTL Website.

## Setup Instructions

1. **Create Virtual Environment**:
   ```bash
   cd backend
   python -m venv .venv
   ```

2. **Activate Virtual Environment**:
   - On Windows:
     ```bash
     .\.venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Server**:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend will be available at `http://127.0.0.1:8000`.

## API Documentation
Once running, visit `http://127.0.0.1:8000/docs` to see the Swagger UI.
