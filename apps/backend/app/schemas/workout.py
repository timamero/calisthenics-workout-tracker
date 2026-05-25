from typing import List, Optional, Literal
from datetime import datetime, timedelta
from uuid import UUID

from pydantic import BaseModel, Field


class SetProgressionSchema(BaseModel):
    id: UUID
    set_progression_id: int
    value: Optional[int | str] = None


# class LeverageSchema(BaseModel):
#     id: UUID
#     leverages_assists_id: int
#     value: Optional[int | str] = None


# class AssistSchema(BaseModel):
#     id: UUID
#     leverages_assists_id: int
#     value: Optional[int | str] = None


class SetFieldsSchema(BaseModel):
    reps: Optional[int] = None
    time: Optional[str] = None  # ISO 8601 duration string
    rest: Optional[str] = None  # ISO 8601 duration string
    setProgressions: Optional[List[SetProgressionSchema]]


class SetSchema(BaseModel):
    id: UUID
    completed: bool
    completed_at: Optional[str] = None  # ISO 8601 timestamp or null
    fields: SetFieldsSchema


class WorkoutExerciseSchema(BaseModel):
    id: UUID
    exercise_id: int
    tracked: List[str]
    order: int
    type: Literal["exercise"] = "exercise"
    sets: List[SetSchema]


class SupersetSchema(BaseModel):
    id: UUID
    order: int
    type: Literal["superset"] = "superset"
    exercises: List[WorkoutExerciseSchema]


class SectionSchema(BaseModel):
    id: UUID
    name: Optional[str]
    order: int
    type: Literal["section"] = "section"
    items: List[WorkoutExerciseSchema | SupersetSchema]


class WorkoutDataSchema(BaseModel):
    data: List[WorkoutExerciseSchema | SectionSchema | SupersetSchema]


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
    user_id: UUID
    workout_build_id: Optional[int]
    date: datetime
    title: Optional[str] = Field(None, max_length=70)
    description: Optional[str] = Field(None, max_length=500)
    duration: Optional[timedelta]
    workout_data: WorkoutDataSchema
    rpe: Optional[int] = Field(None, le=10)
    notes: Optional[str] = Field(None, max_length=750)
    status: Literal["draft", "finalized", "archived"]
    updated_at: Optional[datetime]
    goal: Optional[Literal["function", "endurance", "hypertrophy", "strength", "power"]]
