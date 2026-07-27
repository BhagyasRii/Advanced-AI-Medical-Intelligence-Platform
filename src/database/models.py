from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship

from src.database.database import Base


# ---------------------------------------------------------
# USER
# ---------------------------------------------------------

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )

    password_hash = Column(
        String(255),
        nullable=False,
    )

    role = Column(
        String(20),
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    predictions = relationship(
        "Prediction",
        back_populates="user",
        cascade="all, delete-orphan",
    )


# ---------------------------------------------------------
# PREDICTION
# ---------------------------------------------------------

class Prediction(Base):

    __tablename__ = "predictions"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="predictions",
    )

    filename = Column(
        String(255),
        nullable=False,
        index=True,
    )

    prediction = Column(
        String(255),
        nullable=False,
        index=True,
    )

    confidence = Column(
        Float,
        nullable=False,
    )

    probabilities = Column(Text)

    report = Column(Text)

    gradcam_image = Column(
        String(255),
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        index=True,
    )