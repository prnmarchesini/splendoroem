"""Endpoint de captação de leads do formulário de diagnóstico."""
from fastapi import APIRouter, HTTPException, status

from app.database import get_supabase
from app.schemas import LeadCreate, LeadResponse

router = APIRouter(prefix="/api", tags=["leads"])


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
