from typing import List

from fastapi import APIRouter, Request, HTTPException

from app.schemas.exercise import ExerciseSchema
from app.api.utils.exercises import get_exercises

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
