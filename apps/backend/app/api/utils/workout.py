from typing import List, Optional

from app.core.exceptions import WorkoutDatabaseError
from app.services.supabase_client import get_supabase_client
from app.schemas.workout import (
    WorkoutBuildRequestSchema,
    WorkoutBuildResponseSchema,
    WorkoutLogRequestSchema,
    WorkoutLogResponseSchema,
    DeleteWorkoutRequestSchema,
)


def insert_workout_build(
    workout_build: WorkoutBuildRequestSchema, access_token: str | None = None
) -> WorkoutBuildResponseSchema:
    """Insert a workout build.

    Args:
        workout_build: Build data to insert.
        access_token: Optional Supabase access token.

    Returns:
        The inserted workout build, or None if no row was returned.

    Raises:
        WorkoutDatabaseError: If the insert fails.
    """
    supabase = get_supabase_client(access_token)
    try:
        workout_build_dict = workout_build.model_dump(mode="json")
        response = (
            supabase.table("workout_builds")
            .insert(json=workout_build_dict, returning="representation")
            .execute()
        )
    except Exception as e:
        raise WorkoutDatabaseError(
            "Internal server error: Error saving workout build in database"
        ) from e

    if not response.data:
        return None

    return response.data[0]


def insert_workout_log(
    workout_log: WorkoutLogRequestSchema, access_token: str | None = None
):
    """Insert a workout log.

    Args:
        workout_log: Log data to insert.
        access_token: Optional Supabase access token.

    Returns:
        The inserted workout log, or None if no row was returned.

    Raises:
        WorkoutDatabaseError: If the insert fails.
    """
    supabase = get_supabase_client(access_token)
    try:
        workout_log_dict = workout_log.model_dump(mode="json")

        response = (
            supabase.table("workout_logs")
            .insert(json=workout_log_dict, returning="representation")
            .execute()
        )
    except Exception as e:
        raise WorkoutDatabaseError(
            "Internal server error: Error saving workout log in database"
        ) from e

    if not response.data:
        return None

    return response.data[0]


def update_workout_log(
    workout_log: WorkoutLogResponseSchema, access_token: str | None = None
):
    """Update an existing workout log.

    Args:
        workout_log: Log data, including the ID to update.
        access_token: Optional Supabase access token.

    Returns:
        The updated workout log, or None if no row was updated.

    Raises:
        WorkoutDatabaseError: If the update fails.
    """
    supabase = get_supabase_client(access_token)
    try:
        workout_log_dict = workout_log.model_dump(mode="json")

        response = (
            supabase.table("workout_logs")
            .update(json=workout_log_dict, returning="representation")
            .eq("id", workout_log.id)
            .execute()
        )
    except Exception as e:
        raise WorkoutDatabaseError(
            "Internal server error: Error updating workout in database"
        ) from e

    if not response.data:
        return None

    return response.data[0]


def delete_workout_log(
    workout_log_id: DeleteWorkoutRequestSchema, access_token: str | None = None
) -> Optional[WorkoutLogResponseSchema]:
    """Delete a workout log.

    Args:
        workout_log_id: ID of the log to delete.
        access_token: Optional Supabase access token.

    Returns:
        The deleted workout log, or None if no row was deleted.

    Raises:
        WorkoutDatabaseError: If the delete fails.
    """
    supabase = get_supabase_client(access_token)
    try:
        response = (
            supabase.table("workout_logs")
            .delete()
            .eq("id", workout_log_id.id)
            .execute()
        )
    except Exception as e:
        raise WorkoutDatabaseError(
            "Internal server error: Error deleting workout log from database"
        ) from e

    if not response.data:
        return None

    return response.data[0]


def get_workout_logs(access_token: str | None = None) -> List[WorkoutLogResponseSchema]:
    """Retrieve all workout logs.

    Args:
        access_token: Optional Supabase access token.

    Returns:
        A list of workout logs, possibly empty.

    Raises:
        WorkoutDatabaseError: If the query fails.
    """
    supabase = get_supabase_client(access_token)
    try:
        select_query = supabase.table("workout_logs").select("*")
        response = select_query.execute()
    except Exception as e:
        raise WorkoutDatabaseError(
            "Internal server error: Error fetching workout logs from database"
        ) from e

    return response.data


def get_workout_builds(
    access_token: str | None = None,
) -> List[WorkoutBuildResponseSchema]:
    """Retrieve all workout builds.

    Args:
        access_token: Optional Supabase access token.

    Returns:
        A list of workout builds, possibly empty.

    Raises:
        WorkoutDatabaseError: If the query fails.
    """
    supabase = get_supabase_client(access_token)
    try:
        select_query = supabase.table("workout_builds").select("*")
        response = select_query.execute()
    except Exception as e:
        raise WorkoutDatabaseError(
            "Internal server error: Error fetching workout builds from database"
        ) from e

    return response.data
