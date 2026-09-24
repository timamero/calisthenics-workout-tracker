from typing import List, Annotated
import time

from fastapi import APIRouter, HTTPException, Query, Depends

from app.core.exceptions import WorkoutDatabaseError
from app.schemas.exercise import ExerciseSchema, ExerciseFilterParams
from app.api.utils.exercises import get_exercises, get_exercise_by_id

from app.core.dependencies import (
    verify_supabase_user,
    get_access_token,
    get_standard_api_limiter,
)

router = APIRouter(prefix="/exercises")


@router.get(
    "",
    response_model=List[ExerciseSchema],
    dependencies=[
        Depends(get_standard_api_limiter()),
        Depends(verify_supabase_user),
    ],
)
def read_filtered_exercises(
    filter_query: Annotated[ExerciseFilterParams, Query()],
    token: Annotated[str | None, Depends(get_access_token)],
) -> List[ExerciseSchema]:
    """
    Retrieve a list of exercises.
    """
    start_time = time.perf_counter()

    try:
        exercises = get_exercises(filter_query=filter_query, access_token=token)
    except WorkoutDatabaseError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to retrieve exercises due to database error: {e}",
        ) from e

    end_time = time.perf_counter()
    print(f"Retrieved exercises from supabase in {end_time - start_time:0.4f} seconds")

    if exercises is None:
        raise HTTPException(status_code=404, detail="Exercises not found")

    return exercises


@router.get(
    "/{exercise_id}",
    response_model=ExerciseSchema,
    dependencies=[
        Depends(get_standard_api_limiter()),
        Depends(verify_supabase_user),
    ],
)
def read_exercise_item(
    exercise_id: str,
    token: Annotated[str | None, Depends(get_access_token)],
) -> ExerciseSchema:
    """
    Retrieve exercise by ID.
    """
    try:
        exercise = get_exercise_by_id(exercise_id=exercise_id, access_token=token)
    except WorkoutDatabaseError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to retrieve exercise due to database error: {e}",
        ) from e

    if exercise is None:
        raise HTTPException(status_code=404, detail="Exercise not found")

    return exercise
