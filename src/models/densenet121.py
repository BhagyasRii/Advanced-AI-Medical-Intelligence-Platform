"""
DenseNet121 model.
"""

import torch.nn as nn
from torchvision.models import densenet121, DenseNet121_Weights

from configs.config import cfg


def build_model():

    model = densenet121(
        weights=DenseNet121_Weights.DEFAULT
    )

    in_features = model.classifier.in_features

    model.classifier = nn.Linear(
        in_features,
        cfg.NUM_CLASSES,
    )

    return model