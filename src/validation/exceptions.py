"""
Custom exceptions for input validation.
"""


class ValidationError(Exception):
    """Base validation exception."""


class InvalidFileError(ValidationError):
    """Raised when a file is invalid."""


class UnsupportedFormatError(ValidationError):
    """Raised when an unsupported file format is provided."""


class InvalidImageError(ValidationError):
    """Raised when an image cannot be processed."""