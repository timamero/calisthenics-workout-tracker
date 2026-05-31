from functools import lru_cache

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing_extensions import Annotated

from .core import config
from .api.main import api_router


@lru_cache
def get_settings():
    return config.Settings()


SHOW_DOCS = (
    config.settings.environment != "production"
    or config.settings.environment != "staging"
)

app = FastAPI(
    title=get_settings().app_name,
    debug=get_settings().debug,
    version=get_settings().version,
    # Disable Swagger UI and Redoc in production and staging
    docs_url="/docs" if SHOW_DOCS else None,
    redoc_url="/redoc" if SHOW_DOCS else None,
    openapi_url="/openapi.json" if SHOW_DOCS else None,
)

# Add condition to set origins for local environment
origins = [
    "http://localhost:5173",  # Local web server
    "http://localhost:8081",  # Local mobile server
    "http://127.0.0.1:8000",  # Origin for the local FastAPI server
]

if config.settings.environment == "local":
    origins.append(config.settings.local_origin)
    origins.append(config.settings.local_web_origin)
    origins.append(config.settings.local_mobile_exp_origin)
    origins.append(config.settings.local_mobile_origin)

if config.settings.environment == "staging":
    origins.append(config.settings.staging_origin)
    origins.append(config.settings.staging_web_origin)
    origins.append(config.settings.staging_mobile_origin)

if config.settings.environment == "production":
    origins.append(config.settings.production_origin)
    origins.append(config.settings.production_web_origin)
    origins.append(config.settings.production_mobile_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
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
