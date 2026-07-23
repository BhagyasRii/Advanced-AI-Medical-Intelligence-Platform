"""
Analyze the Chest X-Ray 6 Classes dataset.

This script provides a quick overview of:
- Dataset structure
- Number of classes
- Images per split
- Images per class
- Image dimensions
- Corrupted images

Usage:
    python scripts/analyze_dataset.py
"""

from pathlib import Path
from collections import Counter
from PIL import Image

from src.data.download import download_dataset, verify_dataset


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png"}


def get_split_dirs(dataset_path: Path):
    """Locate train/validation/test directories."""
    splits = {}

    for split in ["train", "val", "valid", "validation", "test"]:
        matches = list(dataset_path.rglob(split))

        if matches:
            splits[split] = matches[0]

    return splits


def analyze_split(split_name: str, split_path: Path):
    """Analyze a dataset split."""

    print(f"\n{'=' * 60}")
    print(f"{split_name.upper()} SET")
    print("=" * 60)

    class_counts = Counter()
    image_sizes = Counter()
    corrupted = []

    total_images = 0

    class_dirs = sorted([d for d in split_path.iterdir() if d.is_dir()])

    for class_dir in class_dirs:

        count = 0

        for image_path in class_dir.rglob("*"):

            if image_path.suffix.lower() not in IMAGE_EXTENSIONS:
                continue

            try:
                with Image.open(image_path) as img:
                    image_sizes[img.size] += 1

                count += 1
                total_images += 1

            except Exception:
                corrupted.append(image_path)

        class_counts[class_dir.name] = count

    print(f"\nClasses ({len(class_counts)}):")

    for cls, count in class_counts.items():
        print(f"  {cls:<25} {count}")

    print(f"\nTotal Images : {total_images}")

    if image_sizes:
        most_common_size, freq = image_sizes.most_common(1)[0]
        print(f"Most Common Image Size : {most_common_size} ({freq} images)")

    print(f"Corrupted Images : {len(corrupted)}")

    if corrupted:
        print("\nFirst 5 corrupted files:")

        for file in corrupted[:5]:
            print(file)


def main():

    dataset_path = download_dataset()

    verify_dataset(dataset_path)

    print(f"\nDataset Location:\n{dataset_path}")

    splits = get_split_dirs(dataset_path)

    print("\nDetected Splits:")

    for name, path in splits.items():
        print(f"  {name:<10} -> {path}")

    for split_name, split_path in splits.items():
        analyze_split(split_name, split_path)


if __name__ == "__main__":
    main()