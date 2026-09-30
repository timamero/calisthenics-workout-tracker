from typing import List, Annotated

from fastapi import APIRouter, HTTPException, Depends

from app.api.utils.setProgressions import get_set_progressions
from app.core.dependencies import (
    get_access_token,
    get_standard_api_limiter,
    verify_supabase_user,
)
from app.schemas.setProgressions import SetProgressionsResponseSchema

router = APIRouter(
    prefix="/set-progressions",
    tags=["setProgressions"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "",
    response_model=List[SetProgressionsResponseSchema],
    dependencies=[
        Depends(get_standard_api_limiter()),
        Depends(verify_supabase_user),
    ],
)
async def read_set_progressions(
    token: Annotated[str | None, Depends(get_access_token)],
) -> List[SetProgressionsResponseSchema]:
    """Retrieve all set progressions.

    Args:
        token: Optional Supabase access token.

    Returns:
        All available set progressions.

    Raises:
        HTTPException: If set progressions cannot be retrieved.
    """
    setProgressions = get_set_progressions(access_token=token)

    if setProgressions is None:
        raise HTTPException(
            status_code=400, detail="Invalid request: Unable to fetch set progressions"
        )

    return setProgressions
