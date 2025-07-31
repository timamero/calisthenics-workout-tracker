from typing import List, Literal, Annotated

from pydantic import BaseModel
from fastapi import APIRouter, Request, HTTPException, Query

from app.schemas.exercise import ExerciseSchema
from app.api.utils.exercises import get_exercises, get_exercise_by_id

router = APIRouter(prefix="/exercises")

sample_exercises = [
    {
        "id": 1,
        "name": "Standard Push-Up",
        "target_muscles": ["chest", "triceps", "shoulders"],
        "required_equipment": [],
        "emphasis": "strength",
        "difficulty": "beginner",
        "tags": ["push", "upper"],
    },
    {
        "id": 10,
        "name": "Lunge",
        "target_muscles": ["quadriceps", "glutes", "hamstrings"],
        "required_equipment": [],
        "emphasis": "strength",
        "difficulty": "beginner",
        "tags": ["leg day", "lower"],
    },
]


class ExerciseFilterParams(BaseModel):
    muscles: list[str] = []
    equipments: list[str] = []
    difficulty: Literal["beginner", "intermediate", "advanced", ""] = ""
    emphasis: Literal[
        "plyometrics", "mobility", "power", "endurance", "strength", ""
    ] = ""


# @router.get("/", response_model=List[ExerciseSchema])
# def read_exercises(request: Request):
#     """
#     Retrieve a list of exercises.
#     """
#     # auth_header = request.headers.get("Authorization")
#     # if not auth_header or not auth_header.startswith("Bearer "):
#     #     raise HTTPException(status_code=401, detail="Authentication required")

#     # access_token = auth_header.split(" ")[1]
#     access_token = None

#     exercises = get_exercises(access_token)
#     return exercises


@router.get("/", response_model=List[ExerciseSchema])
def read_filtered_exercises(filter_query: Annotated[ExerciseFilterParams, Query()]):
    """
    Retrieve a list of exercises.
    """
    print("Filter Query - muscles:", filter_query.muscles)
    print("Filter Query - equipments:", filter_query.equipments)
    print("Filter Query - difficulty:", filter_query.difficulty)
    print("Filter Query - emphasis:", filter_query.emphasis)
    # auth_header = request.headers.get("Authorization")
    # if not auth_header or not auth_header.startswith("Bearer "):
    #     raise HTTPException(status_code=401, detail="Authentication required")

    # access_token = auth_header.split(" ")[1]
    access_token = None

    exercises = get_exercises(access_token=access_token, filter_query=filter_query)
    return exercises


@router.get("/{exercise_id}", response_model=ExerciseSchema)
def read_exercise_item(exercise_id: str, request: Request):
    """
    Retrieve a list of exercises.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authentication required")

    # access_token = None
    access_token = auth_header.split(" ")[1]

    exercise = get_exercise_by_id(exercise_id=exercise_id, access_token=access_token)
    return exercise
