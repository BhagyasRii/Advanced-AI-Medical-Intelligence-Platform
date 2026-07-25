"""
File validation utilities.
"""

from pathlib import Path

from .exceptions import (
    InvalidFileError,
    UnsupportedFormatError,
)

SUPPORTED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
}


def validate_file(
    file_path: str | Path,
) -> Path:
    """
    Validate a file before image processing.

    Parameters
    ----------
    file_path : str | Path
        Path to the uploaded file.

    Returns
    -------
    Path
        Validated Path object.

    Raises
    ------
    InvalidFileError
    UnsupportedFormatError
    """

    file_path = Path(file_path)

    if not file_path.exists():
        raise InvalidFileError(
            f"File not found: {file_path}"
        )

    if not file_path.is_file():
        raise InvalidFileError(
            f"Not a valid file: {file_path}"
        )

    if file_path.stat().st_size == 0:
        raise InvalidFileError(
            "Uploaded file is empty."
        )

    extension = file_path.suffix.lower()

    if extension not in SUPPORTED_EXTENSIONS:
        raise UnsupportedFormatError(
            f"Unsupported file format: {extension}"
        )

    return file_path