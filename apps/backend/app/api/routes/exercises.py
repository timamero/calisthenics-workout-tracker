from typing import List

from fastapi import APIRouter, Request, HTTPException

from app.schemas.exercise import ExerciseSchema
from app.api.utils.exercises import get_exercises, get_exercise_by_id

router = APIRouter(prefix="/exercises")


@router.get("/", response_model=List[ExerciseSchema])
def read_exercises(request: Request):
    """
    Retrieve a list of exercises.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authentication required")

    access_token = auth_header.split(" ")[1]

    exercises = get_exercises(access_token)
    return exercises


@router.get("/{exercise_id}", response_model=ExerciseSchema)
def read_exercise_item(exercise_id: str, request: Request):
    """
    Retrieve a list of exercises.
    """
    # auth_header = request.headers.get("Authorization")
    # if not auth_header or not auth_header.startswith("Bearer "):
    #     raise HTTPException(status_code=401, detail="Authentication required")

    access_token = None
    # access_token = auth_header.split(" ")[1]

    # exercise = {
    #     "id": 1,
    #     "name": "Sample Exercise",
    #     "target_muscles": ["biceps", "triceps"],
    #     "required_equipment": ["dumbbells"],
    #     "emphasis": "strength",
    #     "difficulty": "beginner",
    #     "tags": ["sample", "exercise"],
    #     "instructions": "Follow the instructions to complete the exercise.",
    # }

    exercise = get_exercise_by_id(exercise_id=exercise_id, access_token=access_token)
    return exercise
