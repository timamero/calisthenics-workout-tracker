from typing import List, Annotated
from fastapi import APIRouter, HTTPException, Depends

from app.api.utils.workout import (
    insert_workout_build,
    get_workout_builds,
    insert_workout_log,
    update_workout_log,
    delete_workout_log,
    get_workout_logs,
)
from app.core.exceptions import WorkoutDatabaseError
from app.core.dependencies import (
    get_access_token,
    verify_supabase_user,
    get_standard_api_limiter,
    get_write_api_limiter,
)
from app.schemas.workout import (
    WorkoutBuildRequestSchema,
    WorkoutBuildResponseSchema,
    WorkoutLogRequestSchema,
    WorkoutLogResponseSchema,
    DeleteWorkoutRequestSchema,
)

router = APIRouter(prefix="/workout")


@router.post(
    "/build",
    dependencies=[
        Depends(get_write_api_limiter()),
        Depends(verify_supabase_user),
    ],
)
def save_build(
    build: WorkoutBuildRequestSchema,
    token: Annotated[str | None, Depends(get_access_token)],
) -> WorkoutBuildResponseSchema:
    """Create a workout build.

    Args:
        build: Build data to insert.
        token: Optional Supabase access token.

    Returns:
        The created workout build.

    Raises:
        HTTPException: If the insert fails or returns no workout.
    """
    try:
        workout_build = insert_workout_build(workout_build=build, access_token=token)
    except WorkoutDatabaseError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to save workout build due to database error: {e}",
        ) from e

    if workout_build is None:
        raise HTTPException(status_code=404, detail="Workout not found")

    return workout_build


@router.post(
    "/log",
    dependencies=[
        Depends(get_write_api_limiter()),
        Depends(verify_supabase_user),
    ],
)
def save_log(
    log: WorkoutLogRequestSchema,
    token: Annotated[str | None, Depends(get_access_token)],
) -> WorkoutLogResponseSchema:
    """Create a workout log.

    Args:
        log: Log data to insert.
        token: Optional Supabase access token.

    Returns:
        The created workout log.

    Raises:
        HTTPException: If the insert fails or returns no workout.
    """
    try:
        workout_log = insert_workout_log(workout_log=log, access_token=token)
    except WorkoutDatabaseError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to save workout log due to database error: {e}",
        ) from e

    if workout_log is None:
        raise HTTPException(status_code=404, detail="Workout not found")

    return workout_log


@router.put(
    "/log",
    dependencies=[
        Depends(get_write_api_limiter()),
        Depends(verify_supabase_user),
    ],
)
def update_log(
    log: WorkoutLogResponseSchema,
    token: Annotated[str | None, Depends(get_access_token)],
) -> WorkoutLogResponseSchema:
    """Update a workout log.

    Args:
        log: Updated log data.
        token: Optional Supabase access token.

    Returns:
        The updated workout log.

    Raises:
        HTTPException: If the update fails or the log is not found.
    """
    try:
        workout_log = update_workout_log(workout_log=log, access_token=token)
    except WorkoutDatabaseError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to update workout log due to database error: {e}",
        ) from e

    if workout_log is None:
        raise HTTPException(status_code=404, detail="Workout not found")

    return workout_log


@router.delete(
    "/log",
    dependencies=[
        Depends(get_write_api_limiter()),
        Depends(verify_supabase_user),
    ],
)
def delete_log(
    workout_log_id: DeleteWorkoutRequestSchema,
    token: Annotated[str | None, Depends(get_access_token)],
) -> WorkoutLogResponseSchema:
    """Delete a workout log.

    Args:
        workout_log_id: ID of the log to delete.
        token: Optional Supabase access token.

    Returns:
        The deleted workout log.

    Raises:
        HTTPException: If the delete fails or the log is not found.
    """
    try:
        deleted_workout_log = delete_workout_log(
            workout_log_id=workout_log_id, access_token=token
        )
    except WorkoutDatabaseError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to delete workout log due to database error: {e}",
        ) from e

    if deleted_workout_log is None:
        raise HTTPException(status_code=404, detail="Workout log not found")

    return deleted_workout_log


@router.get(
    "/logs",
    dependencies=[
        Depends(get_standard_api_limiter()),
        Depends(verify_supabase_user),
    ],
)
def read_workout_logs(
    token: Annotated[str | None, Depends(get_access_token)],
) -> List[WorkoutLogResponseSchema]:
    """Retrieve all workout logs.

    Args:
        token: Optional Supabase access token.

    Returns:
        All workout logs, possibly an empty list.

    Raises:
        HTTPException: If the query fails.
    """
    try:
        logs = get_workout_logs(access_token=token)
    except WorkoutDatabaseError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to retrieve workout logs due to database error: {e}",
        ) from e

    return logs


@router.get(
    "/builds",
    dependencies=[
        Depends(get_standard_api_limiter()),
        Depends(verify_supabase_user),
    ],
)
def read_workout_builds(
    token: Annotated[str | None, Depends(get_access_token)],
) -> List[WorkoutBuildResponseSchema]:
    """Retrieve all workout builds.

    Args:
        token: Optional Supabase access token.

    Returns:
        All workout builds, possibly an empty list.

    Raises:
        HTTPException: If the query fails.
    """
    try:
        builds = get_workout_builds(access_token=token)
    except WorkoutDatabaseError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to retrieve workout builds due to database error: {e}",
        ) from e

    return builds
