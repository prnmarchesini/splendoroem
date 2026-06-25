const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export interface LeadPayload {
  nome: string;
  whatsapp: string;
  cidade: string;
  potencia_kwp: string;
  mensagem?: string;
}

export interface LeadResult {
  ok: boolean;
  id?: string;
}

/** Envia um lead do formulário de diagnóstico para o backend. */
export async function postLead(payload: LeadPayload): Promise<LeadResult> {
  const res = await fetch(`${API_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail = "Não foi possível enviar agora. Tente novamente.";
    try {
      const body = await res.json();
      if (typeof body?.detail === "string") detail = body.detail;
    } catch {
      /* resposta sem corpo JSON */
    }
    throw new Error(detail);
  }

  return res.json();
}
