"""
Image validation utilities.
"""

from pathlib import Path

from PIL import Image
from PIL import UnidentifiedImageError

from .exceptions import CorruptedImageError

MIN_WIDTH = 224
MIN_HEIGHT = 224


def validate_image(
    image_path: str | Path,
) -> Path:
    """
    Validate whether the supplied image
    can be processed.

    Parameters
    ----------
    image_path : str | Path

    Returns
    -------
    Path
        Validated image path.

    Raises
    ------
    InvalidImageError
    """

    image_path = Path(image_path)

    try:

        with Image.open(image_path) as image:

            image.verify()

        with Image.open(image_path) as image:

            image = image.convert("RGB")

            width, height = image.size

    except UnidentifiedImageError as exc:
        raise CorruptedImageError(
            "Invalid image file."
        ) from exc

    except Exception as exc:
        raise CorruptedImageError(
            "Unable to process image."
        ) from exc

    if width < MIN_WIDTH or height < MIN_HEIGHT:

        raise CorruptedImageError(
            f"Image size must be at least "
            f"{MIN_WIDTH}x{MIN_HEIGHT}px."
        )

    return image_path