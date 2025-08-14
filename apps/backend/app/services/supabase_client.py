from supabase import create_client, Client, ClientOptions

from app.core.config import settings

url: str = settings.supabase_url
# key: str = settings.supabase_anon_key
key: str = settings.supabase_service_role_key


def get_supabase_client(access_token: str | None = None) -> Client:
    options = ClientOptions(headers={"Authorization": f"Bearer {access_token}"})

    if access_token:
        client: Client = create_client(url, key, options)
    else:
        client: Client = create_client(url, key)

    return client
