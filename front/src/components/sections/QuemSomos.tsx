const TIMELINE = [
  { year: "2017", txt: "Início da MarchEng Engenharia." },
  { year: "2019–2024", txt: "+200 MW projetados, +50 MW comissionados." },
  { year: "Splendor", txt: "20 MW construídos pela Splendor Energia." },
  { year: "2025", txt: "Nasce a Splendor O&M." },
];

export default function QuemSomos() {
  return (
    <section className="section about" id="quem-somos">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Quem somos</span>
          <h2 className="h-section">Quem opera a sua usina</h2>
        </div>
        <div className="about__grid">
          <article className="who reveal">
            <div className="who__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path d="M12 3 4 7l8 4 8-4-8-4zM4 7v6l8 4 8-4V7M8 14v4l4 2 4-2v-4" />
              </svg>
            </div>
            <h3>Equipe de Engenharia</h3>
            <p>
              Engenheiros com registro no CREA, experiência em projeto, comissionamento e laudos.
              Quem analisa o desempenho da sua usina entende de usina, não só de software.
            </p>
          </article>
          <article className="who reveal" data-d="1">
            <div className="who__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <rect x="2" y="4" width="20" height="14" rx="2" />
                <path d="M2 9h20M6 21h12" />
              </svg>
            </div>
            <h3>Central de Monitoramento</h3>
            <p>
              Equipe dedicada acompanhando o portfólio da primeira à última hora de geração, com
              procedimentos definidos de resposta a alarme.
            </p>
          </article>
        </div>
        <div className="about__media reveal" data-d="1">
          <div className="ph">
            <span className="ph__corner">FOTO</span>
            <span className="ph__tag">
              [ FOTO ] equipe em campo com EPI / central de monitoramento
            </span>
          </div>
        </div>
        <div className="timeline">
          {TIMELINE.map((t, i) => (
            <div className="tl reveal" data-d={i === 0 ? undefined : String(i)} key={t.year}>
              <div className="tl__year">{t.year}</div>
              <div className="tl__txt">{t.txt}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
