import { useCallback, useEffect, useState } from "react";
import {
  fetchLeads,
  updateLeadStatus,
  STATUSES,
  STATUS_LABEL,
  UnauthorizedError,
  type Lead,
  type LeadFilters,
  type LeadStatus,
} from "../lib/api";
import { downloadCsv, formatDateTime, whatsappLink } from "../lib/format";

const PAGE_SIZE = 100;

const FILTROS_VAZIOS: LeadFilters = { q: "", status: "", from: "", to: "" };

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 0 0 1.51 5.26l-.999 3.648 3.978-1.043z" />
    </svg>
  );
}

export default function Leads({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [filtros, setFiltros] = useState<LeadFilters>(FILTROS_VAZIOS);
  const [pagina, setPagina] = useState(0);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(
    async (f: LeadFilters, page: number) => {
      setCarregando(true);
      setErro(null);
      try {
        const data = await fetchLeads({ ...f, limit: PAGE_SIZE, offset: page * PAGE_SIZE });
        setLeads(data.items);
        setTotal(data.total);
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          onLogout();
          return;
        }
        setErro(err instanceof Error ? err.message : "Não foi possível carregar os leads.");
      } finally {
        setCarregando(false);
      }
    },
    [onLogout],
  );

  // Busca com debounce: digitar no campo de texto não dispara uma chamada por tecla.
  useEffect(() => {
    const t = setTimeout(() => carregar(filtros, pagina), 300);
    return () => clearTimeout(t);
  }, [filtros, pagina, carregar]);

  function setFiltro(patch: Partial<LeadFilters>) {
    setPagina(0);
    setFiltros((f) => ({ ...f, ...patch }));
  }

  async function mudarStatus(lead: Lead, status: LeadStatus) {
    const anterior = lead.status;
    // Atualização otimista: a linha muda na hora e volta atrás se a API falhar.
    setLeads((atual) => atual.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    try {
      await updateLeadStatus(lead.id, status);
    } catch (err) {
      setLeads((atual) => atual.map((l) => (l.id === lead.id ? { ...l, status: anterior } : l)));
      if (err instanceof UnauthorizedError) {
        onLogout();
        return;
      }
      setErro(err instanceof Error ? err.message : "Não foi possível atualizar o status.");
    }
  }

  const ultimaPagina = Math.max(0, Math.ceil(total / PAGE_SIZE) - 1);

  return (
    <>
      <header className="topbar">
        <img src="/logo-light.png" alt="Splendor O&M" className="topbar__logo" />
        <div className="topbar__right">
          <span className="topbar__user">{email}</span>
          <button className="btn btn--ghost" type="button" onClick={onLogout}>
            Sair
          </button>
        </div>
      </header>

      <main className="page">
        <div className="page__head">
          <div>
            <h1 className="page__title">Leads do site</h1>
            <p className="page__count">
              {carregando
                ? "carregando…"
                : `${total} ${total === 1 ? "lead encontrado" : "leads encontrados"}`}
            </p>
          </div>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => downloadCsv(leads, `leads-${new Date().toISOString().slice(0, 10)}.csv`)}
            disabled={leads.length === 0}
          >
            Exportar CSV
          </button>
        </div>

        <div className="filters">
          <div>
            <label htmlFor="q">Buscar</label>
            <input
              id="q"
              type="search"
              placeholder="Nome, cidade ou WhatsApp"
              value={filtros.q}
              onChange={(e) => setFiltro({ q: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={filtros.status}
              onChange={(e) => setFiltro({ status: e.target.value as LeadStatus | "" })}
            >
              <option value="">Todos</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="from">De</label>
            <input
              id="from"
              type="date"
              value={filtros.from}
              onChange={(e) => setFiltro({ from: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="to">Até</label>
            <input
              id="to"
              type="date"
              value={filtros.to}
              onChange={(e) => setFiltro({ to: e.target.value })}
            />
          </div>
          <div className="filters__actions">
            <button
              className="btn btn--ghost"
              type="button"
              onClick={() => {
                setPagina(0);
                setFiltros(FILTROS_VAZIOS);
              }}
            >
              Limpar
            </button>
          </div>
        </div>

        {erro && <p className="msg-error" style={{ marginBottom: 18 }}>{erro}</p>}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Recebido</th>
                <th>Nome</th>
                <th>WhatsApp</th>
                <th>Cidade</th>
                <th>Potência</th>
                <th>Mensagem</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="cell-date">{formatDateTime(lead.created_at)}</td>
                  <td className="cell-name">{lead.nome}</td>
                  <td>
                    <a
                      className="wa-link"
                      href={whatsappLink(lead.whatsapp)}
                      target="_blank"
                      rel="noopener"
                    >
                      <WhatsappIcon />
                      {lead.whatsapp}
                    </a>
                  </td>
                  <td>{lead.cidade}</td>
                  <td className="cell-pot">{lead.potencia_kwp}</td>
                  <td className="cell-msg">{lead.mensagem || "—"}</td>
                  <td>
                    <select
                      className="status-select"
                      data-status={lead.status}
                      value={lead.status}
                      onChange={(e) => mudarStatus(lead, e.target.value as LeadStatus)}
                      aria-label={`Status de ${lead.nome}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABEL[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!carregando && leads.length === 0 && (
            <p className="empty">Nenhum lead encontrado com esses filtros.</p>
          )}
        </div>

        {total > PAGE_SIZE && (
          <div className="pager">
            <button
              className="btn btn--ghost"
              type="button"
              onClick={() => setPagina((p) => Math.max(0, p - 1))}
              disabled={pagina === 0}
            >
              ← Anterior
            </button>
            <span>
              página {pagina + 1} de {ultimaPagina + 1}
            </span>
            <button
              className="btn btn--ghost"
              type="button"
              onClick={() => setPagina((p) => Math.min(ultimaPagina, p + 1))}
              disabled={pagina >= ultimaPagina}
            >
              Próxima →
            </button>
          </div>
        )}
      </main>
    </>
  );
}
