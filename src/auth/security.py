"""
JWT authentication and password security utilities.
"""

from datetime import datetime, timedelta, timezone
from typing import Any

from jose import JWTError, jwt
from passlib.context import CryptContext

# ------------------------------------------------------------------
# Configuration
# ------------------------------------------------------------------

SECRET_KEY = "change_this_to_a_long_random_secret_key"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# ------------------------------------------------------------------
# Password Hashing
# ------------------------------------------------------------------

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


def hash_password(password: str) -> str:
    print("=" * 50)
    print("PASSWORD:", repr(password))
    print("TYPE:", type(password))

    hashed = pwd_context.hash(password)

    print("HASH:", hashed)
    print("HASH TYPE:", type(hashed))

    return hashed


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    """
    Verify a password.
    """
    return pwd_context.verify(
        plain_password,
        hashed_password,
    )


# ------------------------------------------------------------------
# JWT
# ------------------------------------------------------------------

def create_access_token(
    data: dict[str, Any],
    expires_delta: timedelta | None = None,
) -> str:
    """
    Generate JWT access token.
    """

    payload = data.copy()

    expire = datetime.now(timezone.utc) + (
        expires_delta
        if expires_delta
        else timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    payload.update(
        {
            "exp": expire,
        }
    )

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def decode_access_token(
    token: str,
) -> dict[str, Any]:
    """
    Decode and validate JWT.
    """

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        return payload

    except JWTError:

        return {}