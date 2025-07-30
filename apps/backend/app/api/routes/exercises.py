from typing import List

from fastapi import APIRouter

from app.schemas.exercise import ExerciseSchema

router = APIRouter(prefix="/exercises")


@router.get("/", response_model=List[ExerciseSchema])
def read_exercises():
    """
    Retrieve a list of exercises.
    """
    # This is a placeholder for the actual database call.
    # In a real application, you would fetch this data from your database.
    exercises = [
        ExerciseSchema(
            id=1,
            name="Push Up",
            target_muscles=["Chest", "Triceps"],
            required_equipment=None,
            emphasis="strength",
            difficulty="beginner",
            tags=["bodyweight", "upper body"],
        ),
        ExerciseSchema(
            id=2,
            name="Pull Up",
            target_muscles=["Back", "Biceps"],
            required_equipment=["Pull-up bar"],
            emphasis="strength",
            difficulty="intermediate",
            tags=["bodyweight", "upper body"],
        ),
    ]

    return exercises
