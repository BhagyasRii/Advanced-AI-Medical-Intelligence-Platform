import torch

from src.models.metrics import accuracy
from src.models.checkpoint import save_checkpoint


def train_one_epoch(
    model,
    loader,
    optimizer,
    criterion,
    device,
):

    model.train()

    total_loss = 0
    total_correct = 0
    total_samples = 0

    for images, labels in loader:

        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs, labels)

        loss.backward()

        optimizer.step()

        total_loss += loss.item() * images.size(0)

        preds = torch.argmax(outputs, dim=1)

        total_correct += (preds == labels).sum().item()

        total_samples += labels.size(0)

    return (
        total_loss / total_samples,
        total_correct / total_samples,
    )


def validate(
    model,
    loader,
    criterion,
    device,
):

    model.eval()

    total_loss = 0
    total_correct = 0
    total_samples = 0

    with torch.no_grad():

        for images, labels in loader:

            images = images.to(device)
            labels = labels.to(device)

            outputs = model(images)

            loss = criterion(outputs, labels)

            total_loss += loss.item() * images.size(0)

            preds = torch.argmax(outputs, dim=1)

            total_correct += (preds == labels).sum().item()

            total_samples += labels.size(0)

    return (
        total_loss / total_samples,
        total_correct / total_samples,
    )


def fit(
    model,
    train_loader,
    val_loader,
    optimizer,
    criterion,
    scheduler,
    device,
    epochs,
):

    best_acc = 0

    history = {
        "train_loss": [],
        "train_acc": [],
        "val_loss": [],
        "val_acc": [],
    }

    for epoch in range(epochs):

        train_loss, train_acc = train_one_epoch(
            model,
            train_loader,
            optimizer,
            criterion,
            device,
        )

        val_loss, val_acc = validate(
            model,
            val_loader,
            criterion,
            device,
        )

        scheduler.step(val_acc)

        history["train_loss"].append(train_loss)
        history["train_acc"].append(train_acc)
        history["val_loss"].append(val_loss)
        history["val_acc"].append(val_acc)

        print(
            f"Epoch [{epoch+1}/{epochs}] "
            f"Train Loss: {train_loss:.4f} "
            f"Train Acc: {train_acc:.4f} "
            f"Val Loss: {val_loss:.4f} "
            f"Val Acc: {val_acc:.4f}"
        )

        if val_acc > best_acc:

            best_acc = val_acc

            save_checkpoint(
                model,
                optimizer,
                epoch,
                best_acc,
            )

    return history