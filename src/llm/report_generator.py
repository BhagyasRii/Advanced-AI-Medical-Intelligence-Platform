"""
Generate AI medical reports using Gemini.
"""

from email.mime import text

from google import genai

from configs.config import (
    GEMINI_API_KEY,
    LLM_MODEL,
)

from src.llm.prompt_builder import build_prompt
from src.llm.schemas import (
    MedicalReport,
    PredictionResult,
)


def generate_medical_report(
    prediction: PredictionResult,
) -> MedicalReport:
    """
    Generate a structured medical report
    using Google's Gemini model.
    """

    # Create Gemini client
    client = genai.Client(
        api_key=GEMINI_API_KEY,
    )

    # Build prompt
    prompt = build_prompt(prediction)

    # Generate response
    response = client.models.generate_content(
        model=LLM_MODEL,
        contents=prompt,
    )

    text = response.text.strip()

    print("\n========== RAW GEMINI RESPONSE ==========\n")
    print(text)
    print("\n=========================================\n")

    import re

    patterns = {
        "Diagnosis": r"Diagnosis:\s*(.*?)(?=\n[A-Z][A-Za-z -]+:|\Z)",
        "Findings": r"Findings:\s*(.*?)(?=\n[A-Z][A-Za-z -]+:|\Z)",
        "Confidence Analysis": r"Confidence Analysis:\s*(.*?)(?=\n[A-Z][A-Za-z -]+:|\Z)",
        "Recommendations": r"Recommendations:\s*(.*?)(?=\n[A-Z][A-Za-z -]+:|\Z)",
        "Patient-Friendly Explanation": r"Patient-Friendly Explanation:\s*(.*?)(?=\n[A-Z][A-Za-z -]+:|\Z)",
        "Disclaimer": r"Disclaimer:\s*(.*)",
    }

    # Remove markdown
    text = text.replace("**", "")

    sections = {}

    for key, pattern in patterns.items():
        match = re.search(pattern, text, re.DOTALL)
        sections[key] = match.group(1).strip() if match else ""

    return MedicalReport(
        diagnosis=sections["Diagnosis"],
        findings=sections["Findings"],
        confidence_analysis=sections["Confidence Analysis"],
        recommendations=sections["Recommendations"],
        patient_explanation=sections["Patient-Friendly Explanation"],
        disclaimer=sections["Disclaimer"],
 )