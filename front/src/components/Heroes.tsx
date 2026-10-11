function HeroStats() {
  return (
    <div className="hero-stats">
      <div className="hero-stat">
        <div className="hero-stat__num">
          +<span data-count="200">200</span>
          <span className="u">MW</span>
        </div>
        <div className="hero-stat__label">em projetos básicos</div>
      </div>
      <div className="hero-stat">
        <div className="hero-stat__num">
          +<span data-count="50">50</span>
          <span className="u">MW</span>
        </div>
        <div className="hero-stat__label">em projetos executivos</div>
      </div>
      <div className="hero-stat">
        <div className="hero-stat__num">
          +<span data-count="50">50</span>
          <span className="u">MW</span>
        </div>
        <div className="hero-stat__label">comissionados</div>
      </div>
      <div className="hero-stat">
        <div className="hero-stat__num">
          +<span data-count="30">30</span>
          <span className="u">MW</span>
        </div>
        <div className="hero-stat__label">construídos</div>
      </div>
      <div className="hero-stat">
        <div className="hero-stat__num">
          +<span data-count="20">20</span>
          <span className="u">MW</span>
        </div>
        <div className="hero-stat__label">usinas em operação</div>
      </div>
    </div>
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

export default function Heroes() {
  return (
    <div className="heroes" id="heroes">
      <HeroB />
    </div>
  );
}
