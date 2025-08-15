from fastapi import APIRouter

from app.schemas.workout import WorkoutBuildSchema

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
    insert_workout_build(build)
    # if not insert_workout_build(build):
    #     raise HTTPException(status_code=400, detail="Invalid request")

    return build
