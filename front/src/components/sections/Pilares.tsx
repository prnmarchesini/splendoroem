export default function Pilares() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Por que somos diferentes</span>
          <h2 className="h-section">Engenharia, construção e software — na mesma empresa</h2>
          <p className="lead">
            Não somos só uma equipe de manutenção. Operamos a sua usina com quem entende cada etapa
            dela.
          </p>
        </div>
        <div className="pillars">
          <article className="pillar reveal">
            <span className="pillar__bar"></span>
            <span className="pillar__no">01 — Engenharia</span>
            <h3>Quem analisa entende de usina</h3>
            <p>
              Atuamos desde 2017 em projetos, comissionamento, due diligence e laudos técnicos com
              ART. Mais de 50 MW comissionados: conhecemos os defeitos de instalação antes de eles
              virarem prejuízo.
            </p>
          </article>
          <article className="pillar reveal" data-d="1">
            <span className="pillar__bar"></span>
            <span className="pillar__no">02 — Construção</span>
            <h3>Sabemos o que cobrar do EPC</h3>
            <p>
              Construímos 20 MW em usinas solares. Quem já construiu sabe o que inspecionar, o que
              cobrar do EPC e o que realmente importa na manutenção.
            </p>
          </article>
          <article className="pillar reveal" data-d="2">
            <span className="pillar__bar"></span>
            <span className="pillar__no">03 — Tecnologia própria</span>
            <h3>O software é nosso, e evolui</h3>
            <p>
              Desenvolvemos o meuWatt e o meuPlano, nossas plataformas de supervisão e gestão de
              ativos. Não dependemos de portal de fabricante nem de planilha. A tecnologia é nossa, e
              evolui com a operação.
            </p>
          </article>
        </div>
        <p className="pillars-note reveal">
          A Splendor O&M nasce da experiência da{" "}
          <b style={{ color: "var(--ink-2)" }}>Splendor Energia</b> (construção) e da{" "}
          <b style={{ color: "var(--ink-2)" }}>MarchEng Engenharia</b> (projetos e comissionamento).
        </p>
      </div>
    </section>
  );
}
