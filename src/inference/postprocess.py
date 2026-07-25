"""
Post-processing utilities.

Converts raw logits into a structured
PredictionResult object.
"""

import torch

from configs.config import cfg,CLASS_NAMES

from src.llm.schemas import PredictionResult


def postprocess_predictions(
    logits: torch.Tensor,
) -> PredictionResult:
    """
    Convert logits into PredictionResult.
    """

    probabilities = torch.softmax(
        logits,
        dim=1,
    )

    confidence, predicted_idx = torch.max(
        probabilities,
        dim=1,
    )

    predicted_idx = predicted_idx.item()

    probability_dict = {
        class_name: round(
            probabilities[0][idx].item() * 100,
            2,
        )
        for idx, class_name in enumerate(
            CLASS_NAMES
        )
    }

    return PredictionResult(
        prediction=CLASS_NAMES[
            predicted_idx
        ],
        predicted_index=predicted_idx,
        confidence=round(
            confidence.item() * 100,
            2,
        ),
        probabilities=probability_dict,
    )