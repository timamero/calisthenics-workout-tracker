from app.services.supabase_client import supabase


async def get_exercises():
    try:
        response = await supabase.table("planets").select("*").range(0, 1).execute()
        return response
    except Exception as e:
        print(f"Error fetching exercises: {e}")
