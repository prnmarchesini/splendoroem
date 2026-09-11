"""Configurações da aplicação carregadas a partir do .env."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Splendor O&M API"
    environment: str = "development"
    port: int = 8000

    supabase_url: str = ""
    # Chave service_role (uso EXCLUSIVO no backend — nunca no front/bundle)
    supabase_service_role_key: str = ""

    cors_origins: str = "http://localhost:5173,http://localhost:5174"

    # Allowlist de e-mails com acesso ao painel administrativo, separados por
    # vírgula. Vazio = qualquer usuário autenticado no Supabase entra, então
    # mantenha o cadastro público (signup) desligado no projeto Supabase.
    admin_emails: str = ""

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def admin_emails_list(self) -> list[str]:
        return [email.strip().lower() for email in self.admin_emails.split(",") if email.strip()]


settings = Settings()
