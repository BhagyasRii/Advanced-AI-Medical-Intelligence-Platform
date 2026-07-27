from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from pytorch_grad_cam.utils.image import show_cam_on_image

from configs.config import cfg


cfg.GRADCAM_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


def load_image(image_path):

    image = Image.open(image_path).convert("RGB")

    image = np.array(image).astype(np.float32)

    image /= 255.0

    return image


def overlay_heatmap(
    image,
    heatmap,
):

    return show_cam_on_image(
        image,
        heatmap,
        use_rgb=True,
    )


def save_visualization(
    visualization,
    filename,
):

    save_path = (
        cfg.GRADCAM_DIR
        / filename
    )

    cv2.imwrite(
        str(save_path),
        cv2.cvtColor(
            visualization,
            cv2.COLOR_RGB2BGR,
        ),
    )

    return save_path.resolve()