from typing import List
from fastapi import APIRouter, Request, HTTPException

from app.api.utils.leveragesAssists import get_leverages_assists_list
from app.schemas.leveragesAssists import LeveragesAssistsResponseSchema

from app.core.config import settings

environment: str = settings.environment

router = APIRouter(
    prefix="/leverages-assists",
    tags=["leveragesAssists"],
    responses={404: {"description": "Not found"}},
)


@router.get("", response_model=List[LeveragesAssistsResponseSchema])
async def get_leverages_assists(
    request: Request,
) -> List[LeveragesAssistsResponseSchema]:
    """
    Get list of all leverages and assists.
    Requires authentication.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if environment == "local":
            leveragesAssists = get_leverages_assists_list()
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    else:
        access_token = auth_header.split(" ")[1]
        leveragesAssists = get_leverages_assists_list(access_token)
    if leveragesAssists is None:
        raise HTTPException(status_code=400, detail="Invalid request")
    return leveragesAssists
    # return get_leverages_assists_list(access_token)
