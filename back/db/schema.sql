-- ============================================================
-- Splendor O&M — schema da tabela `leads`
-- Rode no Supabase: SQL Editor > New query > Run.
-- É idempotente: pode rodar mais de uma vez sem quebrar nada.
-- ============================================================

-- ---------- Tabela ----------
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  nome          text not null,
  whatsapp      text not null,
  cidade        text not null,
  potencia_kwp  text not null,
  mensagem      text
);

-- ---------- Estágio de atendimento (usado pelo painel) ----------
alter table public.leads
  add column if not exists status text not null default 'novo';

alter table public.leads
  drop constraint if exists leads_status_check;

alter table public.leads
  add constraint leads_status_check
  check (status in ('novo', 'em_contato', 'concluido', 'descartado'));

-- Índices para a listagem do painel (ordenação por data, filtro por status).
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);

-- ============================================================
-- SEGURANÇA (importante)
--
-- O site publica a chave `anon` no bundle do navegador — ela é pública por
-- natureza. Com RLS DESLIGADO nesta tabela, qualquer pessoa com essa chave
-- consegue LER todos os leads pela API REST do Supabase.
--
-- Ligar RLS sem criar policy nenhuma bloqueia anon e authenticated por
-- completo. A API (back) continua funcionando normalmente, porque usa a
-- `service_role key`, que ignora RLS por definição.
-- ============================================================
alter table public.leads enable row level security;

-- Remove policies permissivas que possam ter sido criadas antes.
drop policy if exists "leads_anon_select" on public.leads;
drop policy if exists "leads_public_read" on public.leads;
