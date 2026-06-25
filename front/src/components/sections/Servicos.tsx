export default function Servicos() {
  return (
    <section className="section section--tight" id="servicos">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">O que fazemos</span>
          <h2 className="h-section">Operação e manutenção, do alerta à ordem de serviço</h2>
        </div>
        <div className="services">
          <article className="svc reveal">
            <div className="svc__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path d="M3 12h3l2-6 4 12 2-6h7" />
              </svg>
            </div>
            <h3>Operação e Monitoramento</h3>
            <p>
              Acompanhamento da usina da primeira à última hora de sol, todos os dias, com alertas
              automáticos 24h. Quando o sistema acusa, nossa central já está investigando.
            </p>
            <span className="svc__tag">Alertas 24h</span>
          </article>
          <article className="svc reveal" data-d="1">
            <div className="svc__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.1-2.1 2.7-2.5z" />
              </svg>
            </div>
            <h3>Manutenção Preventiva</h3>
            <p>
              Plano de manutenção estruturado no meuPlano: inspeções, limpeza, reaperto, termografia
              e ensaios elétricos com periodicidade definida e rastreabilidade total.
            </p>
            <span className="svc__tag">Plano no meuPlano</span>
          </article>
          <article className="svc reveal" data-d="2">
            <div className="svc__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>
            <h3>Manutenção Corretiva</h3>
            <p>
              Diagnóstico remoto antes do deslocamento. Na maioria dos casos, sabemos o que está
              errado antes de o técnico sair da base, e chegamos com a peça certa.
            </p>
            <span className="svc__tag">Diagnóstico remoto</span>
          </article>
        </div>
      </div>
    </section>
  );
}
