from typing import List, Annotated
import time

from fastapi import APIRouter, HTTPException, Query, Depends

from app.schemas.exercise import ExerciseSchema, ExerciseFilterParams
from app.api.utils.exercises import get_exercises, get_exercise_by_id

from app.core.dependencies import get_access_token, get_standard_api_limiter

router = APIRouter(prefix="/exercises")


@router.get(
    "",
    response_model=List[ExerciseSchema],
    dependencies=[Depends(get_standard_api_limiter())],
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
    dependencies=[Depends(get_standard_api_limiter())],
)
def read_exercise_item(
    exercise_id: str,
    token: Annotated[str | None, Depends(get_access_token)],
):
    """
    Retrieve exercise by ID.
    """
    exercise = get_exercise_by_id(exercise_id=exercise_id, access_token=token)

    if exercise is None:
        raise HTTPException(status_code=404, detail="Exercise not found")

    return exercise
