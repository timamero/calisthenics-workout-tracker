from fastapi import APIRouter

from .routes import exercises, workout, setProgressions

api_router = APIRouter()
api_router.include_router(exercises.router)
api_router.include_router(workout.router)
api_router.include_router(setProgressions.router)
