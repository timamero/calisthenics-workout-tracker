from functools import lru_cache
from typing import Union

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing_extensions import Annotated
import httpx

from . import config
from .dependencies import get_current_user_id


@lru_cache
def get_settings():
    return config.Settings()


app = FastAPI(
    title=get_settings().app_name,
    debug=get_settings().debug,
    version=get_settings().version,
)

origins = [
    "http://localhost:5173",
    "http://192.168.1.12:5173",
    "http://localhost:8081",
    "http://192.168.1.12:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"HELLO": "WORLD"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.get("/test")
def read_test():
    r = httpx.get("https://www.example.org/")
    return r.text


@app.get("/info")
async def info(settings: Annotated[config.Settings, Depends(get_settings)]):
    return {
        "app_name": settings.app_name,
        "debug": settings.debug,
    }


@app.get("/protected-route")
async def read_protected_data(user_id: Annotated[str, Depends(get_current_user_id)]):
    """
    This route requires a valid Supabase JWT signed with asymmetric keys.
    The user_id from the token's 'sub' claim is injected.
    """
    return {
        "message": f"Welcome, authenticated user {user_id}! This is protected data."
    }
