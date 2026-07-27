"""
Central configuration for the Advanced AI Medical Intelligence Platform.
"""

from dataclasses import dataclass
from pathlib import Path
from urllib.parse import quote_plus
import os

import torch
from dotenv import load_dotenv


# ==========================================================
# Project Root
# ==========================================================

PROJECT_ROOT = Path(__file__).resolve().parent.parent

ENV_PATH = PROJECT_ROOT / ".env"

load_dotenv(ENV_PATH)


# ==========================================================
# Configuration
# ==========================================================

@dataclass
class Config:

    # ------------------------------------------------------
    # Project Paths
    # ------------------------------------------------------

    PROJECT_ROOT: Path = PROJECT_ROOT

    DATA_DIR: Path = PROJECT_ROOT / "data"

    OUTPUT_DIR: Path = PROJECT_ROOT / "outputs"

    CHECKPOINT_DIR: Path = PROJECT_ROOT / "outputs" / "checkpoints"

    PLOTS_DIR: Path = PROJECT_ROOT / "outputs" / "plots"

    METRICS_DIR: Path = PROJECT_ROOT / "outputs" / "metrics"

    GRADCAM_DIR: Path = PROJECT_ROOT / "outputs" / "gradcam"

    LOG_DIR: Path = PROJECT_ROOT / "logs"

    UPLOAD_DIR: Path = PROJECT_ROOT / "uploads"

    MODEL_PATH: Path = PROJECT_ROOT / "artifacts" / "best_model.pth"

    # ------------------------------------------------------
    # Database
    # ------------------------------------------------------

    MYSQL_HOST: str = os.getenv("MYSQL_HOST", "localhost")

    MYSQL_PORT: str = os.getenv("MYSQL_PORT", "3306")

    MYSQL_USER: str = os.getenv("MYSQL_USER", "root")

    MYSQL_PASSWORD: str = os.getenv("MYSQL_PASSWORD", "")

    MYSQL_DATABASE: str = os.getenv("MYSQL_DATABASE", "medical_ai")

    @property
    def DATABASE_URL(self) -> str:

        return (
            f"mysql+pymysql://"
            f"{self.MYSQL_USER}:"
            f"{quote_plus(self.MYSQL_PASSWORD)}@"
            f"{self.MYSQL_HOST}:"
            f"{self.MYSQL_PORT}/"
            f"{self.MYSQL_DATABASE}"
        )

    # ------------------------------------------------------
    # LLM
    # ------------------------------------------------------

    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

    LLM_MODEL = "gemini-3.5-flash-lite"

    # ------------------------------------------------------
    # Dataset
    # ------------------------------------------------------

    CLASS_NAMES = (
        "Covid-19",
        "Emphysema",
        "Normal",
        "Pneumonia-Bacterial",
        "Pneumonia-Viral",
        "Tuberculosis",
    )

    NUM_CLASSES: int = 6

    IMAGE_SIZE: int = 224

    # ------------------------------------------------------
    # Validation
    # ------------------------------------------------------

    MAX_UPLOAD_SIZE_MB: int = 10

    SUPPORTED_IMAGE_FORMATS = (
        ".jpg",
        ".jpeg",
        ".png",
    )

    # ------------------------------------------------------
    # Training
    # ------------------------------------------------------

    BATCH_SIZE: int = 32

    EPOCHS: int = 30

    LEARNING_RATE: float = 1e-4

    WEIGHT_DECAY: float = 1e-4

    PATIENCE: int = 5

    NUM_WORKERS: int = 2

    PIN_MEMORY: bool = True

    SEED: int = 42

    # ------------------------------------------------------
    # Device
    # ------------------------------------------------------

    DEVICE: str = (
        "cuda"
        if torch.cuda.is_available()
        else "cpu"
    )


cfg = Config()


# ==========================================================
# Create Required Directories
# ==========================================================

for directory in (
    cfg.DATA_DIR,
    cfg.OUTPUT_DIR,
    cfg.CHECKPOINT_DIR,
    cfg.PLOTS_DIR,
    cfg.METRICS_DIR,
    cfg.GRADCAM_DIR,
    cfg.LOG_DIR,
    cfg.UPLOAD_DIR,
):
    directory.mkdir(
        parents=True,
        exist_ok=True,
    )


print("Loading .env from:", ENV_PATH)
print("MYSQL_HOST:", cfg.MYSQL_HOST)
print("MYSQL_PORT:", cfg.MYSQL_PORT)
print("MYSQL_USER:", cfg.MYSQL_USER)
print("MYSQL_DATABASE:", cfg.MYSQL_DATABASE)
print("DATABASE_URL =", cfg.DATABASE_URL)