from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.routes import router

app = FastAPI(
    title="Advanced AI Medical Intelligence Platform",
    version="1.0.0",
    description="AI-powered Chest X-ray Disease Detection and Medical Report Generation",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # We'll restrict this later for deployment.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "Advanced AI Medical Intelligence Platform API",
        "status": "Running",
    }