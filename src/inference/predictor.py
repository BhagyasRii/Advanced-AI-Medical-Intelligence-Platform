"""
Prediction pipeline.

Responsible for:

1. File Validation
2. Image Validation
3. Preprocessing
4. Model Inference
5. Structured Prediction
"""

from pathlib import Path

import torch
from torch import nn

from configs.config import cfg

from src.validation import (
    validate_file,
    validate_image,
)

from src.explainability.utils import (
    preprocess_image,
)

from src.inference.postprocess import (
    postprocess_predictions,
)

from src.llm.schemas import (
    PredictionResult,
)


def predict_image(
    model: nn.Module,
    image_path: str | Path,
) -> PredictionResult:
    """
    Predict disease from a chest X-ray.
    """

    image_path = validate_file(
        image_path
    )

    image_path = validate_image(
        image_path
    )

    image_tensor = preprocess_image(
        str(image_path)
    ).to(cfg.DEVICE)

    with torch.no_grad():

        logits = model(
            image_tensor
        )

    return postprocess_predictions(
        logits
    )