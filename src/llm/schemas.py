from pydantic import BaseModel, Field


class MedicalReport(BaseModel):

    diagnosis: str = Field(
        description="Primary diagnosis predicted from the AI analysis."
    )

    severity: str = Field(
        description="Overall severity classification."
    )

    report_summary: str = Field(
        description="Executive summary of the report."
    )

    radiological_findings: str = Field(
        description="Detailed radiological observations."
    )

    clinical_interpretation: str = Field(
        description="Clinical interpretation of the imaging findings."
    )

    possible_conditions: str = Field(
        description="Possible diseases or differential diagnosis."
    )

    health_risk_assessment: str = Field(
        description="Overall health risk assessment."
    )

    lifestyle_recommendations: str = Field(
        description="Lifestyle recommendations."
    )

    habits_to_adopt: list[str] = Field(
        description="Healthy habits the patient should adopt."
    )

    habits_to_avoid: list[str] = Field(
        description="Habits or environmental factors the patient should avoid."
    )

    follow_up_recommendations: str = Field(
        description="Recommended follow-up."
    )

    warning_signs: list[str] = Field(
        description="Symptoms that require immediate medical attention."
    )

    patient_guidance: str = Field(
        description="Easy-to-understand explanation for patients."
    )

    disclaimer: str = Field(
        description="Medical disclaimer."
    )