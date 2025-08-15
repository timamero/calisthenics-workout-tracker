from fastapi import APIRouter, HTTPException
from app.api.utils.workout import (
    insert_workout_build,
    get_workout_builds,
    insert_workout_log,
)
from app.schemas.workout import WorkoutBuildSchema, WorkoutLogSchema

router = APIRouter(prefix="/workout")


@router.post("/build")
def save_build(build: WorkoutBuildSchema):
    """
    Insert workout build.
    """
    # auth_header = request.headers.get("Authorization")
    # if not auth_header or not auth_header.startswith("Bearer "):
    #     raise HTTPException(status_code=401, detail="Authentication required")

    # access_token = auth_header.split(" ")[1]
    workout_build = insert_workout_build(build)
    if not workout_build:
        raise HTTPException(status_code=400, detail="Invalid request")

    return workout_build


@router.post("/log")
def save_log(log: WorkoutLogSchema):
    """
    Insert workout log.
    """
    # auth_header = request.headers.get("Authorization")
    # if not auth_header or not auth_header.startswith("Bearer "):
    #     raise HTTPException(status_code=401, detail="Authentication required")

    # access_token = auth_header.split(" ")[1]
    workout_log = insert_workout_log(log)
    if not workout_log:
        raise HTTPException(status_code=400, detail="Invalid request")

    return workout_log


@router.get("/builds")
def read_workout_builds():
    """
    Retrieve list of workout builds
    """
    builds = get_workout_builds()
    return builds
