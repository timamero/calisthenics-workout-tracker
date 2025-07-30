from fastapi import APIRouter

from .routes import exercises


api_router = APIRouter()
api_router.include_router(exercises.router)
