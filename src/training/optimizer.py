import torch.optim as optim

from configs.config import cfg


def get_optimizer(model):

    return optim.AdamW(
        model.parameters(),
        lr=cfg.LEARNING_RATE,
        weight_decay=cfg.WEIGHT_DECAY,
    )