from typing import List, Annotated

from fastapi import APIRouter, HTTPException, Depends
from pyrate_limiter import Duration, Limiter, Rate
from fastapi_limiter.depends import RateLimiter

from app.api.utils.setProgressions import get_set_progressions_list
from app.schemas.setProgressions import SetProgressionsResponseSchema

from app.core.dependencies import get_access_token

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
    token: Annotated[str | None, Depends(get_access_token)],
) -> List[SetProgressionsResponseSchema]:
    """
    Get list of all challenges and assists.
    Requires authentication.
    """
    setProgressions = get_set_progressions_list(access_token=token)

    if setProgressions is None:
        raise HTTPException(status_code=400, detail="Invalid request")

    return setProgressions
