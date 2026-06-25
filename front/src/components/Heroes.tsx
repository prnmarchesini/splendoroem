function HeroStats() {
  return (
    <div className="hero-stats">
      <div className="hero-stat">
        <div className="hero-stat__num">
          +<span data-count="200">0</span>
          <span className="u">MW</span>
        </div>
        <div className="hero-stat__label">em projetos básicos</div>
      </div>
      <div className="hero-stat">
        <div className="hero-stat__num">
          +<span data-count="50">0</span>
          <span className="u">MW</span>
        </div>
        <div className="hero-stat__label">em projetos executivos</div>
      </div>
      <div className="hero-stat">
        <div className="hero-stat__num">
          +<span data-count="50">0</span>
          <span className="u">MW</span>
        </div>
        <div className="hero-stat__label">comissionados</div>
      </div>
      <div className="hero-stat">
        <div className="hero-stat__num">
          <span data-count="20">0</span>
          <span className="u">MW</span>
        </div>
        <div className="hero-stat__label">construídos</div>
      </div>
    </div>
  );
}

/* ---------- Hero A: editorial split (claro) ---------- */
function HeroA() {
  return (
    <section className="heroA" data-hero="a">
      <div className="container">
        <div className="heroA__grid">
          <div className="heroA__text">
            <span className="eyebrow reveal">Operação e Manutenção · Usinas solares</span>
            <h1 className="h-display reveal" data-d="1">
              Operação e Manutenção de usinas solares com{" "}
              <span className="mark">tecnologia própria</span>
            </h1>
            <p className="lead reveal" data-d="2">
              Quem projeta, comissiona e constrói usinas sabe exatamente onde elas falham. A Splendor
              O&M une engenharia, construção e software próprio para manter sua usina gerando no
              máximo.
            </p>
            <div className="heroA__ctas reveal" data-d="3">
              <a className="btn btn--gold" href="#diagnostico">Agendar diagnóstico gratuito</a>
              <a className="btn btn--ghost" href="#tecnologia">
                Conhecer o meuWatt <span className="arr">→</span>
              </a>
            </div>
          </div>
          <div className="heroA__media reveal" data-d="2">
            <div className="ph" style={{ aspectRatio: "4/4.5" }}>
              <span className="ph__corner">FOTO</span>
              <span className="ph__tag">
                [ FOTO ]<br />
                Usina solar com céu limpo —<br />
                drone ou ângulo baixo dos trackers/módulos
              </span>
            </div>
            <div className="chip" style={{ left: "-22px", bottom: "34px" }}>
              <span className="chip__k">
                <span className="dot"></span> Geração agora
              </span>
              <span className="chip__v">
                <span data-count="1840" data-dur="1600">0</span> <span className="u">kW</span>
              </span>
            </div>
            <div className="chip" style={{ right: "-16px", top: "30px" }}>
              <span className="chip__k">Disponibilidade</span>
              <span className="chip__v">
                <span data-count="100" data-dur="1600">0</span>
                <span className="u">%</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <HeroStats />
    </section>
  );
}

/* ---------- Hero B: dark cinematic (navy) — ativo por padrão ---------- */
function HeroB() {
  return (
    <section className="heroB is-active" data-hero="b">
      <div className="heroB__bg"></div>
      <div className="heroB__photo ph ph--navy" style={{ border: 0, borderRadius: 0 }}>
        <span className="ph__tag">[ FOTO ] usina · drone</span>
      </div>
      <div className="heroB__inner">
        <div className="container">
          <span className="eyebrow reveal">Operação e Manutenção · Usinas solares</span>
          <h1 className="h-display reveal" data-d="1">
            Operação e Manutenção de usinas solares com{" "}
            <span className="gold-text">tecnologia própria</span>
          </h1>
          <p className="lead reveal" data-d="2">
            Quem projeta, comissiona e constrói usinas sabe exatamente onde elas falham. A Splendor
            O&M une engenharia, construção e software próprio para manter sua usina gerando no
            máximo.
          </p>
          <div className="heroB__ctas reveal" data-d="3">
            <a className="btn btn--gold" href="#diagnostico">Agendar diagnóstico gratuito</a>
            <a className="btn btn--on-navy" href="#tecnologia">
              Conhecer o meuWatt <span className="arr">→</span>
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <HeroStats />
      </div>
    </section>
  );
}

/* ---------- Hero C: dashboard-forward (claro + produto) ---------- */
function HeroC() {
  return (
    <section className="heroC" data-hero="c">
      <div className="container">
        <div className="heroC__grid">
          <div className="heroC__text">
            <span className="eyebrow reveal">Supervisório próprio · meuWatt</span>
            <h1 className="h-display reveal" data-d="1">
              Sua usina inteira em <span className="mark">uma só tela</span>
            </h1>
            <p className="lead reveal" data-d="2">
              Operação e manutenção com tecnologia própria. Inversores de qualquer fabricante, rede,
              proteção e até as câmeras de segurança — monitorados por quem projeta, constrói e opera
              usinas.
            </p>
            <div className="heroC__ctas reveal" data-d="3">
              <a className="btn btn--gold" href="#diagnostico">Agendar diagnóstico gratuito</a>
              <a className="btn btn--ghost" href="#tecnologia">
                Conhecer o meuWatt <span className="arr">→</span>
              </a>
            </div>
          </div>
          <div className="heroC__media reveal" data-d="2">
            <div className="frame">
              <div className="frame__bar">
                <div className="frame__dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
                <div className="frame__addr">meuwatt.com.br · Usina Ibitinga</div>
              </div>
              <img
                src="/assets/print-analise.png"
                alt="Painel meuWatt — análise gráfica de geração por inversor"
                className="frame__img frame__img--crop"
              />
            </div>
          </div>
        </div>
      </div>
      <HeroStats />
    </section>
  );
}

export default function Heroes() {
  return (
    <div className="heroes" id="heroes">
      <HeroA />
      <HeroB />
      <HeroC />
    </div>
  );
}
