from typing import List, Optional

from app.core.exceptions import WorkoutDatabaseError
from app.schemas.setProgressions import SetProgressionsResponseSchema
from app.services.supabase_client import get_supabase_client


def get_set_progressions_list(
    access_token: Optional[str] = None,
) -> Optional[List[SetProgressionsResponseSchema]]:
    """
    Retrieve list of all challenges and assists (set progressions) from the database.
    Args:
        access_token: Optional Supabase access token for authenticated requests
    Returns:
        List of SetProgressionsResponseSchema objects
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
