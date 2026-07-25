"""
Grad-CAM implementation.

Generates explainability heatmaps for DenseNet121 predictions.
"""

from typing import Tuple

import numpy as np
import torch
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget


class GradCAMGenerator:
    """
    Wrapper around pytorch-grad-cam.
    """

    def __init__(self, model):

        self.model = model
        self.model.eval()

        # Last convolutional layer of DenseNet121
        self.target_layers = [self.model.features[-1]]

        self.cam = GradCAM(
            model=self.model,
            target_layers=self.target_layers,
        )

    def generate(
        self,
        image_tensor: torch.Tensor,
        class_idx: int = None,
    ) -> Tuple[np.ndarray, int]:

        """
        Generate Grad-CAM heatmap.

        Args:
            image_tensor:
                Shape (1,3,H,W)

            class_idx:
                Optional target class.
                If None, predicted class is used.

        Returns
        -------
        heatmap:
            numpy array (H,W)

        predicted_class:
            int
        """

        image_tensor = image_tensor.detach()

        with torch.no_grad():

            outputs = self.model(image_tensor)

            predicted_class = torch.argmax(
                outputs,
                dim=1,
            ).item()

        if class_idx is None:
            class_idx = predicted_class

        targets = [
            ClassifierOutputTarget(class_idx)
        ]

        grayscale_cam = self.cam(
            input_tensor=image_tensor,
            targets=targets,
        )[0]

        return grayscale_cam, predicted_class