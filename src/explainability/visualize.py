"""
Visualization utilities for Grad-CAM.
"""

from pathlib import Path

import cv2
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
from pytorch_grad_cam.utils.image import show_cam_on_image

from configs.config import GRADCAM_DIR


def load_image(image_path: str) -> np.ndarray:
    """
    Load an image as a normalized RGB numpy array.

    Returns
    -------
    np.ndarray
        Shape (H, W, 3)
        Values in [0,1]
    """

    image = Image.open(image_path).convert("RGB")

    image = np.array(image).astype(np.float32)

    image /= 255.0

    return image


def overlay_heatmap(
    image: np.ndarray,
    heatmap: np.ndarray,
) -> np.ndarray:
    """
    Overlay Grad-CAM heatmap onto image.
    """

    visualization = show_cam_on_image(
        image,
        heatmap,
        use_rgb=True,
    )

    return visualization


def save_visualization(
    visualization: np.ndarray,
    filename: str,
) -> Path:
    """
    Save Grad-CAM visualization.

    Returns
    -------
    Path
        Saved image path.
    """

    save_path = GRADCAM_DIR / filename

    cv2.imwrite(
        str(save_path),
        cv2.cvtColor(
            visualization,
            cv2.COLOR_RGB2BGR,
        ),
    )

    return save_path


def display_visualization(
    visualization: np.ndarray,
):
    """
    Display Grad-CAM result.
    """

    plt.figure(figsize=(8, 8))

    plt.imshow(visualization)

    plt.axis("off")

    plt.tight_layout()

    plt.show()