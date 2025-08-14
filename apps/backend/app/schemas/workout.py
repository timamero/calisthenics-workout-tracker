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
    tracked: List[str]
    sets: List[SetSchema]


class WorkoutDataSchema(BaseModel):
    exercises: List[WorkoutExerciseSchema]


class WorkoutBuildSchema(BaseModel):
    id: int
    created_at: datetime
    user_id: UUID
    title: Optional[str] = None
    description: Optional[str] = None
    goal: Literal["function", "endurance", "hypertrophy", "strength", "power"]
    duration: timedelta
    workout_data: WorkoutDataSchema
    source: Literal["manual", "ai", "default"]
    status: Literal["draft", "finalized", "archived"]


class WorkoutLogSchema(BaseModel):
    id: int
    created_at: datetime
    user_id: UUID
    workout_build_id: int
    date: date
    title: Optional[str] = None
    description: Optional[str] = None
    duration: timedelta
    workout_data: WorkoutDataSchema
    notes: Optional[str] = None
    rpe: Optional[int] = None
    status: Literal["draft", "finalized", "archived"]
