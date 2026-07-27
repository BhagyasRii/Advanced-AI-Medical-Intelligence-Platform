"""
Pydantic schemas for authentication.
"""

from pydantic import BaseModel, ConfigDict, EmailStr, Field


# ---------------------------------------------------------
# Register
# ---------------------------------------------------------

class RegisterRequest(BaseModel):

    name: str = Field(..., min_length=2, max_length=100)

    email: EmailStr

    password: str = Field(..., min_length=8)

    role: str = Field(..., pattern="^(doctor|patient)$")


# ---------------------------------------------------------
# Login
# ---------------------------------------------------------

class LoginRequest(BaseModel):

    email: EmailStr

    password: str


# ---------------------------------------------------------
# User Response
# ---------------------------------------------------------

class UserResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    role: str

    model_config = ConfigDict(from_attributes=True)


# ---------------------------------------------------------
# Authentication Response
# ---------------------------------------------------------

class AuthResponse(BaseModel):

    access_token: str

    token_type: str = "bearer"

    user: UserResponse