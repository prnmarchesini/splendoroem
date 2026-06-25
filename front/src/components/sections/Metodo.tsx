const STEPS = [
  {
    no: "01",
    title: "Diagnóstico técnico",
    text: "Visita de inspeção com checklist visual completo. Cortesia, sem compromisso.",
  },
  {
    no: "02",
    title: "Plano de operação",
    text: "Com o diagnóstico em mãos, montamos o plano de manutenção da usina no meuPlano: o que fazer, quando e por quê.",
  },
  {
    no: "03",
    title: "Conexão ao meuWatt",
    text: "Integramos inversores, rede e câmeras ao nosso supervisório, com acesso remoto seguro via VPN.",
  },
  {
    no: "04",
    title: "Operação contínua",
    text: "Monitoramento durante todo o período de geração, alertas automáticos 24h, manutenções executadas conforme o plano.",
  },
  {
    no: "05",
    title: "Relatório mensal",
    text: "Relatório profissional de desempenho: geração, disponibilidade, ocorrências, ações executadas e pendências. Você sabe exatamente o que aconteceu na sua usina.",
  },
];

export default function Metodo() {
  return (
    <section className="section method" id="metodo">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">O método</span>
          <h2 className="h-section">Como assumimos a sua usina</h2>
          <p className="lead">
            Cinco passos do primeiro contato à operação contínua — sem zona cinzenta.
          </p>
        </div>
        <div className="method__steps">
          {STEPS.map((s) => (
            <div className="step reveal" key={s.no}>
              <div className="step__no">
                PASSO<b>{s.no}</b>
              </div>
              <div className="step__body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="method__note reveal">
          <b>Precisa de mais profundidade?</b> Realizamos ensaios elétricos completos (curva I-V,
          resistência de isolamento, termografia) por valor simbólico na contratação do diagnóstico.
        </p>
      </div>
    </section>
  );
}
