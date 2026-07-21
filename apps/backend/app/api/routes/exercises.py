from typing import List, Annotated
import time

from fastapi import APIRouter, Request, HTTPException, Query, Depends
from pyrate_limiter import Duration, Limiter, Rate
from fastapi_limiter.depends import RateLimiter

from app.schemas.exercise import ExerciseSchema, ExerciseFilterParams
from app.api.utils.exercises import get_exercises, get_exercise_by_id

from app.core.config import settings

router = APIRouter(prefix="/exercises")

standard_api_limit = Limiter(Rate(60, Duration.MINUTE))


@router.get(
    "",
    response_model=List[ExerciseSchema],
    dependencies=[Depends(RateLimiter(limiter=standard_api_limit))],
)
def read_filtered_exercises(
    filter_query: Annotated[ExerciseFilterParams, Query()], request: Request
):
    """
    Retrieve a list of exercises.
    """
    startTime = time.perf_counter()
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if settings.environment == "local-isolated":
            exercises = get_exercises(filter_query)
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    else:
        access_token = auth_header.split(" ")[1]
        exercises = get_exercises(filter_query, access_token)

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
def read_exercise_item(exercise_id: str, request: Request):
    """
    Retrieve a list of exercises.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if settings.environment == "local-isolated":
            exercise = get_exercise_by_id(exercise_id)
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    else:
        access_token = auth_header.split(" ")[1]
        exercise = get_exercise_by_id(
            exercise_id=exercise_id, access_token=access_token
        )

    if not exercise:
        raise HTTPException(status_code=400, detail="Invalid request")

    return exercise
