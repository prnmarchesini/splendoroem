"""Schemas Pydantic da API."""
from datetime import datetime
from enum import Enum

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


class LeadStatus(str, Enum):
    """Estágio do lead no atendimento (coluna `status` da tabela)."""

    novo = "novo"
    em_contato = "em_contato"
    concluido = "concluido"
    descartado = "descartado"


class LeadOut(BaseModel):
    """Lead como devolvido ao painel administrativo."""

    id: str
    created_at: datetime
    nome: str
    whatsapp: str
    cidade: str
    potencia_kwp: str
    mensagem: str | None = None
    status: LeadStatus = LeadStatus.novo


class LeadList(BaseModel):
    """Página de resultados da listagem."""

    items: list[LeadOut]
    total: int


class LeadStatusUpdate(BaseModel):
    status: LeadStatus
