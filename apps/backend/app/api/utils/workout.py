from app.services.supabase_client import get_supabase_client
from app.schemas.workout import WorkoutBuildSchema, WorkoutLogSchema


def insert_workout_build(
    workout_build: WorkoutBuildSchema, access_token: str | None = None
):
    supabase = get_supabase_client(access_token)
    try:
        workout_build_dict = workout_build.model_dump(mode="json")

        response = (
            supabase.table("workout_builds")
            .insert(json=workout_build_dict, returning="representation")
            .execute()
        )
        return response.data
    except Exception as e:
        print(f"Error saving workout with ID {workout_build.id}: {e}")


def insert_workout_log(workout_log: WorkoutLogSchema, access_token: str | None = None):
    supabase = get_supabase_client(access_token)
    try:
        workout_log_dict = workout_log.model_dump(mode="json")

        response = (
            supabase.table("workout_logs")
            .insert(json=workout_log_dict, returning="representation")
            .execute()
        )
        return response.data
    except Exception as e:
        print(f"Error saving workout with ID {workout_log.id}: {e}")


def get_workout_logs(access_token: str | None = None):
    supabase = get_supabase_client(access_token)
    try:
        response = supabase.table("workout_logs").select("*").execute()
        return response.data
    except Exception as e:
        print(f"Error fetching workout_logs: {e}")


def get_workout_builds(access_token: str | None = None):
    supabase = get_supabase_client(access_token)
    try:
        response = supabase.table("workout_builds").select("*").execute()
        return response.data
    except Exception as e:
        print(f"Error fetching workout_builds: {e}")


# Working sample data
# {
#   "id": 4,
#   "updated_at": "2025-08-15T03:18:18.675Z",
#   "title": "workout log 4",
#   "description": "created in backend",
#   "workout_data": {
#     "exercises": [
#       {
#         "exercise_id": 0,
#         "tracked": [
#           "reps"
#         ],
#         "sets": [
#           {
#             "fields": {
#               "reps": 10,
#               "duration": "00:01:00",
#               "weight": 60,
#               "rest": "00:00:30"
#             },
#             "completed": true,
#             "completed_at": "2025-08-15T03:40:37.995Z"
#           }
#         ]
#       }
#     ]
#   },
#   "status": "draft",
#   "user_id": "57b33f04-60a7-46a2-959a-35a29ff35f61",
#   "duration": "00:15:01",
#   "goal": "function",
#   "source": "default"
# }
