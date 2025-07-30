from supabase import create_client, Client, ClientOptions

from app.core.config import settings

url: str = settings.supabase_url
key: str = settings.supabase_anon_key


def get_supabase_client(access_token: str) -> Client:
    options: ClientOptions = {
        "global": {"headers": {"Authorization": f"Bearer {access_token}"}}
    }
    client: Client = create_client(url, key, options)

    return client
