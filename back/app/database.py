"""Cliente Supabase compartilhado pela aplicação."""
from functools import lru_cache

from supabase import Client, create_client

from app.config import settings


@lru_cache
def get_supabase() -> Client:
    """Retorna uma instância única (cacheada) do cliente Supabase (service_role)."""
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise RuntimeError(
            "SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY precisam estar definidos no .env"
        )
    return create_client(settings.supabase_url, settings.supabase_service_role_key)
