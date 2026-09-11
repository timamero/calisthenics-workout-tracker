from typing import List, Annotated
from fastapi import APIRouter, HTTPException, Depends
from pyrate_limiter import Duration, Limiter, Rate
from fastapi_limiter.depends import RateLimiter

from app.api.utils.workout import (
    insert_workout_build,
    get_workout_builds,
    insert_workout_log,
    update_workout_log,
    delete_workout_log,
    get_workout_logs,
)
from app.schemas.workout import (
    WorkoutBuildRequestSchema,
    WorkoutBuildResponseSchema,
    WorkoutLogRequestSchema,
    WorkoutLogResponseSchema,
    DeleteWorkoutRequestSchema,
)

from app.core.dependencies import get_access_token

router = APIRouter(prefix="/workout")

standard_api_limit = Limiter(Rate(60, Duration.MINUTE))
standard_write_limit = Limiter(Rate(10, Duration.MINUTE))


@router.post(
    "/build",
    dependencies=[Depends(RateLimiter(limiter=standard_write_limit))],
)
def save_build(
    build: WorkoutBuildRequestSchema,
    token: Annotated[str | None, Depends(get_access_token)],
) -> WorkoutBuildResponseSchema:
    """
    Insert workout build.
    """
    workout_build = insert_workout_build(workout_build=build, access_token=token)

    if not workout_build:
        raise HTTPException(status_code=400, detail="Invalid request")

    return workout_build


@router.post(
    "/log",
    dependencies=[Depends(RateLimiter(limiter=standard_write_limit))],
)
def save_log(
    log: WorkoutLogRequestSchema,
    token: Annotated[str | None, Depends(get_access_token)],
) -> WorkoutLogResponseSchema:
    """
    Insert workout log.
    """
    workout_log = insert_workout_log(workout_log=log, access_token=token)

    if not workout_log:
        raise HTTPException(status_code=400, detail="Invalid request")

    return workout_log


@router.put(
    "/log",
    dependencies=[Depends(RateLimiter(limiter=standard_write_limit))],
)
def update_log(
    log: WorkoutLogResponseSchema,
    token: Annotated[str | None, Depends(get_access_token)],
) -> WorkoutLogResponseSchema:
    """
    Update workout log.
    """
    workout_log = update_workout_log(workout_log=log, access_token=token)

    if not workout_log:
        raise HTTPException(status_code=400, detail="Invalid request")

    return workout_log


@router.delete(
    "/log",
    dependencies=[Depends(RateLimiter(limiter=standard_write_limit))],
)
def delete_log(
    workout_log_id: DeleteWorkoutRequestSchema,
    token: Annotated[str | None, Depends(get_access_token)],
) -> WorkoutLogResponseSchema:
    """
    Delete workout log.
    """
    workout_log = delete_workout_log(workout_log_id=workout_log_id, access_token=token)

    if not workout_log:
        raise HTTPException(status_code=404, detail="Workout not found")

    return workout_log


@router.get(
    "/logs",
    dependencies=[Depends(RateLimiter(limiter=standard_api_limit))],
)
def read_workout_logs(
    token: Annotated[str | None, Depends(get_access_token)],
) -> List[WorkoutLogResponseSchema]:
    """
    Retrieve list of workout logs
    """
    logs = get_workout_logs(access_token=token)

    if logs is None:
        raise HTTPException(status_code=400, detail="Invalid request")

    return logs


@router.get(
    "/builds",
    dependencies=[Depends(RateLimiter(limiter=standard_api_limit))],
)
def read_workout_builds(
    token: Annotated[str | None, Depends(get_access_token)],
) -> List[WorkoutBuildResponseSchema]:
    """
    Retrieve list of workout builds
    """
    builds = get_workout_builds(access_token=token)

    if builds is None:
        raise HTTPException(status_code=400, detail="Invalid request")

    return builds
