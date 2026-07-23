from src.data.download import download_dataset
from src.data.dataset import ChestXRayDataset
from src.data.loaders import create_loaders


dataset_path = download_dataset()

dataset = ChestXRayDataset(dataset_path)

train_loader, val_loader, test_loader = create_loaders(dataset)

images, labels = next(iter(train_loader))

print(images.shape)
print(labels.shape)