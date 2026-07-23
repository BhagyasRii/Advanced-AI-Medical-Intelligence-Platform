from torch.optim import Adam

from configs.config import cfg
from src.data.download import download_dataset
from src.data.dataset import ChestXRayDataset
from src.data.loaders import create_loaders
from src.models.densenet121 import build_model
from src.models.losses import get_loss
from src.models.trainer import train_one_epoch


dataset_path = download_dataset()

dataset = ChestXRayDataset(dataset_path)

train_loader, _, _ = create_loaders(dataset)

model = build_model().to(cfg.DEVICE)

criterion = get_loss()

optimizer = Adam(
    model.parameters(),
    lr=cfg.LEARNING_RATE,
)

loss, acc = train_one_epoch(
    model,
    train_loader,
    optimizer,
    criterion,
    cfg.DEVICE,
)

print(loss)
print(acc)