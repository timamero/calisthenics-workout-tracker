from typing import List, Annotated

from fastapi import APIRouter, Request, HTTPException, Query

from app.schemas.exercise import ExerciseSchema, ExerciseFilterParams
from app.api.utils.exercises import get_exercises, get_exercise_by_id

router = APIRouter(prefix="/exercises")


@router.get("/", response_model=List[ExerciseSchema])
def read_filtered_exercises(
    filter_query: Annotated[ExerciseFilterParams, Query()], request: Request
):
    """
    Retrieve a list of exercises.
    """
    # auth_header = request.headers.get("Authorization")
    # if not auth_header or not auth_header.startswith("Bearer "):
    #     raise HTTPException(status_code=401, detail="Authentication required")

    # access_token = auth_header.split(" ")[1]

    # exercises = get_exercises(access_token=access_token, filter_query=filter_query)
    exercises = get_exercises(filter_query=filter_query)
    return exercises


@router.get("/{exercise_id}", response_model=ExerciseSchema)
def read_exercise_item(exercise_id: str, request: Request):
    """
    Retrieve a list of exercises.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authentication required")

    access_token = auth_header.split(" ")[1]

    exercise = get_exercise_by_id(exercise_id=exercise_id, access_token=access_token)
    return exercise
