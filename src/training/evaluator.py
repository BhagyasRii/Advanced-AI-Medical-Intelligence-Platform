import torch
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
)


def evaluate_model(
    model,
    loader,
    device,
    class_names,
):

    model.eval()

    predictions = []
    labels_list = []

    with torch.no_grad():

        for images, labels in loader:

            images = images.to(device)

            outputs = model(images)

            preds = torch.argmax(outputs, dim=1)

            predictions.extend(preds.cpu().numpy())

            labels_list.extend(labels.numpy())

    print(
        classification_report(
            labels_list,
            predictions,
            target_names=class_names,
        )
    )

    print(confusion_matrix(labels_list, predictions))