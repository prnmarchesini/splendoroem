"""Configurações da aplicação carregadas a partir do .env."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Splendor O&M API"
    environment: str = "development"
    port: int = 8000

    supabase_url: str = ""
    # Chave service_role (uso EXCLUSIVO no backend — nunca no front/bundle)
    supabase_service_role_key: str = ""

    cors_origins: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()
