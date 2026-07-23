from src.data.download import (
    download_dataset,
    verify_dataset,
    show_dataset_structure,
)

dataset_path = download_dataset()

verify_dataset(dataset_path)

show_dataset_structure(dataset_path)