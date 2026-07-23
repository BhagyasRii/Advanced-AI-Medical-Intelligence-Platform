"""
Central configuration for the Medical AI Platform.

All project settings are defined here.
Nothing should be hardcoded elsewhere.
"""

from dataclasses import dataclass
from pathlib import Path
import torch


# ===========================
# Project Paths
# ===========================

PROJECT_ROOT = Path(__file__).resolve().parent.parent

DATA_DIR = PROJECT_ROOT / "data"

OUTPUT_DIR = PROJECT_ROOT / "outputs"

CHECKPOINT_DIR = OUTPUT_DIR / "checkpoints"

PLOTS_DIR = OUTPUT_DIR / "plots"

METRICS_DIR = OUTPUT_DIR / "metrics"

GRADCAM_DIR = OUTPUT_DIR / "gradcam"


# Create directories automatically
for directory in [
    DATA_DIR,
    OUTPUT_DIR,
    CHECKPOINT_DIR,
    PLOTS_DIR,
    METRICS_DIR,
    GRADCAM_DIR,
]:
    directory.mkdir(parents=True, exist_ok=True)


@dataclass
class Config:
    """
    Global project configuration.
    """

    # --------------------------
    # Dataset
    # --------------------------

    DATASET_NAME: str = "mohamedasak/chest-x-ray-6-classes-dataset"

    IMAGE_SIZE: int = 224

    NUM_CLASSES: int = 6

    NUM_WORKERS: int = 2

    PIN_MEMORY: bool = True


    # --------------------------
    # Model
    # --------------------------

    MODEL_NAME: str = "densenet121"

    PRETRAINED: bool = True


    # --------------------------
    # Training
    # --------------------------

    BATCH_SIZE: int = 32

    EPOCHS: int = 30

    LR: float = 1e-3

    FINE_TUNE_LR: float = 1e-4

    WEIGHT_DECAY: float = 1e-4

    EARLY_STOPPING_PATIENCE: int = 5


    # --------------------------
    # Randomness
    # --------------------------

    SEED: int = 42


    # --------------------------
    # Device
    # --------------------------

    DEVICE: str = (
        "cuda"
        if torch.cuda.is_available()
        else "cpu"
    )


cfg = Config()