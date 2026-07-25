"""
Pydantic schemas for the LLM module.
"""

from typing import Dict

from pydantic import BaseModel, Field


class PredictionResult(BaseModel):
    """
    Structured prediction returned by the inference pipeline.
    """

    prediction: str = Field(
        ...,
        description="Predicted disease.",
    )

    predicted_index: int = Field(
        ...,
        description="Predicted class index.",
    )

    confidence: float = Field(
        ...,
        description="Prediction confidence percentage.",
    )

    probabilities: Dict[str, float] = Field(
        ...,
        description="Probability distribution.",
    )


class MedicalReport(BaseModel):
    """
    AI-generated medical report.
    """

    diagnosis: str

    findings: str

    confidence_analysis: str

    recommendations: str

    patient_explanation: str

    disclaimer: str