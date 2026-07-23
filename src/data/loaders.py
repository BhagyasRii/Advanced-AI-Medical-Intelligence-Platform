"""
DataLoader utilities.
"""

from torch.utils.data import DataLoader

from configs.config import cfg


def create_dataloader(
    dataset,
    shuffle=False,
):

    return DataLoader(
        dataset,
        batch_size=cfg.BATCH_SIZE,
        shuffle=shuffle,
        num_workers=cfg.NUM_WORKERS,
        pin_memory=cfg.PIN_MEMORY,
)


def create_loaders(dataset_builder):

    train_loader = create_dataloader(
        dataset_builder.train_dataset(),
        shuffle=True,
    )

    val_loader = create_dataloader(
        dataset_builder.val_dataset(),
        shuffle=False,
    )

    test_loader = create_dataloader(
        dataset_builder.test_dataset(),
        shuffle=False,
    )

    return train_loader, val_loader, test_loader