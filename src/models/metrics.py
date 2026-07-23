"""
Training metrics.
"""

import torch


def accuracy(outputs, labels):

    preds = torch.argmax(outputs, dim=1)

    correct = (preds == labels).sum().item()

    return correct / len(labels)