from app.services.supabase_client import get_supabase_client


def get_exercises(access_token: str):
    supabase = get_supabase_client(access_token)
    try:
        response = supabase.table("exercises").select("*").range(0, 10).execute()
        return response.data
    except Exception as e:
        print(f"Error fetching exercises: {e}")
