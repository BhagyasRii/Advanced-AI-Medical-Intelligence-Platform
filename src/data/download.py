"""
Dataset download utilities.

Downloads the Chest X-Ray 6 Classes dataset from Kaggle using
kagglehub and verifies that the download completed successfully.
"""

from __future__ import annotations

from pathlib import Path
import logging

import kagglehub

from configs.config import cfg


logger = logging.getLogger(__name__)


def download_dataset(force_download: bool = False) -> Path:
    """
    Download the dataset using KaggleHub.

    Args:
        force_download: Force a fresh download.

    Returns:
        Path to downloaded dataset.
    """

    logger.info("Downloading dataset...")

    dataset_path = kagglehub.dataset_download(
        cfg.DATASET_NAME,
        force_download=force_download,
    )

    dataset_path = Path(dataset_path)

    logger.info(f"Dataset downloaded to: {dataset_path}")

    return dataset_path


def verify_dataset(dataset_path: Path) -> bool:
    """
    Verify that the dataset exists and is not empty.

    Args:
        dataset_path: Dataset directory.

    Returns:
        True if valid.

    Raises:
        FileNotFoundError
    """

    if not dataset_path.exists():
        raise FileNotFoundError(
            f"Dataset not found:\n{dataset_path}"
        )

    files = list(dataset_path.rglob("*"))

    if len(files) == 0:
        raise FileNotFoundError(
            "Dataset directory is empty."
        )

    logger.info("Dataset verification successful.")

    return True


def show_dataset_structure(
    dataset_path: Path,
    max_depth: int = 2,
) -> None:
    """
    Print dataset folder structure.

    Args:
        dataset_path: Dataset directory.
        max_depth: Maximum directory depth to display.
    """

    print("\nDataset Structure\n")

    for item in sorted(dataset_path.rglob("*")):

        depth = len(item.relative_to(dataset_path).parts)

        if depth <= max_depth:

            indent = "    " * (depth - 1)

            print(f"{indent}{item.name}")