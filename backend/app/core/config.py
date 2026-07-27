from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):

    APP_NAME: str = "ClarityScan AI"

    APP_VERSION: str = "1.0.0"

    HOST: str = "0.0.0.0"

    PORT: int = 8000

    DEBUG: bool = True

    DATABASE_URL: str

    MODEL_PATH: str

    GEMINI_API_KEY: str

    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    class Config:
        env_file = ".env"


settings = Settings()