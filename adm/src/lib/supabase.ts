import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY precisam estar definidos no .env do painel.",
  );
}

/**
 * Cliente usado APENAS para autenticação (login/logout/sessão).
 * Os leads nunca são lidos direto daqui: a tabela tem RLS ligado e quem
 * consulta é a API, com a service_role key no servidor.
 */
export const supabase = createClient(url, anonKey);
