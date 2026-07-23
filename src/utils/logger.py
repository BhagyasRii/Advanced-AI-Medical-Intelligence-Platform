"""
Logging utilities for the Medical AI Platform.

Provides a reusable logger that writes to both the console
and a log file.
"""

from __future__ import annotations

import logging
from pathlib import Path


def get_logger(
    name: str,
    log_dir: str | Path = "outputs/logs",
    log_file: str = "training.log",
) -> logging.Logger:
    """
    Create and configure a logger.

    Args:
        name: Logger name.
        log_dir: Directory where log files are stored.
        log_file: Log filename.

    Returns:
        Configured logger instance.
    """

    log_dir = Path(log_dir)
    log_dir.mkdir(parents=True, exist_ok=True)

    logger = logging.getLogger(name)

    # Prevent duplicate handlers
    if logger.handlers:
        return logger

    logger.setLevel(logging.INFO)

    formatter = logging.Formatter(
        fmt="%(asctime)s | %(levelname)-8s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    # ------------------------
    # Console Handler
    # ------------------------

    console_handler = logging.StreamHandler()

    console_handler.setFormatter(formatter)

    # ------------------------
    # File Handler
    # ------------------------

    file_handler = logging.FileHandler(
        log_dir / log_file,
        encoding="utf-8",
    )

    file_handler.setFormatter(formatter)

    logger.addHandler(console_handler)

    logger.addHandler(file_handler)

    logger.propagate = False

    return logger