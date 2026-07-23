from configs.config import cfg

from src.data.download import download_dataset
from src.data.dataset import ChestXRayDataset
from src.data.loaders import create_loaders

from src.models.densenet121 import build_model
from src.models.losses import get_loss

from src.training.optimizer import get_optimizer
from src.training.scheduler import get_scheduler
from src.training.engine import fit


def main():

    dataset_path = download_dataset()

    dataset = ChestXRayDataset(dataset_path)

    train_loader, val_loader, _ = create_loaders(dataset)

    model = build_model().to(cfg.DEVICE)

    criterion = get_loss()

    optimizer = get_optimizer(model)

    scheduler = get_scheduler(optimizer)

    fit(
        model,
        train_loader,
        val_loader,
        optimizer,
        criterion,
        scheduler,
        cfg.DEVICE,
        cfg.EPOCHS,
    )


if __name__ == "__main__":
    main()