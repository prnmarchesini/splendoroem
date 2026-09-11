import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";

/**
 * Tela de login. A senha vai direto do navegador para o Supabase Auth —
 * nem a API nem este código a armazenam.
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);

    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha });

    if (error) {
      setErro(
        error.message === "Invalid login credentials"
          ? "E-mail ou senha incorretos."
          : error.message,
      );
      setEnviando(false);
    }
    // Em caso de sucesso, o onAuthStateChange do App troca a tela.
  }

  return (
    <div className="login">
      <div className="login__card">
        <img src="/logo-light.png" alt="Splendor O&M" className="login__logo" />
        <h1 className="login__title">Painel de leads</h1>
        <p className="login__sub">Acesso restrito à equipe Splendor O&amp;M.</p>

        <form className="login__fields" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && <p className="msg-error">{erro}</p>}

          <button className="btn btn--gold" type="submit" disabled={enviando}>
            {enviando ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
