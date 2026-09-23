from typing import List, Annotated

from fastapi import APIRouter, HTTPException, Depends

from app.api.utils.setProgressions import get_set_progressions_list
from app.schemas.setProgressions import SetProgressionsResponseSchema

from app.core.dependencies import get_access_token, get_standard_api_limiter

router = APIRouter(
    prefix="/set-progressions",
    tags=["setProgressions"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "",
    response_model=List[SetProgressionsResponseSchema],
    dependencies=[Depends(get_standard_api_limiter())],
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
