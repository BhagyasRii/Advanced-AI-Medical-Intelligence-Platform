"""
Custom exceptions for the validation module.
"""

from fastapi import HTTPException, status


class ValidationException(HTTPException):
    """Base validation exception."""

    def __init__(
        self,
        detail: str,
        status_code: int = status.HTTP_400_BAD_REQUEST,
    ):
        super().__init__(
            status_code=status_code,
            detail=detail,
        )


class InvalidFileTypeError(ValidationException):

    def __init__(self):
        super().__init__(
            "Unsupported file type. Allowed formats: JPG, JPEG, PNG."
        )


class FileTooLargeError(ValidationException):

    def __init__(self, max_size_mb: int):
        super().__init__(
            f"File size exceeds the allowed limit of {max_size_mb} MB."
        )


class EmptyFileError(ValidationException):

    def __init__(self):
        super().__init__(
            "Uploaded file is empty."
        )


class CorruptedImageError(ValidationException):

    def __init__(self):
        super().__init__(
            "The uploaded image is corrupted or unreadable."
        )


class FileNotFoundError(ValidationException):

    def __init__(self):
        super().__init__(
            "Uploaded file could not be found."
        )