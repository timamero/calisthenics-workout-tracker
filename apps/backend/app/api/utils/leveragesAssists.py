from typing import List, Optional

from ...schemas.leveragesAssists import LeveragesAssistsResponseSchema
from ...services.supabase_client import get_supabase_client


def get_leverages_assists_list(
    access_token: Optional[str] = None
) -> List[LeveragesAssistsResponseSchema]:
    """
    Retrieve list of all leverages and assists from the database.
    Args:
        access_token: Optional Supabase access token for authenticated requests
    Returns:
        List of LeveragesAssistsResponseSchema objects
    """
    supabase = get_supabase_client(access_token)
    try:
        response = (
            supabase.table("leverages_assists")
            .select("*")
            .order("display_order")
            .execute()
        )
        return [
            LeveragesAssistsResponseSchema(**item) for item in response.data
        ]
    except Exception as e:
        print(f"Error fetching leverages and assists: {e}")
        raise
