from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from configs.config import cfg


UPLOAD_DIR = Path(cfg.UPLOAD_DIR)
UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


def save_upload(file: UploadFile) -> Path:
    """
    Save uploaded image using UUID filename.
    """

    extension = Path(file.filename).suffix.lower()

    filename = f"{uuid4().hex}{extension}"

    save_path = UPLOAD_DIR / filename

    with open(save_path, "wb") as f:
        f.write(file.file.read())

    return save_path.resolve()


def delete_file(file_path):

    file_path = Path(file_path)

    if file_path.exists():
        file_path.unlink()


def ensure_directory(path):

    path = Path(path)

    path.mkdir(
        parents=True,
        exist_ok=True,
    )

    return path