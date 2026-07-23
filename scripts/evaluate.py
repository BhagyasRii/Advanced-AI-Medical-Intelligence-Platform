import torch

from configs.config import cfg

from src.data.download import download_dataset
from src.data.dataset import ChestXRayDataset
from src.data.loaders import create_loaders

from src.models.densenet121 import build_model
from src.training.evaluator import evaluate_model


def main():

    dataset_path = download_dataset()

    dataset = ChestXRayDataset(dataset_path)

    _, _, test_loader = create_loaders(dataset)

    model = build_model().to(cfg.DEVICE)

    checkpoint = torch.load(
        cfg.CHECKPOINT_DIR / "best_model.pth",
        map_location=cfg.DEVICE,
    )

    model.load_state_dict(
        checkpoint["model_state_dict"]
    )

    evaluate_model(
        model,
        test_loader,
        cfg.DEVICE,
        dataset.test_dataset().classes,
    )


if __name__ == "__main__":
    main()