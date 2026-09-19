from typing import Annotated

from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .config import settings
from app.services.supabase_client import get_supabase_client

bearer_scheme = HTTPBearer(auto_error=False)


def get_access_token(
    credentials: Annotated[
        HTTPAuthorizationCredentials | None,
        Depends(bearer_scheme),
    ],
) -> str | None:
    if settings.environment == "local-isolated":
        return None

    if credentials is None:
        raise HTTPException(status_code=401, detail="Authentication required")

    return credentials.credentials


def verify_supabase_user(
    access_token: Annotated[str | None, Depends(get_access_token)],
) -> None:
    """
    Verify the access token with Supabase to ensure the user is authenticated.
    """
    if access_token is None:
        # In local-isolated environment, access_token can be None
        return

    try:
        supabase = get_supabase_client(access_token)
        supabase.auth.get_user(jwt=access_token)
    except Exception as e:
        raise HTTPException(
            status_code=401, detail="Invalid or expired access token."
        ) from e
