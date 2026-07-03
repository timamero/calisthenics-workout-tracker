from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    app_name: str = Field(
        default="Calisthenics Workout Tracker", validation_alias="APP_NAME"
    )
    version: str = Field(default="0.1.0", validation_alias="VERSION")
    debug: bool = Field(default=False, validation_alias="DEBUG")
    environment: str = Field(
        default="local-integration", validation_alias="ENVIRONMENT"
    )

    supabase_url: str = Field(default="", validation_alias="SUPABASE_URL")
    supabase_anon_key: str = Field(default="", validation_alias="SUPABASE_ANON_KEY")
    supabase_service_role_key: str = Field(
        default="", validation_alias="SUPABASE_SERVICE_ROLE_KEY"
    )
    supabase_jwt_key_id: str = Field(default="", validation_alias="SUPABASE_JWT_KEY_ID")
    supabase_jwtk_url: str = Field(default="", validation_alias="SUPABASE_JWTK_URL")

    local_origin: str = Field(default="", validation_alias="LOCAL_ORIGIN")
    local_web_origin: str = Field(default="", validation_alias="LOCAL_WEB_ORIGIN")
    local_mobile_exp_origin: str = Field(
        default="", validation_alias="LOCAL_MOBILE_EXP_ORIGIN"
    )
    local_mobile_origin: str = Field(default="", validation_alias="LOCAL_MOBILE_ORIGIN")

    staging_origin: str = Field(default="", validation_alias="STAGING_ORIGIN")
    staging_web_origin: str = Field(default="", validation_alias="STAGING_WEB_ORIGIN")
    staging_mobile_origin: str = Field(
        default="", validation_alias="STAGING_MOBILE_ORIGIN"
    )
    production_origin: str = Field(default="", validation_alias="PRODUCTION_ORIGIN")
    production_web_origin: str = Field(
        default="", validation_alias="PRODUCTION_WEB_ORIGIN"
    )
    production_mobile_origin: str = Field(
        default="", validation_alias="PRODUCTION_MOBILE_ORIGIN"
    )

    # Might use test_email and test_uid later for tests
    test_email: str = Field(default="", validation_alias="TEST_EMAIL")
    test_uid: str = Field(default="", validation_alias="TEST_UID")

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
