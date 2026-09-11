"""Autenticação do painel administrativo via Supabase Auth.

O painel (`adm/`) faz login com e-mail e senha direto no Supabase e envia o
access token em `Authorization: Bearer <token>`. Aqui o token é validado contra
o Supabase e, opcionalmente, o e-mail é conferido contra a allowlist
`ADMIN_EMAILS`.

Nenhuma senha passa por esta API: o backend só vê o token já emitido.
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.config import settings
from app.database import get_supabase

_bearer = HTTPBearer(auto_error=False)


class AdminUser:
    """Usuário autenticado e autorizado a operar o painel."""

    def __init__(self, user_id: str, email: str) -> None:
        self.id = user_id
        self.email = email


def require_admin(
    credentials: HTTPAuthorizationCredentials | None = Depends(_bearer),
) -> AdminUser:
    """Valida o token do Supabase e autoriza o acesso ao painel."""
    if credentials is None or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Autenticação necessária.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        supabase = get_supabase()
        result = supabase.auth.get_user(credentials.credentials)
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)
        ) from exc
    except Exception as exc:  # token inválido/expirado ou erro de rede
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sessão inválida ou expirada. Entre novamente.",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    user = getattr(result, "user", None)
    if user is None or not getattr(user, "id", None):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sessão inválida ou expirada. Entre novamente.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    email = (getattr(user, "email", None) or "").lower()
    allowlist = settings.admin_emails_list
    if allowlist and email not in allowlist:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Esta conta não tem acesso ao painel.",
        )

    return AdminUser(user_id=str(user.id), email=email)
