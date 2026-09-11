import type { Lead } from "./api";
import { STATUS_LABEL } from "./api";

/** Data e hora no formato brasileiro, a partir do timestamptz do banco. */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Monta o link do WhatsApp a partir do que o lead digitou.
 * Números brasileiros sem DDI recebem o 55 na frente.
 */
export function whatsappLink(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length <= 11) digits = `55${digits}`;
  return `https://wa.me/${digits}`;
}

const CSV_COLUMNS: { key: keyof Lead | "status_label"; label: string }[] = [
  { key: "created_at", label: "Recebido em" },
  { key: "nome", label: "Nome" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "cidade", label: "Cidade" },
  { key: "potencia_kwp", label: "Potência (kWp)" },
  { key: "status_label", label: "Status" },
  { key: "mensagem", label: "Mensagem" },
];

function csvCell(value: string): string {
  // Escapa aspas e envolve o campo — cobre vírgula, quebra de linha e aspas.
  return `"${value.replace(/"/g, '""')}"`;
}

/** Gera o CSV dos leads já filtrados e dispara o download no navegador. */
export function downloadCsv(leads: Lead[], filename = "leads.csv"): void {
  const header = CSV_COLUMNS.map((c) => csvCell(c.label)).join(";");
  const rows = leads.map((lead) =>
    CSV_COLUMNS.map((c) => {
      if (c.key === "status_label") return csvCell(STATUS_LABEL[lead.status]);
      if (c.key === "created_at") return csvCell(formatDateTime(lead.created_at));
      return csvCell(String(lead[c.key] ?? ""));
    }).join(";"),
  );

  // BOM para o Excel abrir os acentos corretamente.
  const blob = new Blob([`﻿${[header, ...rows].join("\r\n")}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
