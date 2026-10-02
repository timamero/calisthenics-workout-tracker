from fastapi import HTTPException
from supabase import create_client, Client, ClientOptions

from app.core.config import settings

url: str = settings.supabase_url

if (
    settings.environment == "local-integration"
    or settings.environment == "staging"
    or settings.environment == "production"
):
    key: str = settings.supabase_anon_key  # Use this key when integrating with frontend
elif settings.environment == "local-isolated":
    key: str = (
        settings.supabase_service_role_key
    )  # Use this key when using backend only
else:
    raise ValueError(
        (
            f"Invalid environment: {settings.environment}. Must be one of"
            f" 'local-integration', 'staging', 'production', or 'local-isolated'."
        )
    )


def get_supabase_client(access_token: str | None = None) -> Client:
    try:
        if access_token:
            options = ClientOptions(headers={"Authorization": f"Bearer {access_token}"})
            client: Client = create_client(url, key, options)
        else:
            client: Client = create_client(url, key)

        return client
    except Exception as e:
        print(f"Error creating Supabase client: {e}")
        raise HTTPException(
            status_code=500,
            detail="Invalid Request: Error creating Supabase client",
        )
