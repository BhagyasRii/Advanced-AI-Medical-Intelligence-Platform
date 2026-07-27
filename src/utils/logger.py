import logging
from pathlib import Path

from configs.config import cfg


LOG_DIR = Path(cfg.LOG_DIR)
LOG_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


LOG_FILE = LOG_DIR / "medical_ai.log"


def get_logger(name):

    logger = logging.getLogger(name)

    if logger.handlers:
        return logger

    logger.setLevel(logging.INFO)

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    )

    file_handler = logging.FileHandler(LOG_FILE)

    console_handler = logging.StreamHandler()

    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    return logger