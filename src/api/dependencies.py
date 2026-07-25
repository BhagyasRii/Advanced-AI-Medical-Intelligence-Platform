from functools import lru_cache

from src.inference.loader import load_model


CHECKPOINT_PATH = "artifacts/best_model.pth"


@lru_cache(maxsize=1)
def get_model():
    """
    Load the model only once and reuse it
    throughout the application's lifetime.
    """
    return load_model(CHECKPOINT_PATH)