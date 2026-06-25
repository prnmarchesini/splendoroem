import { CheckIcon } from "../ui/icons";

export default function Tecnologia() {
  return (
    <section className="section tech" id="tecnologia">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow eyebrow--on-navy">Nossas plataformas</span>
          <h2 className="h-section">Tecnologia desenvolvida por quem opera usinas</h2>
        </div>

        {/* meuWatt */}
        <div className="product">
          <div className="product__text reveal">
            <div className="brandline">
              <h3>meuWatt</h3>
              <span className="dotcom">SUPERVISÓRIO</span>
            </div>
            <p className="product__sub">Supervisório completo da usina. Não só do inversor.</p>
            <p>O portal do fabricante mostra o inversor. O meuWatt supervisiona a usina inteira:</p>
            <ul className="flist">
              <li>
                <CheckIcon className="fdot" />
                <span>
                  <b>Inversores de qualquer fabricante</b> em uma única tela.
                </span>
              </li>
              <li>
                <CheckIcon className="fdot" />
                <span>
                  Status da <b>rede de comunicação</b> e dos equipamentos.
                </span>
              </li>
              <li>
                <CheckIcon className="fdot" />
                <span>
                  Status das <b>câmeras de segurança</b>: se o CFTV cair, você fica sabendo antes do
                  ladrão.
                </span>
              </li>
              <li>
                <CheckIcon className="fdot" />
                <span>
                  <b>Alarmes inteligentes</b> com escalonamento.
                </span>
              </li>
              <li>
                <CheckIcon className="fdot" />
                <span>
                  <b>Histórico</b> e análise de desempenho.
                </span>
              </li>
            </ul>
            <div className="callout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
              <span>
                Com o monitoramento de CFTV, o meuWatt{" "}
                <b style={{ color: "#fff" }}>audita a empresa de segurança</b> da sua usina. Câmera
                offline deixa de passar despercebida.
              </span>
            </div>
            <div className="product__cta">
              <a className="tlink" href="#diagnostico">
                Ver o meuWatt em detalhe <span className="arr">→</span>
              </a>
            </div>
          </div>
          <div className="product__media reveal" data-d="1">
            <div className="frame">
              <div className="frame__bar">
                <div className="frame__dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
                <div className="frame__addr">meuWatt · Análise Gráfica</div>
              </div>
              <img
                src="/assets/print-analise.png"
                alt="Dashboard do meuWatt — potência por inversor"
                className="frame__img"
              />
            </div>
            <div className="gallery">
              <figure>
                <div className="frame">
                  <img
                    src="/assets/print-estacao.png"
                    alt="Estação meteorológica no meuWatt"
                    className="frame__img"
                  />
                </div>
                <figcaption>Estação meteorológica</figcaption>
              </figure>
              <figure>
                <div className="frame">
                  <img
                    src="/assets/print-rele.png"
                    alt="Relé de proteção no meuWatt"
                    className="frame__img"
                  />
                </div>
                <figcaption>Relé de proteção</figcaption>
              </figure>
              <figure>
                <div className="frame">
                  <img
                    src="/assets/print-ucs.png"
                    alt="Disponibilidade por UC no meuWatt"
                    className="frame__img"
                  />
                </div>
                <figcaption>Disponibilidade por UC</figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div className="tech__divider"></div>

        {/* meuPlano */}
        <div className="product product--rev">
          <div className="product__text reveal">
            <div className="brandline">
              <h3>meuPlano</h3>
              <span className="dotcom">GESTÃO DE ATIVO</span>
            </div>
            <p className="product__sub">
              Gestão de ativo de verdade, do plano à ordem de serviço.
            </p>
            <ul className="flist">
              <li>
                <CheckIcon className="fdot" />
                <span>
                  <b>Plano de manutenção</b> com periodicidade e checklist.
                </span>
              </li>
              <li>
                <CheckIcon className="fdot" />
                <span>
                  <b>Ordens de serviço</b> com fotos, registros e assinatura em campo.
                </span>
              </li>
              <li>
                <CheckIcon className="fdot" />
                <span>
                  <b>Histórico completo</b> de tudo que já foi feito na usina.
                </span>
              </li>
              <li>
                <CheckIcon className="fdot" />
                <span>
                  <b>Registro de ocorrências</b> com linha do tempo.
                </span>
              </li>
            </ul>
            <div className="product__cta">
              <a className="tlink" href="#diagnostico">
                Ver o meuPlano em detalhe <span className="arr">→</span>
              </a>
            </div>
          </div>
          <div
            className="product__media reveal"
            data-d="1"
            style={{ display: "flex", justifyContent: "center", gap: "20px", alignItems: "center" }}
          >
            <div className="phone">
              <div className="phone__screen ph ph--navy" style={{ borderRadius: "26px" }}>
                <div className="phone__notch"></div>
                <span className="ph__tag" style={{ maxWidth: "80%" }}>
                  [ PRINT ]<br />
                  OS do meuPlano no celular<br />— técnico em campo
                </span>
              </div>
            </div>
            <div className="frame" style={{ flex: 1, maxWidth: "300px" }}>
              <div className="frame__bar">
                <div className="frame__dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
                <div className="frame__addr">meuWatt · Mapa da Planta</div>
              </div>
              <img
                src="/assets/print-mapa.png"
                alt="Mapa da planta no meuWatt"
                className="frame__img"
                style={{ height: "300px", objectFit: "cover", objectPosition: "top center" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
