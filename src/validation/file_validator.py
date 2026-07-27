"""
Validation utilities for uploaded medical images.
"""

from pathlib import Path

from PIL import Image

from configs.config import cfg

from src.validation.exceptions import (
    CorruptedImageError,
    EmptyFileError,
    FileNotFoundError,
    FileTooLargeError,
    InvalidFileTypeError,
)


SUPPORTED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
}


MAX_FILE_SIZE_MB = 10


def validate_file(file_path: str | Path) -> Path:
    """
    Validate file existence, extension, and size.
    """

    file_path = Path(file_path)

    if not file_path.exists():
        raise FileNotFoundError()

    if file_path.suffix.lower() not in SUPPORTED_EXTENSIONS:
        raise InvalidFileTypeError()

    if file_path.stat().st_size == 0:
        raise EmptyFileError()

    file_size_mb = file_path.stat().st_size / (1024 * 1024)

    if file_size_mb > MAX_FILE_SIZE_MB:
        raise FileTooLargeError(MAX_FILE_SIZE_MB)

    return file_path


