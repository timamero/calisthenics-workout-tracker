from typing import Optional, Literal, List
from datetime import datetime
from pydantic import BaseModel, Field

SetProgressionType = Literal["challenge", "assist"]
ValueType = Literal["int", "options"]
SortDirection = Literal["ascending", "descending"]
Unit = Literal["lb", "kg", "in", "cm", "m", "ft", "deg"]


class SetProgressionsResponseSchema(BaseModel):
    id: int
    name: str
    type: SetProgressionType
    value_type: ValueType
    value_options: Optional[List[str]] = None
    value_int_difficulty_direction: Optional[SortDirection] = None
    value_int_unit: Optional[Unit] = None
    display_order: int
    description: Optional[str] = None
    updated_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.now)
