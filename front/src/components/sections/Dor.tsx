export default function Dor() {
  return (
    <section className="section dor">
      <div className="container">
        <div className="dor__grid">
          <div className="dor__head reveal">
            <span className="eyebrow">O problema</span>
            <h2 className="h-section" style={{ marginTop: "16px" }}>
              Sua usina está longe. Os problemas, não.
            </h2>
            <p className="lead" style={{ marginTop: "18px" }}>
              Usina de geração remota tem um padrão: o integrador entrega, recebe e desaparece. Aí
              começam as perdas silenciosas.
            </p>
            <p className="dor__kicker">
              Cada dia de subdesempenho é dinheiro que não volta. E a maioria dos donos de usina só
              descobre <em>na fatura</em>.
            </p>
          </div>
          <div className="dor__list">
            <div className="dor__item reveal">
              <span className="dor__idx">01</span>
              <p>
                <b>String desconectada</b> que ninguém percebe por semanas.
              </p>
            </div>
            <div className="dor__item reveal" data-d="1">
              <span className="dor__idx">02</span>
              <p>
                <b>Inversor limitando potência</b> sem ninguém investigar o motivo.
              </p>
            </div>
            <div className="dor__item reveal" data-d="2">
              <span className="dor__idx">03</span>
              <p>
                <b>Câmera de segurança offline</b> há dias, e a empresa de CFTV nem avisou.
              </p>
            </div>
            <div className="dor__item reveal" data-d="3">
              <span className="dor__idx">04</span>
              <p>
                <b>Cabo furtado, usina parada</b>, e o prejuízo correndo enquanto o seguro discute.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
