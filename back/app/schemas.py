"""Schemas Pydantic da API."""
from pydantic import BaseModel, Field


class LeadCreate(BaseModel):
    """Payload do formulário de diagnóstico (CTA do site)."""

    nome: str = Field(min_length=1, max_length=200)
    whatsapp: str = Field(min_length=1, max_length=40)
    cidade: str = Field(min_length=1, max_length=200)
    # Campo de texto livre no formulário (ex.: "1.500"); armazenado como string.
    potencia_kwp: str = Field(min_length=1, max_length=50)
    mensagem: str | None = Field(default=None, max_length=2000)


class LeadResponse(BaseModel):
    ok: bool
    id: str | None = None
