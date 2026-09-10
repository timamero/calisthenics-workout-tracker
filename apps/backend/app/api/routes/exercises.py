from typing import List, Annotated
import time

from fastapi import APIRouter, HTTPException, Query, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pyrate_limiter import Duration, Limiter, Rate
from fastapi_limiter.depends import RateLimiter

from app.schemas.exercise import ExerciseSchema, ExerciseFilterParams
from app.api.utils.exercises import get_exercises, get_exercise_by_id

from app.core.config import settings

router = APIRouter(prefix="/exercises")

standard_api_limit = Limiter(Rate(60, Duration.MINUTE))

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


@router.get(
    "",
    response_model=List[ExerciseSchema],
    dependencies=[Depends(RateLimiter(limiter=standard_api_limit))],
)
def read_filtered_exercises(
    filter_query: Annotated[ExerciseFilterParams, Query()],
    token: Annotated[str | None, Depends(get_access_token)],
):
    """
    Retrieve a list of exercises.
    """

    startTime = time.perf_counter()
    if settings.environment == "local-isolated":
        exercises = get_exercises(filter_query)
    else:
        if token:
            exercises = get_exercises(filter_query, token)
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    if not exercises:
        raise HTTPException(status_code=400, detail="Invalid request")

    endTime = time.perf_counter()
    print(f"Retrieved exercises from supabase in {endTime - startTime:0.4f} seconds")
    return exercises


@router.get(
    "/{exercise_id}",
    response_model=ExerciseSchema,
    dependencies=[Depends(RateLimiter(limiter=standard_api_limit))],
)
def read_exercise_item(
    exercise_id: str,
    token: Annotated[str | None, Depends(get_access_token)],
):
    """
    Retrieve exercise by ID.
    """
    if settings.environment == "local-isolated":
        exercise = get_exercise_by_id(exercise_id)
    else:
        if token:
            exercise = get_exercise_by_id(exercise_id=exercise_id, access_token=token)
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    if not exercise:
        raise HTTPException(status_code=400, detail="Invalid request")

    return exercise
