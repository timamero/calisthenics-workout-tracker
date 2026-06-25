from typing import List
from fastapi import APIRouter, HTTPException, Request, Depends
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

from app.core.config import settings

router = APIRouter(prefix="/workout")

standard_api_limit = Limiter(Rate(60, Duration.MINUTE))
standard_write_limit = Limiter(Rate(10, Duration.MINUTE))


@router.post(
    "/build",
    dependencies=[Depends(RateLimiter(limiter=standard_write_limit))],
)
def save_build(
    build: WorkoutBuildRequestSchema, request: Request
) -> WorkoutBuildResponseSchema:
    """
    Insert workout build.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if settings.environment == "local-isolated":
            workout_build = insert_workout_build(build)
        else:
            raise HTTPException(status_code=401, detail="Authentication required")
    else:
        access_token = auth_header.split(" ")[1]
        workout_build = insert_workout_build(build, access_token)

    if not workout_build:
        raise HTTPException(status_code=400, detail="Invalid request")
    return workout_build


@router.post(
    "/log",
    dependencies=[Depends(RateLimiter(limiter=standard_write_limit))],
)
def save_log(
    log: WorkoutLogRequestSchema, request: Request
) -> WorkoutLogResponseSchema:
    """
    Insert workout log.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if settings.environment == "local-isolated":
            workout_log = insert_workout_log(log)
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    else:
        access_token = auth_header.split(" ")[1]
        workout_log = insert_workout_log(log, access_token)
    if not workout_log:
        raise HTTPException(status_code=400, detail="Invalid request")
    print("workout_log", workout_log)
    return workout_log


@router.put(
    "/log",
    dependencies=[Depends(RateLimiter(limiter=standard_write_limit))],
)
def update_log(
    log: WorkoutLogResponseSchema, request: Request
) -> WorkoutLogResponseSchema:
    """
    Update workout log.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if settings.environment == "local":
            workout_log = update_workout_log(log)
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    else:
        access_token = auth_header.split(" ")[1]
        workout_log = update_workout_log(log, access_token)
    if not workout_log:
        raise HTTPException(status_code=400, detail="Invalid request")

    return workout_log


@router.delete(
    "/log",
    dependencies=[Depends(RateLimiter(limiter=standard_write_limit))],
)
def delete_log(
    workout_log_id: DeleteWorkoutRequestSchema, request: Request
) -> WorkoutLogResponseSchema:
    """
    Delete workout log.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if settings.environment == "local":
            workout_log = delete_workout_log(workout_log_id)
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    else:
        access_token = auth_header.split(" ")[1]
        workout_log = delete_workout_log(workout_log_id, access_token)
    if not workout_log:
        raise HTTPException(status_code=400, detail="Invalid request")

    return workout_log


@router.get(
    "/logs",
    dependencies=[Depends(RateLimiter(limiter=standard_api_limit))],
)
def read_workout_logs(request: Request) -> List[WorkoutLogResponseSchema]:
    """
    Retrieve list of workout logs
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if settings.environment == "local-isolated":
            logs = get_workout_logs()
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    else:
        access_token = auth_header.split(" ")[1]
        logs = get_workout_logs(access_token)
    if logs is None:
        raise HTTPException(status_code=400, detail="Invalid request")
    return logs


@router.get(
    "/builds",
    dependencies=[Depends(RateLimiter(limiter=standard_api_limit))],
)
def read_workout_builds(request: Request) -> List[WorkoutBuildResponseSchema]:
    """
    Retrieve list of workout builds
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if settings.environment == "local-isolated":
            builds = get_workout_builds()
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    else:
        access_token = auth_header.split(" ")[1]
        builds = get_workout_builds(access_token)

    if builds is None:
        raise HTTPException(status_code=400, detail="Invalid request")
    return builds
