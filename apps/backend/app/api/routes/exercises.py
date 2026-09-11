from typing import List, Annotated
import time

from fastapi import APIRouter, HTTPException, Query, Depends

from pyrate_limiter import Duration, Limiter, Rate
from fastapi_limiter.depends import RateLimiter

from app.schemas.exercise import ExerciseSchema, ExerciseFilterParams
from app.api.utils.exercises import get_exercises, get_exercise_by_id

from app.core.dependencies import get_access_token

router = APIRouter(prefix="/exercises")

# TODO: Move standard_api_limit to dependencies
standard_api_limit = Limiter(Rate(60, Duration.MINUTE))


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
    exercises = get_exercises(filter_query=filter_query, access_token=token)

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
    exercise = get_exercise_by_id(exercise_id=exercise_id, access_token=token)

    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")

    return exercise
