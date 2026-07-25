"""
Run inference on a single chest X-ray image.

Pipeline

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

from configs.config import CHECKPOINT_DIR, cfg

from src.inference.loader import load_model
from src.inference.predictor import predict_image

from src.explainability.gradcam import GradCAMGenerator
from src.explainability.utils import preprocess_image
from src.explainability.visualize import (
    load_image,
    overlay_heatmap,
    save_visualization,
)

# ----------------------------------------------------
# Temporary test image
# (Will be replaced with CLI/FastAPI input later.)
# ----------------------------------------------------

IMAGE_PATH = "sample_images/test.jpg"


def main() -> None:
    """
    Run the complete inference pipeline.
    """

    image_path = Path(IMAGE_PATH)

    if not image_path.exists():
        raise FileNotFoundError(
            f"Image not found: {image_path}"
        )

    # -------------------------------------------------
    # Load trained model
    # -------------------------------------------------

    model = load_model(
        CHECKPOINT_DIR / "best_model.pth"
    )

    # -------------------------------------------------
    # Disease prediction
    # -------------------------------------------------

    result = predict_image(
        model=model,
        image_path=image_path,
    )

    print("\nPrediction Result")
    print("-" * 50)
    print(f"Prediction : {result['prediction']}")
    print(f"Confidence : {result['confidence']}%")

    print("\nClass Probabilities")
    print("-" * 50)

    for disease, score in result["probabilities"].items():
        print(f"{disease:<25} {score:>6.2f}%")

    # -------------------------------------------------
    # Generate Grad-CAM
    # -------------------------------------------------

    gradcam = GradCAMGenerator(model)

    image_tensor = preprocess_image(
        str(image_path)
    ).to(cfg.DEVICE)

    heatmap, predicted_class = gradcam.generate(
        image_tensor=image_tensor,
    )

    # -------------------------------------------------
    # Overlay heatmap
    # -------------------------------------------------

    original_image = load_image(
        str(image_path)
    )

    visualization = overlay_heatmap(
        original_image,
        heatmap,
    )

    output_path = save_visualization(
        visualization,
        f"{image_path.stem}_gradcam.png",
    )

    print("\nGrad-CAM")
    print("-" * 50)
    print(f"Predicted Class Index : {predicted_class}")
    print(f"Saved To              : {output_path}")


if __name__ == "__main__":
    main()