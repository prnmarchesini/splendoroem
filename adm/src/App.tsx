import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import Login from "./components/Login";
import Leads from "./components/Leads";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCarregando(false);
    });

    // Cobre login, logout, refresh de token e sessão expirada.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (carregando) return <div className="login" />;
  if (!session) return <Login />;

  return (
    <Leads
      email={session.user.email ?? ""}
      onLogout={() => {
        void supabase.auth.signOut();
      }}
    />
  );
}
