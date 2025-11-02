from typing import Optional, Literal, List
from datetime import datetime
from pydantic import BaseModel, Field

# TODO: Check with leveragesAssists.schema.ts

# Enum types matching the schema
LeverageAssistType = Literal["leverage", "assist"]
ValueType = Literal["int", "options"]
SortDirection = Literal["ascending", "descending"]
Unit = Literal["ft", "in", "deg", "lb", "kg"]


class LeveragesAssistsResponseSchema(BaseModel):
    id: int
    name: str
    type: LeverageAssistType
    value_type: ValueType
    value_options: Optional[List[str]] = None
    value_int_difficulty_direction: Optional[SortDirection] = None
    value_int_unit: Optional[Unit] = None
    display_order: int
    description: Optional[str] = None
    updated_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.now)
