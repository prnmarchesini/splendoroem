# Splendor O&M

Site institucional da **Splendor O&M** (operação e manutenção de usinas solares), em monorepo: frontend (SPA) + backend (API de captação de leads).

## Stack

| Camada   | Tecnologia                                          |
| -------- | --------------------------------------------------- |
| Frontend | React · Vite · TypeScript · Tailwind CSS v4         |
| Backend  | Python · FastAPI · Supabase (supabase-py)           |
| Banco    | Supabase (PostgreSQL gerenciado)                    |

## Estrutura

```
.
├── front/    # SPA React (landing one-page) — recriação do design Claude
└── back/     # API FastAPI (/health + POST /api/leads)
```

---

## Rodando localmente

Pré-requisitos: **Node.js 20+** e **Python 3.11+**.

### Frontend

```bash
cd front
cp .env.example .env      # preencha as variáveis VITE_
npm install
npm run dev               # http://localhost:5173
```

### Backend

```bash
cd back
cp .env.example .env      # preencha SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY
python -m venv .venv
# Windows: .venv\Scripts\activate   |   Linux/Mac: source .venv/bin/activate
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload  # http://localhost:8000  (docs em /docs)
```

---

## Variáveis de ambiente

### `front/.env` (somente chaves PÚBLICAS)

| Variável                 | Descrição                                              |
| ------------------------ | ------------------------------------------------------ |
| `VITE_API_URL`           | URL base do backend (ex.: `http://localhost:8000`)     |
| `VITE_SUPABASE_URL`      | URL do projeto Supabase                                |
| `VITE_SUPABASE_ANON_KEY` | Chave **anon / publishable** (pública)                 |

### `back/.env` (segredos — NUNCA no front/bundle)

| Variável                    | Descrição                                                   |
| --------------------------- | ----------------------------------------------------------- |
| `SUPABASE_URL`              | URL do projeto Supabase (`https://<ref>.supabase.co`)       |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave **service_role / secret** (uso exclusivo no servidor) |
| `CORS_ORIGINS`              | Origens permitidas, separadas por vírgula (domínio do front)|

> ⚠️ A `SUPABASE_SERVICE_ROLE_KEY` ignora RLS e dá acesso total ao banco. Ela vive
> **apenas no backend**. O front recebe somente a chave pública. Os `.env` reais e o
> `Acessos.txt` estão no `.gitignore` e não vão para o repositório.

---

## Banco: tabela `leads`

O endpoint `POST /api/leads` grava nesta tabela. Crie-a no Supabase
(**SQL Editor**) antes de usar:

```sql
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  nome          text not null,
  whatsapp      text not null,
  cidade        text not null,
  potencia_kwp  text not null,
  mensagem      text
);
```

O backend usa a `service_role key`, então **não** é necessário criar policies de RLS
para a gravação funcionar. Se ativar RLS para leitura, lembre que a API continua
gravando normalmente por usar a service key.

---

## API

| Método | Rota          | Descrição                                              |
| ------ | ------------- | ------------------------------------------------------ |
| GET    | `/health`     | Healthcheck (status, app, ambiente)                    |
| POST   | `/api/leads`  | Cria um lead. Body: `{ nome, whatsapp, cidade, potencia_kwp, mensagem? }` → `201 { ok, id }` |

---

## Deploy no Railway (2 serviços)

Crie **dois serviços** no mesmo projeto Railway, apontando para subpastas diferentes
deste repositório. Defina o **Root Directory** de cada um e as variáveis abaixo.

> Os comandos são apenas documentação — **não** rode deploy a partir daqui.

### Serviço `back` (FastAPI)

- **Root Directory:** `back`
- **Build:** `pip install -r requirements.txt`
- **Start:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Variáveis:**
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `CORS_ORIGINS` → URL pública do serviço `front` (ex.: `https://splendor-front.up.railway.app`)
  - (opcional) `APP_NAME`, `ENVIRONMENT=production`

### Serviço `front` (Vite/React — estático)

- **Root Directory:** `front`
- **Build:** `npm install && npm run build` (gera `dist/`)
- **Start:** `npm run preview -- --host 0.0.0.0 --port $PORT`
- **Variáveis** (lidas em **tempo de build** — defina-as antes do build):
  - `VITE_API_URL` → URL pública do serviço `back`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

> As variáveis `VITE_*` são embutidas no bundle durante o build. Ao alterá-las,
> é preciso **rebuildar** o serviço `front`. Para um servidor estático mais robusto
> em produção, considere `npx serve -s dist -l $PORT` no lugar de `vite preview`.

Após o primeiro deploy: aponte `VITE_API_URL` (front) para a URL do `back` e
`CORS_ORIGINS` (back) para a URL do `front`, e rebuilde o front.
