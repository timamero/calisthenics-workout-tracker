from typing import List, Optional, Literal
from datetime import datetime, timedelta, date
from uuid import UUID

from pydantic import BaseModel


class SetFieldsSchema(BaseModel):
    reps: Optional[int] = None
    duration: Optional[int] = None
    weight: Optional[int] = None
    rest: Optional[int] = None


class SetSchema(BaseModel):
    fields: SetFieldsSchema
    completed: bool
    completed_at: Optional[datetime] = None


class WorkoutExerciseSchema(BaseModel):
    exercise_id: int
    tracked: List[Literal["reps", "duration", "weight", "rep"]]
    sets: List[SetSchema]


class WorkoutDataSchema(BaseModel):
    exercises: List[WorkoutExerciseSchema]


class BaseWorkoutSchema(BaseModel):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    user_id: UUID
    title: Optional[str] = None
    description: Optional[str] = None
    duration: timedelta
    workout_data: WorkoutDataSchema
    status: Literal["draft", "finalized", "archived"]


class WorkoutBuildSchema(BaseWorkoutSchema):
    goal: Literal["function", "endurance", "hypertrophy", "strength", "power"]
    source: Literal["manual", "ai", "default"]


class WorkoutLogSchema(BaseWorkoutSchema):
    workout_build_id: int
    date: date
    notes: Optional[str] = None
    rpe: Optional[int] = None
