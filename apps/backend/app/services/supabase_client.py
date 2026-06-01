from supabase import create_client, Client, ClientOptions

from app.core.config import settings

url: str = settings.supabase_url

environment: str = settings.environment
if (
    environment == "development"
    or environment == "staging"
    or environment == "production"
):
    key: str = settings.supabase_anon_key  # Use this key when integrating with frontend
elif environment == "local":
    key: str = (
        settings.supabase_service_role_key
    )  # Use this key when using backend only


def get_supabase_client(access_token: str | None = None) -> Client:
    if access_token:
        options = ClientOptions(headers={"Authorization": f"Bearer {access_token}"})
        client: Client = create_client(url, key, options)
    else:
        client: Client = create_client(url, key)

    return client
