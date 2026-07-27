"""
Pydantic schemas for database operations.
"""

from datetime import datetime

from pydantic import BaseModel


class PredictionCreate(BaseModel):

    filename: str

    prediction: str

    confidence: float

    probabilities: dict

    report: str = ""

    gradcam_image: str | None = None


class PredictionHistory(BaseModel):

    id: int

    filename: str

    prediction: str

    confidence: float

    report: str

    gradcam_image: str | None

    created_at: datetime

    class Config:
        from_attributes = True