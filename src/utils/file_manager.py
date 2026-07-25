from pathlib import Path
import uuid


UPLOAD_DIR = Path("temp_uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


def save_upload(file):

    extension = Path(file.filename).suffix

    filename = f"{uuid.uuid4()}{extension}"

    filepath = UPLOAD_DIR / filename

    with open(filepath, "wb") as f:
        f.write(file.file.read())

    return filepath


def delete_file(path: Path):

    if path.exists():
        path.unlink()