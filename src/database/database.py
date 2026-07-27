"""
Database configuration for the Advanced AI Medical Intelligence Platform.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from configs.config import cfg

engine = create_engine(
    cfg.DATABASE_URL,
    pool_pre_ping=True,
    echo=False,
)

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
)

Base = declarative_base()


def get_db():
    """
    FastAPI dependency.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    """
    Create all database tables.
    """
    from src.database.models import (
    User,
    Prediction,
)

    Base.metadata.create_all(bind=engine)