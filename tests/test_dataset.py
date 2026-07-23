from src.data.download import download_dataset
from src.data.dataset import ChestXRayDataset


dataset_path = download_dataset()

dataset = ChestXRayDataset(dataset_path)

train = dataset.train_dataset()

print()

print("Number of classes :", len(train.classes))
print("Classes :", train.classes)
print("Training images :", len(train))