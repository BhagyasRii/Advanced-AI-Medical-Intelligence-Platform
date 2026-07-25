"""
Run inference on a single chest X-ray image.

Pipeline:
Image
    ↓
Prediction
    ↓
Grad-CAM
    ↓
Overlay
    ↓
Save Result
"""

from pathlib import Path

import torch

from configs.config import cfg, CHECKPOINT_DIR

from src.models.densenet121 import build_model

from src.explainability.gradcam import GradCAMGenerator
from src.explainability.utils import (
    preprocess_image,
    get_prediction,
)
from src.explainability.visualize import (
    load_image,
    overlay_heatmap,
    save_visualization,
)


# ----------------------------------------------------
# CHANGE THIS TO YOUR TEST IMAGE
# ----------------------------------------------------

IMAGE_PATH = "sample_images/test.jpg"


def main():

    image_path = Path(IMAGE_PATH)

    if not image_path.exists():
        raise FileNotFoundError(
            f"Image not found: {image_path}"
        )

    # -----------------------------
    # Load model
    # -----------------------------

    model = build_model().to(cfg.DEVICE)

    checkpoint = torch.load(
        CHECKPOINT_DIR / "best_model.pth",
        map_location=cfg.DEVICE,
    )

    model.load_state_dict(
        checkpoint["model_state_dict"]
    )

    model.eval()

    # -----------------------------
    # Image preprocessing
    # -----------------------------

    image_tensor = preprocess_image(
        image_path
    )

    # -----------------------------
    # Prediction
    # -----------------------------

    prediction, confidence = get_prediction(
        model,
        image_tensor,
    )

    print(f"Prediction : {prediction}")
    print(f"Confidence : {confidence:.4f}")

    # -----------------------------
    # Grad-CAM
    # -----------------------------

    gradcam = GradCAMGenerator(model)

    heatmap, predicted_class = gradcam.generate(
        image_tensor=image_tensor.to(cfg.DEVICE)
    )

    # -----------------------------
    # Visualization
    # -----------------------------

    original_image = load_image(image_path)

    visualization = overlay_heatmap(
        original_image,
        heatmap,
    )

    output_path = save_visualization(
        visualization,
        image_path.stem + "_gradcam.png",
    )

    print(f"Grad-CAM saved to: {output_path}")


if __name__ == "__main__":
    main()