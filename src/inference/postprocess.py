from dataclasses import dataclass,field

import torch
import torch.nn.functional as F

from configs.config import cfg



@dataclass
class PredictionResult:
    predicted_index: int
    prediction: str
    confidence: float
    probabilities: dict
    gradcam_path: str | None = field(default=None)


def postprocess_predictions(logits: torch.Tensor) -> PredictionResult:
    """
    Convert raw model logits into a structured prediction.
    """

    probabilities = F.softmax(logits, dim=1)[0]

    confidence, predicted_index = torch.max(
        probabilities,
        dim=0,
    )

    confidence = float(confidence.item())

    predicted_index = int(predicted_index.item())

    probability_dict = {}

    for index, class_name in enumerate(cfg.CLASS_NAMES):

        probability_dict[class_name] = round(
            float(probabilities[index].item()),
            4,
        )

    return PredictionResult(
        predicted_index=predicted_index,
        prediction=cfg.CLASS_NAMES[predicted_index],
        confidence=confidence,
        probabilities=probability_dict,
    )