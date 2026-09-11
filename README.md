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
├── front/    # SPA React (landing one-page) — site institucional
├── adm/      # SPA React (painel de leads, acesso restrito)
└── back/     # API FastAPI (leads: captação pública + consulta autenticada)
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

### Painel administrativo

```bash
cd adm
cp .env.example .env      # preencha as variáveis VITE_
npm install
npm run dev               # http://localhost:5174
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

### `adm/.env` (somente chaves PÚBLICAS)

| Variável                 | Descrição                                              |
| ------------------------ | ------------------------------------------------------ |
| `VITE_API_URL`           | URL base do backend (a mesma usada pelo site)          |
| `VITE_SUPABASE_URL`      | URL do projeto Supabase                                |
| `VITE_SUPABASE_ANON_KEY` | Chave **anon / publishable** (pública)                 |

### `back/.env` (segredos — NUNCA no front/bundle)

| Variável                    | Descrição                                                   |
| --------------------------- | ----------------------------------------------------------- |
| `SUPABASE_URL`              | URL do projeto Supabase (`https://<ref>.supabase.co`)       |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave **service_role / secret** (uso exclusivo no servidor) |
| `CORS_ORIGINS`              | Origens permitidas, separadas por vírgula (**site e painel**)|
| `ADMIN_EMAILS`              | Allowlist de e-mails com acesso ao painel (vírgula). Vazio = qualquer usuário autenticado |

> ⚠️ A `SUPABASE_SERVICE_ROLE_KEY` ignora RLS e dá acesso total ao banco. Ela vive
> **apenas no backend**. O front recebe somente a chave pública. Os `.env` reais e o
> `Acessos.txt` estão no `.gitignore` e não vão para o repositório.

---

## Banco: tabela `leads`

O SQL completo (tabela, coluna `status`, índices e RLS) está em
[`back/db/schema.sql`](back/db/schema.sql). Rode-o no Supabase em
**SQL Editor > New query > Run** — ele é idempotente e pode ser executado de novo
sem quebrar nada.

> ⚠️ **Segurança.** O script **liga RLS** na tabela `leads`. Isso é necessário: o site
> publica a chave `anon` no bundle do navegador e, com RLS desligado, qualquer pessoa
> com essa chave consegue ler todos os leads pela API REST do Supabase. Com RLS ligado
> e nenhuma policy criada, `anon` e `authenticated` ficam bloqueados — e a API continua
> funcionando normalmente, porque usa a `service_role key`, que ignora RLS.

---

## Painel administrativo (`adm/`)

SPA React que lista os leads recebidos pelo site, com busca, filtro por status e
período, troca de estágio, link direto do WhatsApp e exportação em CSV.

### Autenticação

Login por e-mail e senha via **Supabase Auth**. O painel envia o access token para a
API em `Authorization: Bearer <token>`; a API valida o token no Supabase e só então
consulta os leads com a `service_role key`. Nenhuma senha passa pela API, e o painel
nunca lê a tabela `leads` diretamente.

Configuração no Supabase (**Authentication**):

1. **Providers > Email**: deixe habilitado.
2. **Sign In / Providers > "Allow new users to sign up"**: **desligue**. Sem isso,
   qualquer pessoa poderia criar conta e entrar no painel.
3. **Users > Add user**: crie uma conta para cada pessoa da equipe (marque
   *Auto Confirm User*). Defina a senha aí — ela nunca passa por este repositório.
4. Opcional, como segunda trava: liste os e-mails autorizados em `ADMIN_EMAILS`
   no backend. Quem não estiver na lista recebe 403 mesmo com login válido.

---

## API

| Método | Rota          | Descrição                                              |
| ------ | ------------- | ------------------------------------------------------ |
| GET    | `/health`     | Healthcheck (status, app, ambiente)                    |
| POST   | `/api/leads`  | **Público.** Cria um lead. Body: `{ nome, whatsapp, cidade, potencia_kwp, mensagem? }` → `201 { ok, id }` |
| GET    | `/api/leads`  | **Protegido.** Lista leads. Query: `q`, `status`, `from`, `to`, `limit`, `offset` → `{ items, total }` |
| PATCH  | `/api/leads/{id}` | **Protegido.** Atualiza o estágio. Body: `{ status }` |

As rotas protegidas exigem `Authorization: Bearer <access_token do Supabase>`.
`status` aceita `novo`, `em_contato`, `concluido` ou `descartado`.

---

## Deploy no Railway (3 serviços)

Crie **três serviços** no mesmo projeto Railway, apontando para subpastas diferentes
deste repositório. Defina o **Root Directory** de cada um e as variáveis abaixo.

> Deploy pelo Railway **pode** ser executado a partir deste repositório: o CLI já está
> instalado e o project token fica em `back/.env` (`RAILWAY_TOKEN`). Veja
> [`CLAUDE.md`](CLAUDE.md) para as regras do projeto.

### Serviço `back` (FastAPI)

- **Root Directory:** `back`
- **Build:** `pip install -r requirements.txt`
- **Start:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Variáveis:**
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `CORS_ORIGINS` → URLs públicas dos serviços `front` **e** `adm`, separadas por vírgula
    (ex.: `https://splendor-front.up.railway.app,https://splendor-adm.up.railway.app`)
  - (opcional) `ADMIN_EMAILS` → e-mails autorizados no painel, separados por vírgula
  - (opcional) `APP_NAME`, `ENVIRONMENT=production`

### Serviço `front` (Vite/React — estático)

- **Root Directory:** `front`
- **Build:** `npm install && npm run build` (gera `dist/`)
- **Start:** `npm run preview -- --host 0.0.0.0 --port $PORT`
- **Variáveis** (lidas em **tempo de build** — defina-as antes do build):
  - `VITE_API_URL` → URL pública do serviço `back`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

### Serviço `adm` (painel — Vite/React, estático)

- **Root Directory:** `adm`
- **Build:** `npm install && npm run build`
- **Start:** `npm run preview -- --host 0.0.0.0 --port $PORT`
- **Variáveis** (lidas em **tempo de build**):
  - `VITE_API_URL` → URL pública do serviço `back`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

Use o domínio temporário gerado pelo Railway (`*.up.railway.app`) e copie-o para o
`CORS_ORIGINS` do serviço `back`. O painel manda `noindex, nofollow` no HTML, então
não é indexado por buscadores — mas isso não é controle de acesso: a proteção real é
o login do Supabase Auth somado ao RLS da tabela.

> As variáveis `VITE_*` são embutidas no bundle durante o build. Ao alterá-las,
> é preciso **rebuildar** o serviço `front`. Para um servidor estático mais robusto
> em produção, considere `npx serve -s dist -l $PORT` no lugar de `vite preview`.

Após o primeiro deploy: aponte `VITE_API_URL` (front e adm) para a URL do `back` e
`CORS_ORIGINS` (back) para as URLs do `front` e do `adm`, e rebuilde os dois fronts.
