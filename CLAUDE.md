# Regras do projeto

Instruções permanentes para quem (pessoa ou agente) trabalha neste repositório.

## Deploy

Hospedagem no **Coolify da KingHost** (projeto "Splendor O&M", 3 apps com
Dockerfile em `back/`, `front/` e `adm/`). **Push na `main` publica sozinho**
(webhook do GitHub); cada app só reconstrói quando a pasta dele muda.

| Pasta    | Domínio                          |
| -------- | -------------------------------- |
| `front/` | https://splendoroem.com.br (+ `www`) |
| `adm/`   | https://adm.splendoroem.com.br   |
| `back/`  | https://api.splendoroem.com.br   |

As variáveis ficam no painel do Coolify. As `VITE_*` são lidas no build: ao mudá-las,
rebuilde o `front` e o `adm`.

## Segredos

**Este repositório é público** (`github.com/prnmarchesini/splendoroem`). Qualquer
coisa comitada aqui fica visível para a internet inteira, e bots varrem o GitHub
atrás de credenciais em minutos.

Por isso, valores de segredo ficam **apenas** em arquivos gitignored:

| Arquivo         | Conteúdo                                                    |
| --------------- | ----------------------------------------------------------- |
| `back/.env`     | `SUPABASE_SERVICE_ROLE_KEY`                                 |
| `front/.env`    | Chaves `VITE_*` (públicas por natureza, mas ficam fora mesmo assim) |
| `adm/.env`      | Chaves `VITE_*`                                             |
| `Acessos.txt`   | Anotações de acesso diversas                                |

Em arquivo versionado (`.md`, `.example`, código) entram **nomes** de variáveis e
instruções de onde obtê-las — nunca o valor.

Um vazamento da `service_role key` do Supabase ignora RLS e abre os dados
pessoais dos leads (nome, WhatsApp, cidade).

## Idioma

Código, comentários, commits e documentação em português, com acentuação correta.

## Commits

Padrão `tipo(escopo): descrição` — por exemplo `feat(adm):`, `fix(back):`,
`docs:`, `chore(deploy):`.
