"""Leads: captação pelo site (público) e consulta pelo painel (protegida)."""
from datetime import date, datetime, time, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.auth import AdminUser, require_admin
from app.database import get_supabase
from app.schemas import (
    LeadCreate,
    LeadList,
    LeadOut,
    LeadResponse,
    LeadStatus,
    LeadStatusUpdate,
)

router = APIRouter(prefix="/api", tags=["leads"])

# Colunas em que a busca textual livre procura o termo.
_SEARCH_FIELDS = ("nome", "cidade", "whatsapp")


@router.post("/leads", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def create_lead(lead: LeadCreate) -> LeadResponse:
    """Valida e grava um lead na tabela `leads` do Supabase (service_role)."""
    try:
        supabase = get_supabase()
        result = supabase.table("leads").insert(lead.model_dump()).execute()
    except RuntimeError as exc:
        # Credenciais ausentes / configuração inválida.
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)
        ) from exc
    except Exception as exc:  # erro do Supabase / rede
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Não foi possível registrar o lead agora. Tente novamente.",
        ) from exc

    row = result.data[0] if result.data else {}
    return LeadResponse(ok=True, id=str(row["id"]) if row.get("id") is not None else None)


@router.get("/leads", response_model=LeadList)
def list_leads(
    _admin: AdminUser = Depends(require_admin),
    q: str | None = Query(default=None, max_length=200, description="Busca em nome, cidade e WhatsApp"),
    lead_status: LeadStatus | None = Query(default=None, alias="status"),
    date_from: date | None = Query(default=None, alias="from"),
    date_to: date | None = Query(default=None, alias="to"),
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
) -> LeadList:
    """Lista os leads para o painel, com busca, filtros e paginação."""
    try:
        supabase = get_supabase()
        query = supabase.table("leads").select("*", count="exact")

        if q:
            # `or` do PostgREST: casa o termo em qualquer um dos campos de busca.
            term = q.replace(",", " ").replace("*", "").strip()
            if term:
                query = query.or_(",".join(f"{f}.ilike.%{term}%" for f in _SEARCH_FIELDS))
        if lead_status is not None:
            query = query.eq("status", lead_status.value)
        if date_from is not None:
            query = query.gte("created_at", _start_of_day(date_from))
        if date_to is not None:
            # `to` é inclusivo: pega até o fim do dia informado.
            query = query.lt("created_at", _start_of_day(date_to, next_day=True))

        result = (
            query.order("created_at", desc=True)
            .range(offset, offset + limit - 1)
            .execute()
        )
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Não foi possível carregar os leads agora.",
        ) from exc

    items = [LeadOut(**_normalize(row)) for row in (result.data or [])]
    total = result.count if result.count is not None else len(items)
    return LeadList(items=items, total=total)


@router.patch("/leads/{lead_id}", response_model=LeadOut)
def update_lead_status(
    lead_id: str,
    payload: LeadStatusUpdate,
    _admin: AdminUser = Depends(require_admin),
) -> LeadOut:
    """Atualiza o estágio de atendimento de um lead."""
    try:
        supabase = get_supabase()
        result = (
            supabase.table("leads")
            .update({"status": payload.status.value})
            .eq("id", lead_id)
            .execute()
        )
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Não foi possível atualizar o lead agora.",
        ) from exc

    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead não encontrado.")

    return LeadOut(**_normalize(result.data[0]))


def _start_of_day(day: date, next_day: bool = False) -> str:
    """Converte uma data em timestamp ISO UTC para comparar com `created_at`."""
    if next_day:
        day = date.fromordinal(day.toordinal() + 1)
    return datetime.combine(day, time.min, tzinfo=timezone.utc).isoformat()


def _normalize(row: dict) -> dict:
    """Ajusta a linha do Supabase ao schema (id como string, status padrão)."""
    return {**row, "id": str(row.get("id", "")), "status": row.get("status") or LeadStatus.novo.value}
