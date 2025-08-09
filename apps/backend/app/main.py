from functools import lru_cache

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing_extensions import Annotated

from .core import config
from .api.main import api_router


@lru_cache
def get_settings():
    return config.Settings()


app = FastAPI(
    title=get_settings().app_name,
    debug=get_settings().debug,
    version=get_settings().version,
)

origins = [
    "http://localhost:5173",  # Local web server
    "http://192.168.1.12:5173",  # Local web server
    "http://localhost:8081",  # Local mobile server
    "http://192.168.1.12:8081",  # Local mobile server
]

if config.settings.environment == "staging":
    origins.append(config.settings.staging_web_origin)
    origins.append(config.settings.staging_mobile_origin)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/")
def read_root():
    return {"HELLO": "WORLD"}


@app.get("/info")
async def info(settings: Annotated[config.Settings, Depends(get_settings)]):
    return {
        "app_name": settings.app_name,
        "debug": settings.debug,
    }
