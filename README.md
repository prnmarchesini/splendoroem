# Splendor OEM

Aplicação web da Splendor OEM, dividida em backend (API) e frontend (SPA).

## Stack

| Camada    | Tecnologia                                        |
| --------- | ------------------------------------------------- |
| Backend   | Python · FastAPI · Supabase                       |
| Frontend  | React · Vite · TypeScript · Tailwind CSS          |
| Banco     | Supabase (PostgreSQL gerenciado)                  |

## Estrutura

```
.
├── back/     # API FastAPI
└── front/    # SPA React + Vite
```

## Pré-requisitos

- Python 3.11+
- Node.js 20+
- Conta no [Supabase](https://supabase.com)

## Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/prnmarchesini/splendoroem.git
   cd splendoroem
   ```

2. Copie os arquivos de exemplo de variáveis de ambiente e preencha com suas credenciais:
   ```bash
   cp back/.env.example back/.env
   cp front/.env.example front/.env
   ```

### Backend

```bash
cd back
python -m venv .venv
# Windows: .venv\Scripts\activate   |   Linux/Mac: source .venv/bin/activate
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API disponível em `http://localhost:8000` · Docs em `http://localhost:8000/docs`

### Frontend

```bash
cd front
npm install
npm run dev
```

App disponível em `http://localhost:5173`

## Variáveis de ambiente

Veja `back/.env.example` e `front/.env.example`.

> ⚠️ **Nunca** versione os arquivos `.env` reais nem o `Acessos.txt` — já estão no `.gitignore`.
