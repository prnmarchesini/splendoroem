import { CheckIcon } from "../ui/icons";

/** PDFs de exemplo gerados dentro do meuWatt. */
const RELATORIOS = [
  {
    href: "/assets/relatorios/geracao-executivo.pdf",
    title: "Geração — Executivo",
    text: "Resumo para o dono do ativo: quanto gerou, quanto era esperado, o que custou.",
  },
  {
    href: "/assets/relatorios/geracao-tecnico.pdf",
    title: "Geração — Técnico",
    text: "Detalhamento por inversor, string e irradiância, com desvios apontados.",
  },
  {
    href: "/assets/relatorios/paradas.pdf",
    title: "Paradas",
    text: "Toda interrupção registrada, classificada e quantificada em energia perdida.",
  },
  {
    href: "/assets/relatorios/manutencao.pdf",
    title: "Manutenção",
    text: "O que foi executado no período, por equipamento, com evidências.",
  },
];

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </svg>
  );
}

export default function Tecnologia() {
  return (
    <section className="section tech" id="tecnologia">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow eyebrow--on-navy">Plataformas próprias · 01</span>
          <h2 className="h-section">meuWatt — supervisório da usina inteira</h2>
          <p className="lead" style={{ marginTop: "18px", maxWidth: "62ch" }}>
            Software desenvolvido pela Splendor, usado todo dia pela nossa própria operação. O que
            não serve em campo não entra no produto.
          </p>
        </div>

        <div className="product" id="meuwatt">
          <div className="product__text reveal">
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
                  <b>Relés de proteção, medição da concessionária e estação solarimétrica</b> lidos
                  em tempo real.
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
                  <b>Análise de strings, paradas e desvio da média</b>, com histórico completo.
                </span>
              </li>
              <li>
                <CheckIcon className="fdot" />
                <span>
                  <span className="roadmap">Em desenvolvimento</span>{" "}
                  <b>Análise automatizada dos parâmetros da usina por redes neurais</b>, para apontar
                  desvios antes que virem perda.
                </span>
              </li>
            </ul>
            <div className="callout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
              <span>
                <span className="roadmap">Em desenvolvimento</span> Com o monitoramento de CFTV, o
                meuWatt <b style={{ color: "#fff" }}>audita a empresa de segurança</b> da sua usina.
                Câmera offline deixa de passar despercebida.
              </span>
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
                className="frame__img pzoom"
                data-full="/assets/print-analise.png"
              />
            </div>
            <div className="gallery">
              <figure>
                <div className="frame">
                  <img
                    src="/assets/print-estacao.png"
                    alt="Estação meteorológica no meuWatt"
                    className="frame__img pzoom"
                    data-full="/assets/print-estacao.png"
                  />
                </div>
                <figcaption>Estação meteorológica</figcaption>
              </figure>
              <figure>
                <div className="frame">
                  <img
                    src="/assets/print-rele.png"
                    alt="Relé de proteção no meuWatt"
                    className="frame__img pzoom"
                    data-full="/assets/print-rele.png"
                  />
                </div>
                <figcaption>Relé de proteção</figcaption>
              </figure>
              <figure>
                <div className="frame">
                  <img
                    src="/assets/print-ucs.png"
                    alt="Disponibilidade por UC no meuWatt"
                    className="frame__img pzoom"
                    data-full="/assets/print-ucs.png"
                  />
                </div>
                <figcaption>Disponibilidade por UC</figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div className="subhead reveal">
          <h4 className="ptitle">Relatórios que o dono do ativo entende</h4>
          <p className="psub">Gerados dentro do meuWatt, no fechamento de cada período.</p>
        </div>
        <div className="rgrid reveal" id="relatorios">
          {RELATORIOS.map((r) => (
            <a className="rcard" href={r.href} target="_blank" rel="noopener" key={r.href}>
              <div className="rcard__ico">
                <DocIcon />
              </div>
              <h5>{r.title}</h5>
              <p>{r.text}</p>
              <span className="rcard__cta">Abrir PDF de exemplo →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
