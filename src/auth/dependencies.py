"""
Authentication dependencies.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session

from src.auth.security import decode_access_token
from src.auth.service import get_user_by_id
from src.database.database import get_db


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)


# ---------------------------------------------------------
# Current User
# ---------------------------------------------------------

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:

        payload = decode_access_token(token)

        if not payload:

            raise credentials_exception

        user_id = payload.get("sub")

        if user_id is None:

            raise credentials_exception

    except JWTError:

        raise credentials_exception

    user = get_user_by_id(
        db=db,
        user_id=int(user_id),
    )

    return user


# ---------------------------------------------------------
# Doctor Only
# ---------------------------------------------------------

def require_doctor(
    current_user=Depends(get_current_user),
):

    if current_user.role != "doctor":

        raise HTTPException(
            status_code=403,
            detail="Doctor access required.",
        )

    return current_user


# ---------------------------------------------------------
# Patient Only
# ---------------------------------------------------------

def require_patient(
    current_user=Depends(get_current_user),
):

    if current_user.role != "patient":

        raise HTTPException(
            status_code=403,
            detail="Patient access required.",
        )

    return current_user