from typing import List
from fastapi import APIRouter, Depends, Request

from ..utils.leveragesAssists import get_leverages_assists_list
from ...core.dependencies import get_current_user
from ...schemas.leveragesAssists import LeveragesAssistsResponseSchema

router = APIRouter(
    prefix="/leveragesAssists",
    tags=["leveragesAssists"],
    responses={404: {"description": "Not found"}},
)


@router.get("", response_model=List[LeveragesAssistsResponseSchema])
async def get_leverages_assists(
    request: Request, current_user=Depends(get_current_user)
) -> List[LeveragesAssistsResponseSchema]:
    """
    Get list of all leverages and assists.
    Requires authentication.
    """
    access_token = current_user.access_token if current_user else None
    return get_leverages_assists_list(access_token)
