"""
Prediction pipeline with Grad-CAM support.
"""

from pathlib import Path

import torch
from torch import nn

from configs.config import cfg

from src.validation import (
    validate_file,
    validate_image,
)

from src.explainability.utils import preprocess_image
from src.explainability.gradcam import GradCAMGenerator
from src.explainability.visualize import (
    load_image,
    overlay_heatmap,
    save_visualization,
)

from src.inference.postprocess import postprocess_predictions


def predict_image(
    model: nn.Module,
    image_path: str | Path,
):
    """
    Returns:
        prediction_result,
        gradcam_image_path
    """

    image_path = validate_file(image_path)
    image_path = validate_image(image_path)

    image_tensor = preprocess_image(
        str(image_path)
    ).to(cfg.DEVICE)

    with torch.no_grad():
        logits = model(image_tensor)

    prediction = postprocess_predictions(logits)

    gradcam = GradCAMGenerator(model)

    heatmap, _ = gradcam.generate(
        image_tensor=image_tensor,
        class_idx=prediction.predicted_index,
    )

    rgb_image = load_image(str(image_path))

    visualization = overlay_heatmap(
        rgb_image,
        heatmap,
    )

    save_name = (
        Path(image_path).stem
        + "_gradcam.png"
    )

    gradcam_path = save_visualization(
        visualization,
        save_name,
    )

    prediction.gradcam_path = str(gradcam_path)
    return prediction