from fastapi import APIRouter

from app.schemas.workout import WorkoutBuildSchema

router = APIRouter(prefix="/workout")


@router.post("/build")
def save_build(build: WorkoutBuildSchema):
    """
    Retrieve a list of exercises.
    """
    # auth_header = request.headers.get("Authorization")
    # if not auth_header or not auth_header.startswith("Bearer "):
    #     raise HTTPException(status_code=401, detail="Authentication required")

    # access_token = auth_header.split(" ")[1]

    return build
