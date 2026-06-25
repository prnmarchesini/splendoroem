import { CheckIcon } from "../ui/icons";

const FEATURES = [
  "Diagnóstico remoto antes de deslocar equipe.",
  "Parametrização de inversores e relés de proteção sem visita.",
  "Religamento e ajustes operacionais em minutos, não em dias.",
  "Infraestrutura que funciona até em sites com internet via satélite.",
];

const USINA = ["Inversores", "Relés de proteção", "Dataloggers", "Câmeras CFTV"];
const CENTRAL = [
  "Monitoramento 24h",
  "Parametrização remota",
  "Alarmes & escalonamento",
  "Relatórios de engenharia",
];

export default function ControleRemoto() {
  return (
    <section className="section" id="controle">
      <div className="container">
        <div className="remote__grid">
          <div className="remote__text reveal">
            <span className="eyebrow">Controle remoto</span>
            <h2 className="h-section" style={{ marginTop: "16px" }}>
              Especialistas em controle remoto de usinas
            </h2>
            <p className="lead" style={{ marginTop: "18px" }}>
              Cada usina sob nossa operação é conectada por VPN dedicada à nossa central. Acesso
              seguro e criptografado a inversores, relés de proteção, dataloggers e câmeras, de
              qualquer lugar.
            </p>
            <ul className="remote__list">
              {FEATURES.map((f) => (
                <li key={f}>
                  <CheckIcon className="chk" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="remote__diagram reveal" data-d="1">
            <div className="diagram">
              <div className="diagram__title">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.7}>
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>{" "}
                Arquitetura de conexão segura
              </div>
              <div className="dgrid">
                <div className="dnode">
                  <div className="dnode__h">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                      <rect x="3" y="4" width="18" height="12" rx="1" />
                      <path d="M3 9h18M8 20h8M12 16v4" />
                    </svg>{" "}
                    Usina
                  </div>
                  <div className="dnode__items">
                    {USINA.map((u) => (
                      <span className="dpill" key={u}>
                        <span className="s"></span> {u}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="dconn">
                  <div className="dconn__line"></div>
                  <div className="dconn__lock">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.7}>
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div className="dconn__lbl">VPN dedicada</div>
                  <div className="dconn__line"></div>
                </div>
                <div className="dnode dnode--central">
                  <div className="dnode__h">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                      <path d="M3 12h4l2-7 4 14 2-7h6" />
                    </svg>{" "}
                    Central Splendor
                  </div>
                  <div className="dnode__items">
                    {CENTRAL.map((c) => (
                      <span className="dpill" key={c}>
                        <span className="s"></span> {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
