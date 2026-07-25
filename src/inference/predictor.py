"""
Prediction pipeline.

This module validates an input image,
performs model inference, and returns
structured prediction results.
"""

from pathlib import Path

import torch
from torch import nn

from configs.config import cfg

from src.explainability.utils import preprocess_image
from src.inference.postprocess import (
    postprocess_predictions,
)

from src.validation import (
    validate_file,
    validate_image,
)


def predict_image(
    model: nn.Module,
    image_path: str | Path,
) -> dict:
    """
    Predict disease from a chest X-ray.

    Parameters
    ----------
    model : nn.Module
        Loaded PyTorch model.

    image_path : str | Path
        Path to the input image.

    Returns
    -------
    dict
        Structured prediction.
    """

    image_path = validate_file(image_path)
    image_path = validate_image(image_path)

    image_tensor = preprocess_image(
        str(image_path)
    ).to(cfg.DEVICE)

    with torch.no_grad():

        logits = model(image_tensor)

    return postprocess_predictions(
        logits
    )