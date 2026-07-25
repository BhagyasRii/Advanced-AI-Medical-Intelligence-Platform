"""
Post-processing utilities for model predictions.

Converts raw model outputs (logits) into
human-readable prediction results.
"""

import torch

from configs.config import cfg


def postprocess_predictions(
    logits: torch.Tensor,
) -> dict:
    """
    Convert raw logits into structured predictions.

    Args:
        logits:
            Raw model output.

    Returns:
        Dictionary containing prediction,
        confidence and class probabilities.
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

    prediction = cfg.CLASS_NAMES[predicted_idx]

    probability_dict = {
        class_name: round(
            probabilities[0][idx].item() * 100,
            2,
        )
        for idx, class_name in enumerate(
            cfg.CLASS_NAMES
        )
    }

    return {
        "prediction": prediction,
        "predicted_index": predicted_idx,
        "confidence": round(
            confidence.item() * 100,
            2,
        ),
        "probabilities": probability_dict,
    }