from pydantic import BaseModel
from typing import List, Optional, Literal


class ExerciseSchema(BaseModel):
    id: int
    name: str
    target_muscles: List[str]
    required_equipment: Optional[List[str]] = None
    emphasis: Literal["plyometrics", "mobility", "power", "endurance", "strength"]
    difficulty: Literal["beginner", "intermediate", "advanced"]
    tags: List[str]
    instructions: List[str]
    default_tracking_type: List[Literal["reps", "weight", "time", "rpe"]]
    video_url: Optional[str] = None
    source: Optional[str] = None
    updated_at: Optional[str] = None
    created_at: Optional[str] = None
    default_leverage_id: Optional[int] = None
    default_assist_id: Optional[int] = None


class ExerciseFilterParams(BaseModel):
    q: str | None = None
    muscles: list[str] = []
    equipments: list[str] = []
    difficulty: Literal["beginner", "intermediate", "advanced", ""] = ""
    emphasis: Literal[
        "plyometrics", "mobility", "power", "endurance", "strength", ""
    ] = ""
