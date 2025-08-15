from typing import List, Optional, Literal
from datetime import datetime, timedelta, date
from uuid import UUID

from pydantic import BaseModel


class SetFieldsSchema(BaseModel):
    reps: Optional[int] = None
    duration: Optional[timedelta] = None
    weight: Optional[int] = None
    rest: Optional[timedelta] = None


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
    updated_at: Optional[datetime]
    title: Optional[str] = None
    description: Optional[str] = None
    workout_data: WorkoutDataSchema
    status: Literal["draft", "finalized", "archived"]
    goal: Optional[Literal["function", "endurance", "hypertrophy", "strength", "power"]]


class WorkoutBuildSchema(BaseWorkoutSchema):
    user_id: Optional[UUID]
    duration: Optional[timedelta]
    source: Literal["manual", "ai", "default"]


class WorkoutLogSchema(BaseWorkoutSchema):
    user_id: UUID
    workout_build_id: int
    date: date
    duration: timedelta
    notes: Optional[str] = None
    rpe: Optional[int] = None
