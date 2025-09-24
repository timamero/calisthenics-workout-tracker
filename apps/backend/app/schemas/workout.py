from typing import List, Optional, Literal
from datetime import datetime, timedelta
from uuid import UUID

from pydantic import BaseModel, Field


class SetFieldsSchema(BaseModel):
    reps: Optional[int] = None
    time: Optional[timedelta] = None
    weight: Optional[int] = None
    rest: Optional[timedelta] = None


class SetSchema(BaseModel):
    id: UUID
    fields: SetFieldsSchema
    completed: bool
    completed_at: Optional[datetime] = None


class WorkoutExerciseSchema(BaseModel):
    id: UUID
    exercise_id: int
    tracked: List[Literal["reps", "time", "weight", "rpe"]]
    sets: List[SetSchema]


class WorkoutDataSchema(BaseModel):
    exercises: List[WorkoutExerciseSchema]


class WorkoutBuildRequestSchema(BaseModel):
    title: Optional[str] = Field(None, max_length=70)
    user_id: Optional[UUID]
    description: Optional[str] = Field(None, max_length=500)
    workout_data: WorkoutDataSchema
    status: Literal["draft", "finalized", "archived"]
    goal: Optional[Literal["function", "endurance", "hypertrophy", "strength", "power"]]
    notes: Optional[str] = Field(None, max_length=750)
    estimated_duration: Optional[timedelta]
    source: Literal["manual", "ai_generated", "default"]
    updated_at: Optional[datetime]


class WorkoutBuildResponseSchema(BaseModel):
    id: int
    created_at: datetime
    title: Optional[str] = Field(None, max_length=70)
    user_id: Optional[UUID]
    description: Optional[str] = Field(None, max_length=500)
    workout_data: WorkoutDataSchema
    status: Literal["draft", "finalized", "archived"]
    goal: Optional[Literal["function", "endurance", "hypertrophy", "strength", "power"]]
    notes: Optional[str] = Field(None, max_length=750)
    estimated_duration: Optional[timedelta]
    source: Literal["manual", "ai_generated", "default"]
    updated_at: Optional[datetime]


class WorkoutLogRequestSchema(BaseModel):
    workout_build_id: Optional[int]
    date: datetime
    title: Optional[str] = Field(None, max_length=70)
    description: Optional[str] = Field(None, max_length=500)
    duration: Optional[timedelta]
    workout_data: WorkoutDataSchema
    rpe: Optional[int] = Field(None, le=10)
    notes: Optional[str] = Field(None, max_length=750)
    status: Literal["draft", "finalized", "archived"]
    goal: Optional[Literal["function", "endurance", "hypertrophy", "strength", "power"]]
    updated_at: Optional[datetime]
    user_id: UUID


class WorkoutLogResponseSchema(BaseModel):
    id: int
    created_at: datetime
    workout_build_id: Optional[int]
    date: datetime
    title: Optional[str] = Field(None, max_length=70)
    description: Optional[str] = Field(None, max_length=500)
    duration: Optional[timedelta]
    workout_data: WorkoutDataSchema
    rpe: Optional[int] = Field(None, le=10)
    notes: Optional[str] = Field(None, max_length=750)
    status: Literal["draft", "finalized", "archived"]
    goal: Optional[Literal["function", "endurance", "hypertrophy", "strength", "power"]]
    updated_at: Optional[datetime]
    user_id: UUID


# class BaseWorkoutSchema(BaseModel):
#     id: int
#     created_at: datetime
#     updated_at: Optional[datetime]
#     title: Optional[str] = Field(None, max_length=70)
#     description: Optional[str] = Field(None, max_length=500)
#     workout_data: WorkoutDataSchema
#     status: Literal["draft", "finalized", "archived"]
#     goal:
#       Optional[Literal["function", "endurance", "hypertrophy", "strength", "power"]]
#     notes: Optional[str] = Field(None, max_length=750)


# class WorkoutLogSchema(BaseWorkoutSchema):
#     user_id: UUID
#     workout_build_id: int
#     date: date
#     duration: timedelta
#     rpe: Optional[int] = Field(None, le=10)
