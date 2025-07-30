from typing import List

from fastapi import APIRouter, Request, HTTPException

from app.schemas.exercise import ExerciseSchema
from app.api.utils.exercises import get_exercises

router = APIRouter(prefix="/exercises")


@router.get("/", response_model=List[ExerciseSchema])
# @router.get("/")
def read_exercises(request: Request):
    """
    Retrieve a list of exercises.
    """
    print(f"exercises get request headers: {request.headers}")
    print(f"exercises get request headers auth: {request.headers.get("Authorization")}")
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authentication required")

    print("getting exercises")
    exercises = get_exercises()

    return exercises
    # return {"HELLO": "WORLD"}
