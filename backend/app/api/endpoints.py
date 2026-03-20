from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class PredictRequest(BaseModel):
    # Dummy fields for a future ML model
    image_url: str | None = None
    input_text: str | None = None

class PredictResponse(BaseModel):
    status: str
    prediction: str
    confidence: float

@router.get("/health", tags=["System"])
def health_check():
    """Returns the basic health status of the API."""
    return {"status": "ok"}

@router.get("/api/status", tags=["System"])
def api_status():
    """Returns detailed status information."""
    return {"status": "operational", "version": "1.0.0", "message": "API is running correctly."}

@router.post("/api/demo/predict", response_model=PredictResponse, tags=["Demo"])
def demo_predict(request: PredictRequest):
    """
    Dummy prediction endpoint for ML integration.
    Replace this logic when integrating actual deep learning models.
    """
    return PredictResponse(
        status="success",
        prediction="Class_A", # Placeholder class
        confidence=0.95
    )
