from torch.optim.lr_scheduler import ReduceLROnPlateau


def get_scheduler(optimizer):

    return ReduceLROnPlateau(
        optimizer,
        mode="max",
        factor=0.5,
        patience=2,
    )