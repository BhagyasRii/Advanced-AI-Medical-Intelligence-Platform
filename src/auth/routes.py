"""
Authentication API routes.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.auth.dependencies import get_current_user
from src.auth.schemas import (
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    UserResponse,
)
from src.auth.service import (
    authenticate_user,
    register_user,
)
from src.database.database import get_db

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


# ---------------------------------------------------------
# Register
# ---------------------------------------------------------

@router.post(
    "/register",
    response_model=AuthResponse,
)
def register(
    user: RegisterRequest,
    db: Session = Depends(get_db),
):

    return register_user(
        db=db,
        user_data=user,
    )


# ---------------------------------------------------------
# Login
# ---------------------------------------------------------

@router.post(
    "/login",
    response_model=AuthResponse,
)
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db),
):

    return authenticate_user(
        db=db,
        email=credentials.email,
        password=credentials.password,
    )


# ---------------------------------------------------------
# Current User
# ---------------------------------------------------------

@router.get(
    "/me",
    response_model=UserResponse,
)
def me(
    current_user=Depends(get_current_user),
):

    return current_user