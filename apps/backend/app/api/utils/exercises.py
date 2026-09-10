from fastapi import HTTPException

from app.services.supabase_client import get_supabase_client
from app.schemas.exercise import ExerciseFilterParams


def get_exercises(filter_query: ExerciseFilterParams, access_token: str | None = None):

    try:
        supabase = get_supabase_client(access_token)
    except Exception as e:
        print(f"Error initializing Supabase client: {e}")
        raise HTTPException(
            status_code=500,
            detail="Invalid Request: Error initializing Supabase client",
        )

    muscles = filter_query.muscles
    equipments = filter_query.equipments
    difficulty = filter_query.difficulty
    emphasis = filter_query.emphasis
    q = filter_query.q

    try:
        query = supabase.table("exercises").select("*")

        conditions = ""

        if muscles:
            muscle_conditions = ",".join(
                [f'target_muscles.cs.{{"{m}"}}' for m in muscles]
            )
            conditions = conditions + muscle_conditions

        if equipments:
            equipment_conditions = ",".join(
                [f'required_equipment.cs.{{"{e}"}}' for e in equipments]
            )
            conditions = conditions + "," + equipment_conditions

        if conditions:
            query = query.or_(conditions)

        if difficulty:
            query.eq("difficulty", difficulty)

        if emphasis:
            query.eq("emphasis", emphasis)

        if q:
            query.ilike("name", f"%{q}%")

        response = query.execute()
        return response.data
    except Exception as e:
        print(f"Error fetching exercises: {e}")
        raise HTTPException(
            status_code=500, detail="Internal server error: Error fetching exercises"
        )


def get_exercise_by_id(exercise_id: str, access_token: str | None = None):
    try:
        supabase = get_supabase_client(access_token)
    except Exception as e:
        print(f"Error initializing Supabase client: {e}")
        raise HTTPException(
            status_code=500,
            detail="Invalid Request: Error initializing Supabase client",
        )
    try:
        response = (
            supabase.table("exercises")
            .select("*")
            .eq("id", exercise_id)
            .single()
            .execute()
        )
        return response.data
    except Exception as e:
        print(f"Error fetching exercise with ID {exercise_id}: {e}")
        raise HTTPException(
            status_code=500, detail="Internal server error: Error fetching exercise"
        )
