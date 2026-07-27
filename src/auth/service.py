"""
Authentication service.
"""

from fastapi import HTTPException
from sqlalchemy.orm import Session

from src.database.models import User

from src.auth.schemas import (
    RegisterRequest,
    UserResponse,
)

from src.auth.security import (
    create_access_token,
    hash_password,
    verify_password,
)


# ---------------------------------------------------------
# Register
# ---------------------------------------------------------

def register_user(
    db: Session,
    user_data: RegisterRequest,
):

    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered.",
        )

    user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hash_password(
            user_data.password
        ),
        role=user_data.role,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": UserResponse.model_validate(user),
    }


# ---------------------------------------------------------
# Login
# ---------------------------------------------------------

def authenticate_user(
    db: Session,
    email: str,
    password: str,
):

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if user is None:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    if not verify_password(
        password,
        user.password_hash,
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": UserResponse.model_validate(user),
    }


# ---------------------------------------------------------
# Current User
# ---------------------------------------------------------

def get_user_by_id(
    db: Session,
    user_id: int,
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:

        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return user