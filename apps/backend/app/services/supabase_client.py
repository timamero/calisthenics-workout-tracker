from supabase import create_client, Client

from app.core.config import settings

url: str = settings.supabase_url
key: str = settings.supabase_anon_key
supabase: Client = create_client(url, key)
