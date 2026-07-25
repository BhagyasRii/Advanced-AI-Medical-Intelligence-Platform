"""
Utility functions for Grad-CAM.
"""

from pathlib import Path

import numpy as np
import torch
from PIL import Image
from torchvision import transforms

from configs.config import cfg


def preprocess_image(image_path: str) -> torch.Tensor:
    """
    Load and preprocess an image for inference.

    Returns
    -------
    torch.Tensor
        Shape: (1, 3, IMAGE_SIZE, IMAGE_SIZE)
    """

    transform = transforms.Compose(
        [
            transforms.Resize((cfg.IMAGE_SIZE, cfg.IMAGE_SIZE)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225],
            ),
        ]
    )

    image = Image.open(image_path).convert("RGB")

    tensor = transform(image)

    return tensor.unsqueeze(0)


def get_prediction(model, image_tensor):
    """
    Predict class index and confidence.
    """

    model.eval()

    image_tensor = image_tensor.to(cfg.DEVICE)

    with torch.no_grad():

        outputs = model(image_tensor)

        probabilities = torch.softmax(outputs, dim=1)

        confidence, prediction = torch.max(
            probabilities,
            dim=1,
        )

    return (
        prediction.item(),
        confidence.item(),
    )


def load_class_names(dataset):
    """
    Return dataset class names.
    """

    return dataset.test_dataset().classes


def ensure_directory(path: Path):
    """
    Create directory if it does not exist.
    """

    path.mkdir(
        parents=True,
        exist_ok=True,
    )


def normalize_heatmap(heatmap: np.ndarray):
    """
    Normalize heatmap to [0,1].
    """

    heatmap = heatmap - heatmap.min()

    heatmap = heatmap / (heatmap.max() + 1e-8)

    return heatmap