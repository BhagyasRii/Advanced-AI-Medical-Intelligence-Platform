from pydantic import BaseModel

from src.llm.schemas import MedicalReport


class PredictionResponse(BaseModel):

    id: int
    
    prediction: str

    medical_report: MedicalReport


class PredictionHistoryResponse(BaseModel):

    id: int

    prediction: str

    created_at: str