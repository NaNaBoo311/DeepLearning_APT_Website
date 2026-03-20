from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.endpoints import router as api_router

app = FastAPI(
    title="DeepLearning BTL API",
    description="Backend API for the course assignments.",
    version="1.0.0"
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, restrict this to the frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API nested routers
app.include_router(api_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Deep Learning BTL API. Visit /docs for documentation."}
