# Regras do projeto

Instruções permanentes para quem (pessoa ou agente) trabalha neste repositório.

## Deploy

**Deploy pelo Railway pode ser executado a partir daqui.** Não é necessário pedir
confirmação a cada vez — a autorização é permanente e vale para os três serviços
(`front`, `adm`, `back`).

- O CLI do Railway já está instalado.
- O project token fica em `back/.env`, na variável `RAILWAY_TOKEN`.
- Use `RAILWAY_TOKEN` do ambiente; nunca copie o valor para outro arquivo, para o
  histórico de comandos ou para mensagens.

## Segredos

**Este repositório é público** (`github.com/prnmarchesini/splendoroem`). Qualquer
coisa comitada aqui fica visível para a internet inteira, e bots varrem o GitHub
atrás de credenciais em minutos.

Por isso, valores de segredo ficam **apenas** em arquivos gitignored:

| Arquivo         | Conteúdo                                                    |
| --------------- | ----------------------------------------------------------- |
| `back/.env`     | `SUPABASE_SERVICE_ROLE_KEY`, `RAILWAY_TOKEN`                |
| `front/.env`    | Chaves `VITE_*` (públicas por natureza, mas ficam fora mesmo assim) |
| `adm/.env`      | Chaves `VITE_*`                                             |
| `Acessos.txt`   | Anotações de acesso diversas                                |

Em arquivo versionado (`.md`, `.example`, código) entram **nomes** de variáveis e
instruções de onde obtê-las — nunca o valor.

Um vazamento do `RAILWAY_TOKEN` dá acesso às variáveis de todos os serviços,
incluindo a `service_role key` do Supabase — que ignora RLS e abre os dados
pessoais dos leads (nome, WhatsApp, cidade).

## Idioma

Código, comentários, commits e documentação em português, com acentuação correta.

## Commits

Padrão `tipo(escopo): descrição` — por exemplo `feat(adm):`, `fix(back):`,
`docs:`, `chore(deploy):`.
