"""
Model loader for inference.

This module loads the trained model checkpoint and prepares
the model for inference.
"""

from pathlib import Path

import torch
from torch import nn

from configs.config import cfg
from src.models.densenet121 import build_model


def load_model(
    checkpoint_path: str | Path,
) -> nn.Module:
    """
    Load a trained model checkpoint.

    Args:
        checkpoint_path:
            Path to the checkpoint.

    Returns:
        Loaded PyTorch model.
    """

    checkpoint_path = Path(checkpoint_path)

    if not checkpoint_path.exists():
        raise FileNotFoundError(
            f"Checkpoint not found: {checkpoint_path}"
        )

    model = build_model().to(cfg.DEVICE)

    checkpoint = torch.load(
        checkpoint_path,
        map_location=cfg.DEVICE,
    )

    model.load_state_dict(
        checkpoint["model_state_dict"]
    )

    model.eval()

    return model