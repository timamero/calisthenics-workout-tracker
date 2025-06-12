from functools import lru_cache
from typing import Union

from fastapi import Depends, FastAPI
from typing_extensions import Annotated
import httpx
from . import config

FAKE_API_KEY_ID = "AKIAIOSFODNN7EXAMPLE"
FAKE_API_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"


@lru_cache
def get_settings():
    return config.Settings()


app = FastAPI(
    title=get_settings().app_name,
    debug=get_settings().debug,
    version=get_settings().version,
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
