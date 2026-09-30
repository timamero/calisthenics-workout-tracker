from typing import Optional

from app.core.exceptions import WorkoutDatabaseError
from app.core.types import SupabaseRows
from app.services.supabase_client import get_supabase_client


def get_set_progressions(
    access_token: Optional[str] = None,
) -> SupabaseRows:
    """Retrieve all set progressions.

    Args:
        access_token: Optional Supabase access token.

    Returns:
        Set progressions, possibly an empty list.

    Raises:
        WorkoutDatabaseError: If the query fails.
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

    return response.data
