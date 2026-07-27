from functools import lru_cache
from src.inference.loader import load_model

@lru_cache
def get_model():
    return load_model()