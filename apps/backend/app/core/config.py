from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    app_name: str = Field(
        default="Calisthenics Workout Tracker", validation_alias="APP_NAME"
    )
    version: str = Field(default="0.1.0", validation_alias="VERSION")
    secret_key: str = Field(default="dummy-key", validation_alias="SECRET_KEY")
    debug: bool = Field(default=False, validation_alias="DEBUG")
    environment: str = Field(default="development", validation_alias="ENVIRONMENT")

    supabase_url: str = Field(default="", validation_alias="SUPABASE_URL")
    supabase_anon_key: str = Field(default="", validation_alias="SUPABASE_ANON_KEY")
    supabase_jwt_key_id: str = Field(default="", validation_alias="SUPABASE_JWT_KEY_ID")
    supabase_jwtk_url: str = Field(default="", validation_alias="SUPABASE_JWTK_URL")

    test_email: str = Field(default="", validation_alias="TEST_EMAIL")
    test_uid: str = Field(default="", validation_alias="TEST_UID")

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
