from typing import Annotated

from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from pyrate_limiter import Duration, Limiter, Rate
from fastapi_limiter.depends import RateLimiter

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


STRICT_RATE_LIMIT = 3
STANDARD_RATE_LIMIT = 60
WRITE_RATE_LIMIT = 10

strict_root_limit = Rate(STRICT_RATE_LIMIT, Duration.MINUTE)
standard_api_limit = Rate(STANDARD_RATE_LIMIT, Duration.MINUTE)
write_api_limit = Rate(WRITE_RATE_LIMIT, Duration.MINUTE)

strict_root_limiter = RateLimiter(
    limiter=Limiter(strict_root_limit)
)  # Max 3 requests per minute
standard_api_limiter = RateLimiter(
    limiter=Limiter(standard_api_limit)
)  # Max 60 requests per minute
write_api_limiter = RateLimiter(
    limiter=Limiter(write_api_limit)
)  # Max 10 requests per minute


def get_strict_root_limiter() -> RateLimiter:
    """Dependency function for strict root rate limiter."""
    return strict_root_limiter


def get_standard_api_limiter() -> RateLimiter:
    """Dependency function for standard API rate limiter."""
    return standard_api_limiter


def get_write_api_limiter() -> RateLimiter:
    """Dependency function for write API rate limiter."""
    return write_api_limiter
