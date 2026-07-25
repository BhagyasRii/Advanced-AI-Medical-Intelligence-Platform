"""
FastAPI application entry point.
"""

from fastapi import FastAPI

from src.api.routes import router

app = FastAPI(
    title="Advanced AI Medical Intelligence Platform",
    description="AI-powered Chest X-ray Disease Classification",
    version="1.0.0",
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "Medical AI Platform API",
        "status": "running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }