"""
Checkpoint utilities.
"""

import torch
from pathlib import Path

from configs.config import cfg


def save_checkpoint(model, optimizer, epoch, best_acc):

    checkpoint = {
        "epoch": epoch,
        "model_state_dict": model.state_dict(),
        "optimizer_state_dict": optimizer.state_dict(),
        "best_accuracy": best_acc,
    }

    path = Path(cfg.CHECKPOINT_DIR) / "best_model.pth"

    torch.save(checkpoint, path)

    print(f"Checkpoint saved: {path}")


def load_checkpoint(path, model, optimizer=None):

    checkpoint = torch.load(path)

    model.load_state_dict(
        checkpoint["model_state_dict"]
    )

    if optimizer:

        optimizer.load_state_dict(
            checkpoint["optimizer_state_dict"]
        )

    return checkpoint