from pydantic import BaseModel
from typing import Dict


class MedicalReportResponse(BaseModel):
    diagnosis: str
    findings: str
    confidence_analysis: str
    recommendations: str
    patient_explanation: str
    disclaimer: str


class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    probabilities: Dict[str, float]
    medical_report: MedicalReportResponse