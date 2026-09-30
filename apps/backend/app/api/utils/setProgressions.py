from typing import List, Optional

from app.core.exceptions import WorkoutDatabaseError
from app.schemas.setProgressions import SetProgressionsResponseSchema
from app.services.supabase_client import get_supabase_client


def get_set_progressions(
    access_token: Optional[str] = None,
) -> Optional[List[SetProgressionsResponseSchema]]:
    """
    Retrieve list of all set progressions (challenges and assists) from the database.
    """
    supabase = get_supabase_client(access_token)
    try:
        response = (
            supabase.table("set_progressions")
            .select("*")
            .order("display_order")
            .execute()
        )
    except Exception as e:
        raise WorkoutDatabaseError(
            "Internal server error: Error fetching challenges and assists"
        ) from e

    if not response.data:
        return None

    return [SetProgressionsResponseSchema(**item) for item in response.data]
