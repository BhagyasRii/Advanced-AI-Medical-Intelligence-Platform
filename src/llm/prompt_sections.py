"""
Reusable prompt components for the Medical Intelligence Platform.

Each function represents one Prompt Engineering technique.
Keeping them modular makes prompts easier to maintain,
extend, and experiment with.
"""

from src.inference.postprocess import PredictionResult


def system_role() -> str:
    return """
============================================================
SYSTEM ROLE
============================================================

You are a board-certified Radiologist with extensive
experience in interpreting Chest X-rays.

You are assisting healthcare professionals by converting
AI-generated predictions into clinically meaningful reports.

Your responsibilities:

• Interpret the AI prediction objectively.
• Maintain clinical accuracy.
• Use evidence-based medical language.
• Avoid unsupported assumptions.
• Clearly communicate uncertainty.
• Produce reports suitable for physicians while remaining
  understandable for patients.

Remember:
You are assisting clinicians—not replacing their judgment.
"""


def prediction_summary(
    prediction: PredictionResult,
) -> str:

    confidence = prediction.confidence

    if confidence >= 0.95:
        confidence_level = "Very High"
        guidance = """
The AI model has produced a highly confident prediction.
You may describe the diagnosis as highly consistent with the detected disease,
while still recommending clinical correlation.
"""

    elif confidence >= 0.80:
        confidence_level = "High"
        guidance = """
The AI prediction is reliable.
Discuss the diagnosis confidently while encouraging
routine clinical verification.
"""

    elif confidence >= 0.70:
        confidence_level = "Moderate"
        guidance = """
The AI prediction has moderate confidence.
Explain the uncertainty and recommend additional review.
"""

    else:
        confidence_level = "Low"
        guidance = """
The prediction confidence is low.

Avoid definitive conclusions.

Strongly recommend additional imaging,
clinical examination,
or specialist consultation.
"""

    return f"""
============================================================
AI PREDICTION SUMMARY
============================================================

Predicted Disease

{prediction.prediction}

Confidence Score

{confidence:.2%}

Confidence Level

{confidence_level}

{guidance}
"""


def clinical_guidelines() -> str:
    return """
============================================================
CLINICAL GUIDELINES
============================================================

Base the report ONLY on the supplied AI prediction.

DO NOT:

• Invent patient history.
• Assume patient age.
• Assume patient gender.
• Fabricate symptoms.
• Fabricate laboratory findings.
• Mention information that was not provided.

Always:

• Keep recommendations medically conservative.
• Encourage clinical correlation where appropriate.
• Distinguish AI prediction from confirmed diagnosis.
"""


def writing_style() -> str:
    return """
============================================================
WRITING STYLE
============================================================

The report should be:

• Professional
• Objective
• Clinically meaningful
• Concise
• Well structured

The Patient Explanation should use
simple, reassuring language that
non-medical readers can understand.
"""


def output_requirements() -> str:
    return """
============================================================
OUTPUT REQUIREMENTS
============================================================

Generate the report using the following sections:

1. Diagnosis
2. Findings
3. Confidence Analysis
4. Recommendations
5. Patient Explanation
6. Disclaimer

Keep every section concise.

Do not repeat information unnecessarily.
"""