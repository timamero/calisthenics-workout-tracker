from app.services.supabase_client import supabase


def get_exercises():
    try:
        response = supabase.table("exercises").select("*").range(0, 10).execute()
        return response.data
    except Exception as e:
        print(f"Error fetching exercises: {e}")
