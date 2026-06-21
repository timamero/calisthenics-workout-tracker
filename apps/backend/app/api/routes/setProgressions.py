from typing import List
from fastapi import APIRouter, Request, HTTPException, Depends
from pyrate_limiter import Duration, Limiter, Rate
from fastapi_limiter.depends import RateLimiter

from app.api.utils.setProgressions import get_set_progressions_list
from app.schemas.setProgressions import SetProgressionsResponseSchema

from app.core.config import settings

environment: str = settings.environment

router = APIRouter(
    prefix="/set-progressions",
    tags=["setProgressions"],
    responses={404: {"description": "Not found"}},
)

standard_api_limit = Limiter(Rate(60, Duration.MINUTE))


@router.get(
    "",
    response_model=List[SetProgressionsResponseSchema],
    dependencies=[Depends(RateLimiter(limiter=standard_api_limit))],
)
async def get_set_progressions(
    request: Request,
) -> List[SetProgressionsResponseSchema]:
    """
    Get list of all challenges and assists.
    Requires authentication.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if environment == "local-isolated":
            setProgressions = get_set_progressions_list()
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    else:
        access_token = auth_header.split(" ")[1]
        setProgressions = get_set_progressions_list(access_token)
    if setProgressions is None:
        raise HTTPException(status_code=400, detail="Invalid request")
    return setProgressions
