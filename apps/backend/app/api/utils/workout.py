from typing import List

from app.services.supabase_client import get_supabase_client
from app.schemas.workout import (
    WorkoutBuildRequestSchema,
    WorkoutBuildResponseSchema,
    WorkoutLogRequestSchema,
    WorkoutLogResponseSchema,
)


def insert_workout_build(
    workout_build: WorkoutBuildRequestSchema, access_token: str | None = None
) -> WorkoutBuildResponseSchema:
    supabase = get_supabase_client(access_token)
    try:
        workout_build_dict = workout_build.model_dump(mode="json")
        response = (
            supabase.table("workout_builds")
            .insert(json=workout_build_dict, returning="representation")
            .execute()
        )
        return response.data[0]
    except Exception as e:
        print(f"Error saving workout: {e}")


def insert_workout_log(
    workout_log: WorkoutLogRequestSchema, access_token: str | None = None
):
    supabase = get_supabase_client(access_token)
    try:
        workout_log_dict = workout_log.model_dump(mode="json")

        response = (
            supabase.table("workout_logs")
            .insert(json=workout_log_dict, returning="representation")
            .execute()
        )
        return response.data[0]
    except Exception as e:
        print(f"Error saving workout: {e}")


def update_workout_log(
    workout_log: WorkoutLogResponseSchema, access_token: str | None = None
):
    supabase = get_supabase_client(access_token)
    try:
        workout_log_dict = workout_log.model_dump(mode="json")

        response = (
            supabase.table("workout_logs")
            .update(json=workout_log_dict, returning="representation")
            .eq("id", workout_log.id)
            .execute()
        )
        return response.data[0]
    except Exception as e:
        print(f"Error updating workout: {e}")


def delete_workout_log(
    workout_log_id: int, access_token: str | None = None
):
    supabase = get_supabase_client(access_token)
    try:
        response = (
            supabase.table("workout_logs")
            .delete()
            .eq("id", workout_log_id)
            .execute()
        )
        return response.data[0]
    except Exception as e:
        print(f"Error deleting workout: {e}")


def get_workout_logs(access_token: str | None = None) -> List[WorkoutLogResponseSchema]:
    supabase = get_supabase_client(access_token)
    try:
        select_query = supabase.table("workout_logs").select("*")
        if access_token:
            auth_user_id = supabase.auth.get_user(jwt=access_token).user.id
            response = select_query.eq("user_id", auth_user_id).execute()
        else:
            response = select_query.execute()
        return response.data
    except Exception as e:
        print(f"Error fetching workout_logs: {e}")


def get_workout_builds(
    access_token: str | None = None,
) -> List[WorkoutBuildResponseSchema]:
    supabase = get_supabase_client(access_token)
    try:
        select_query = supabase.table("workout_builds").select("*")
        if access_token:
            auth_user_id = supabase.auth.get_user(jwt=access_token).user.id
            response = select_query.eq("user_id", auth_user_id).execute()
        else:
            response = select_query.execute()
        return response.data
    except Exception as e:
        print(f"Error fetching workout_builds: {e}")
