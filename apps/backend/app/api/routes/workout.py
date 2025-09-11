from typing import List
from fastapi import APIRouter, HTTPException, Request

from app.api.utils.workout import (
    insert_workout_build,
    get_workout_builds,
    insert_workout_log,
    get_workout_logs,
)
from app.schemas.workout import (
    WorkoutBuildRequestSchema,
    WorkoutBuildResponseSchema,
    WorkoutLogSchema,
)

from app.core.config import settings

environment: str = settings.environment

router = APIRouter(prefix="/workout")


@router.post("/build")
def save_build(
    build: WorkoutBuildRequestSchema, request: Request
) -> WorkoutBuildResponseSchema:
    """
    Insert workout build.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if environment == "local":
            workout_build = insert_workout_build(build)
        else:
            raise HTTPException(status_code=401, detail="Authentication required")
    else:
        access_token = auth_header.split(" ")[1]
        workout_build = insert_workout_build(build, access_token)

    if not workout_build:
        raise HTTPException(status_code=400, detail="Invalid request")
    return workout_build


@router.post("/log")
def save_log(log: WorkoutLogSchema, request: Request):
    """
    Insert workout log.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if environment == "local":
            workout_log = insert_workout_log(log)
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    else:
        access_token = auth_header.split(" ")[1]
        workout_log = insert_workout_log(log, access_token)
    if not workout_log:
        raise HTTPException(status_code=400, detail="Invalid request")

    return workout_log


@router.get("/logs")
def read_workout_logs(request: Request):
    """
    Retrieve list of workout logs
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if environment == "local":
            logs = get_workout_logs()
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    else:
        access_token = auth_header.split(" ")[1]
        logs = get_workout_logs(access_token)
    if not logs:
        raise HTTPException(status_code=400, detail="Invalid request")

    return logs


@router.get("/builds")
def read_workout_builds(request: Request) -> List[WorkoutBuildResponseSchema]:
    """
    Retrieve list of workout builds
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        if environment == "local":
            builds = get_workout_builds()
        else:
            raise HTTPException(status_code=401, detail="Authentication required")

    else:
        access_token = auth_header.split(" ")[1]
        builds = get_workout_builds(access_token)

    if not builds:
        raise HTTPException(status_code=400, detail="Invalid request")
    return builds
