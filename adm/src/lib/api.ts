import { supabase } from "./supabase";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export const STATUSES = ["novo", "em_contato", "concluido", "descartado"] as const;
export type LeadStatus = (typeof STATUSES)[number];

export const STATUS_LABEL: Record<LeadStatus, string> = {
  novo: "Novo",
  em_contato: "Em contato",
  concluido: "Concluído",
  descartado: "Descartado",
};

export interface Lead {
  id: string;
  created_at: string;
  nome: string;
  whatsapp: string;
  cidade: string;
  potencia_kwp: string;
  mensagem: string | null;
  status: LeadStatus;
}

export interface LeadFilters {
  q?: string;
  status?: LeadStatus | "";
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}

/** Erro de sessão expirada/ausente — a UI usa para mandar de volta ao login. */
export class UnauthorizedError extends Error {}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new UnauthorizedError("Sessão expirada. Entre novamente.");

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    throw new UnauthorizedError("Sessão expirada. Entre novamente.");
  }
  if (!res.ok) {
    let detail = "Não foi possível concluir a operação.";
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

export async function fetchLeads(filters: LeadFilters): Promise<{ items: Lead[]; total: number }> {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.status) params.set("status", filters.status);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  params.set("limit", String(filters.limit ?? 100));
  params.set("offset", String(filters.offset ?? 0));

  return request(`/api/leads?${params.toString()}`);
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead> {
  return request(`/api/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
