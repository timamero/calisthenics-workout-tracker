from typing import List, Optional

from app.schemas.setProgressions import SetProgressionsResponseSchema
from app.services.supabase_client import get_supabase_client


def get_set_progressions_list(
    access_token: Optional[str] = None,
) -> List[SetProgressionsResponseSchema]:
    """
    Retrieve list of all challenges and assists from the database.
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
        return [SetProgressionsResponseSchema(**item) for item in response.data]
    except Exception as e:
        print(f"Error fetching challenges and assists: {e}")
        raise
