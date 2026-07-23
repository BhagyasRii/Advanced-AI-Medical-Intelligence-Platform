"""
Dataset utilities.
"""

from pathlib import Path

from torchvision.datasets import ImageFolder

from src.data.transforms import (
    get_train_transforms,
    get_val_transforms,
)


class ChestXRayDataset:
    """
    Wrapper around ImageFolder datasets.
    """

    def __init__(self, dataset_root: Path):

        self.dataset_root = Path(dataset_root)

        self.train_dir = self.dataset_root / "chest-xray" / "train"
        self.val_dir = self.dataset_root / "chest-xray" / "val"
        self.test_dir = self.dataset_root / "chest-xray" / "test"

    def train_dataset(self):

        return ImageFolder(
            root=self.train_dir,
            transform=get_train_transforms(),
        )

    def val_dataset(self):

        return ImageFolder(
            root=self.val_dir,
            transform=get_val_transforms(),
        )

    def test_dataset(self):

        return ImageFolder(
            root=self.test_dir,
            transform=get_val_transforms(),
        )