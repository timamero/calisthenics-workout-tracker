from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    app_name: str = Field("Calisthenics Workout Tracker", env="APP_NAME")
    version: str = Field("0.1.0", env="VERSION")
    secret_key: str = Field("dummy-key", env="SECRET_KEY")
    debug: bool = Field(False, env="DEBUG")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
