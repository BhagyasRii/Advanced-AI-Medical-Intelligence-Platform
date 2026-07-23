"""
Device utilities for the Medical AI Platform.

Detects the available compute device and reports
basic system information.
"""

from __future__ import annotations

from dataclasses import dataclass

import torch


@dataclass
class DeviceInfo:
    """Stores device information."""

    device: torch.device
    device_name: str
    device_type: str
    pytorch_version: str
    cuda_version: str
    gpu_count: int
    total_memory_gb: float | None


def get_device() -> DeviceInfo:
    """
    Detect the best available compute device.

    Returns:
        DeviceInfo object containing device details.
    """

    if torch.cuda.is_available():

        device = torch.device("cuda")

        gpu_name = torch.cuda.get_device_name(0)

        total_memory = (
            torch.cuda.get_device_properties(0).total_memory
            / (1024 ** 3)
        )

        cuda_version = torch.version.cuda

        gpu_count = torch.cuda.device_count()

        return DeviceInfo(
            device=device,
            device_name=gpu_name,
            device_type="GPU",
            pytorch_version=torch.__version__,
            cuda_version=cuda_version,
            gpu_count=gpu_count,
            total_memory_gb=round(total_memory, 2),
        )

    return DeviceInfo(
        device=torch.device("cpu"),
        device_name="CPU",
        device_type="CPU",
        pytorch_version=torch.__version__,
        cuda_version="Not Available",
        gpu_count=0,
        total_memory_gb=None,
    )


def print_device_info(device_info: DeviceInfo) -> None:
    """
    Print device information in a readable format.
    """

    print("=" * 60)
    print("Device Information")
    print("=" * 60)

    print(f"Device        : {device_info.device_type}")
    print(f"Name          : {device_info.device_name}")
    print(f"PyTorch       : {device_info.pytorch_version}")
    print(f"CUDA          : {device_info.cuda_version}")
    print(f"GPU Count     : {device_info.gpu_count}")

    if device_info.total_memory_gb is not None:
        print(f"GPU Memory    : {device_info.total_memory_gb:.2f} GB")

    print("=" * 60)