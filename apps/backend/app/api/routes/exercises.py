from typing import List

from fastapi import APIRouter

from app.schemas.exercise import ExerciseSchema
from app.api.utils.exercises import get_exercises

router = APIRouter(prefix="/exercises")


@router.get("/", response_model=List[ExerciseSchema])
def read_exercises():
    """
    Retrieve a list of exercises.
    """
    exercises = get_exercises()

    return exercises
