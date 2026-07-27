"""
Model loader for inference.
"""

from pathlib import Path

import torch
import torch.nn as nn
from torchvision import models

from configs.config import cfg


def load_model() -> nn.Module:
    """
    Load the trained DenseNet121 model for inference.
    Supports both:
    1. Raw state_dict
    2. Training checkpoint containing model_state_dict
    """

    # Build model architecture
    model = models.densenet121(weights=None)

    model.classifier = nn.Linear(
        model.classifier.in_features,
        len(cfg.CLASS_NAMES),
    )

    weights_path = Path(cfg.MODEL_PATH)

    if not weights_path.exists():
        raise FileNotFoundError(
            f"Model weights not found: {weights_path}"
        )

    # Load checkpoint
    checkpoint = torch.load(
        weights_path,
        map_location=cfg.DEVICE,
    )

    # Support multiple checkpoint formats
    if isinstance(checkpoint, dict):
        if "model_state_dict" in checkpoint:
            state_dict = checkpoint["model_state_dict"]
        else:
            state_dict = checkpoint
    else:
        raise ValueError(
            "Unsupported checkpoint format."
        )

    # Load weights
    model.load_state_dict(state_dict)

    model.to(cfg.DEVICE)

    model.eval()

    return model