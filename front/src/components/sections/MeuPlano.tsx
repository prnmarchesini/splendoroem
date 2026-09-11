import { useState, type ReactNode } from "react";
import { CheckIcon } from "../ui/icons";

type Shot = { src: string; cap: string };

type Panel = {
  id: string;
  tab: string;
  title: string;
  sub: string;
  features: ReactNode[];
  /** Legenda do print principal (o primeiro shot usa a sua própria, mais longa). */
  mainCap: string;
  shots: Shot[];
};

const img = (name: string) => `/assets/plano/${name}`;

const PANELS: Panel[] = [
  {
    id: "pd",
    tab: "Drone",
    title: "Drone: ortomosaico RGB e térmico automatizados",
    sub: "Análise termográfica aérea da usina inteira, com processamento automatizado e laudo após análise humana.",
    features: [
      <>
        <b>Geração automatizada de ortomosaico</b> RGB e térmico.
      </>,
      <>
        <b>Medições de perfil de terreno</b>, áreas e distâncias.
      </>,
      <>
        <b>Modelo 3D</b> da planta.
      </>,
      <>
        <b>Análise de sombreamento.</b>
      </>,
      <>
        <b>Análise térmica</b> com comparação fácil entre foto térmica e RGB.
      </>,
      <>
        <b>Rede neural treinada</b> para geração automática das mesas e numeração dos módulos.
      </>,
      <>
        <b>Relatório gerado após análise humana</b> — nada sai da ferramenta sem revisão de
        engenharia.
      </>,
      <>
        Comparação de ortomosaicos e imagens históricas para <b>acompanhar a evolução térmica</b> da
        usina.
      </>,
      <>
        <span className="roadmap">Em desenvolvimento</span> Rede para detecção e classificação
        automática de anomalias.
      </>,
    ],
    mainCap: "Ortomosaico RGB da usina",
    shots: [
      { src: img("drone-ortomosaico.jpg"), cap: "Ortomosaico" },
      { src: img("drone-rgb-termico.jpg"), cap: "Slide RGB ↔ térmico" },
      { src: img("drone-termo1.jpg"), cap: "Análise termográfica" },
      { src: img("drone-termo2.jpg"), cap: "Ponto quente identificado" },
      { src: img("drone-mesas.jpg"), cap: "Mesas e módulos por rede neural" },
      { src: img("drone-sombreamento.jpg"), cap: "Análise de sombreamento" },
      { src: img("drone-3d.jpg"), cap: "Modelo 3D" },
      { src: img("drone-terreno.jpg"), cap: "Perfil de terreno" },
    ],
  },
  {
    id: "pc",
    tab: "Termografia",
    title: "Termografia com histórico versionado",
    sub: "Ferramenta de análise termográfica própria, integrada ao cadastro de ativos.",
    features: [
      <>
        O operador <b>realiza as análises no PC</b> e gera o relatório na própria ferramenta.
      </>,
      <>
        As imagens <b>sobem para o servidor</b> e ficam vinculadas ao equipamento.
      </>,
      <>
        Cada equipamento tem <b>histórico próprio e versionado</b> das imagens termográficas ao
        longo dos anos.
      </>,
    ],
    mainCap: "Ferramenta de análise termográfica (desktop)",
    shots: [
      { src: img("termo-desktop.jpg"), cap: "Ferramenta desktop" },
      { src: img("termo-desktop2.jpg"), cap: "Marcação de pontos quentes" },
      { src: img("termo-analise.jpg"), cap: "Análise" },
      { src: img("termo-registro.jpg"), cap: "Registro termográfico" },
    ],
  },
  {
    id: "pe",
    tab: "Instrumentos",
    title: "Análise de instrumentos feita por quem vive o campo",
    sub: "Ferramenta para interpretação, análise e vínculo das medições dos instrumentos de campo, especializada nas necessidades de uma empresa de O&M.",
    features: [
      <>
        Interpretação e análise das medições direto na ferramenta — <b>análise de isolação</b> entre
        elas.
      </>,
      <>
        <b>Todas as medições são salvas e sincronizadas</b> com o respectivo equipamento no cadastro.
      </>,
      <>
        A Splendor <b>adiciona novos instrumentos ao longo do tempo</b>, tendo iniciado pelos
        equipamentos da <b>Inbrat</b>, sua parceira de equipamentos.
      </>,
    ],
    mainCap: "Análise de isolação",
    shots: [
      { src: img("instr-1.jpg"), cap: "Análise de isolação" },
      { src: img("instr-2.jpg"), cap: "Medições sincronizadas" },
      { src: img("instr-3.jpg"), cap: "Vínculo com o equipamento" },
    ],
  },
  {
    id: "pa",
    tab: "Ativos & cadastro",
    title: "A usina inteira virada em árvore de ativos",
    sub: "Do cubículo da subestação ao módulo na mesa. Cada nó com ficha, documentos e histórico próprio.",
    features: [
      <>
        <b>Árvore completa da usina</b> — subestação, cubículos, skids, trafos, inversores, gateways
        e switches. Uma planta real já cadastrada tem <b>796 nós</b>.
      </>,
      <>
        <b>Ficha de cada equipamento</b> com modelo, número de série, documentos e histórico de
        intervenções.
      </>,
      <>
        <b>Catálogo de tipos e de equipamentos reais</b> usados em usinas, mantido e ampliado pela
        Splendor.
      </>,
      <>
        <b>Diagrama elétrico e de rede gerados automaticamente</b> a partir do cadastro.
      </>,
      <>
        <b>Rastreio das conexões de rede</b> ponta a ponta, para achar a falha de comunicação na
        origem.
      </>,
      <>
        Cadastro de <b>usinas, projetos e contratos</b> no mesmo lugar.
      </>,
    ],
    mainCap: "Árvore de ativos — UFV Porto Ferreira, 796 nós",
    shots: [
      { src: img("arvore.jpg"), cap: "Árvore de ativos" },
      { src: img("ficha.jpg"), cap: "Ficha do equipamento" },
      { src: img("catalogo.jpg"), cap: "Catálogo de equipamentos" },
      { src: img("tipos.jpg"), cap: "Tipos de equipamento" },
      { src: img("diagrama-rede.jpg"), cap: "Diagrama de rede automático" },
      { src: img("rastreio-rede.jpg"), cap: "Rastreio de conexões" },
      { src: img("cadastro-usinas.jpg"), cap: "Cadastro de usinas" },
      { src: img("cadastro-projetos.jpg"), cap: "Cadastro de projetos" },
    ],
  },
  {
    id: "pb",
    tab: "Planejamento & OS",
    title: "Do plano anual à OS assinada em campo",
    sub: "O plano de manutenção vira cronograma, o cronograma vira ordem de serviço e a OS volta com foto, ensaio e assinatura.",
    features: [
      <>
        <b>Planejamento anual</b> de preventivas por usina e por equipamento.
      </>,
      <>
        <b>Cronograma mês a mês</b>, com execução acompanhada em tempo real.
      </>,
      <>
        <b>Acompanhamento de pendências</b> até o fechamento — nada fica solto.
      </>,
      <>
        <b>Funil de garantia</b> para conduzir pleitos junto aos fabricantes.
      </>,
      <>
        <b>Controle de spare parts</b>: o que existe, onde está e o que precisa repor.
      </>,
      <>
        <b>Módulo especialista de ensaios</b>, com checklist específico por tipo de equipamento.
      </>,
      <>
        <b>App completo para o técnico em campo</b>: agenda, ordens da equipe, fotos e registro
        mesmo sem sinal.
      </>,
    ],
    mainCap: "Planejamento anual de manutenção",
    shots: [
      { src: img("planejamento-anual.jpg"), cap: "Planejamento anual" },
      { src: img("cronograma.jpg"), cap: "Cronograma por mês" },
      { src: img("pendencias.jpg"), cap: "Acompanhamento de pendências" },
      { src: img("ensaios.jpg"), cap: "Cadastro de ensaios" },
      { src: img("garantia.jpg"), cap: "Funil de garantia" },
      { src: img("spare-parts.jpg"), cap: "Controle de spare parts" },
      { src: img("app-campo.jpg"), cap: "App do técnico em campo" },
    ],
  },
];

/** Print principal + miniaturas de um painel. Prints em retrato ganham moldura de celular. */
function Pshots({ panel }: { panel: Panel }) {
  const [active, setActive] = useState(0);
  const [portrait, setPortrait] = useState(false);
  const shot = panel.shots[active];
  const cap = active === 0 ? panel.mainCap : shot.cap;

  return (
    <div className="pshots">
      <figure className={`pmain${portrait ? " is-port" : ""}`}>
        <div className="frame">
          <div className="frame__bar">
            <div className="frame__dots">
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className="frame__addr">meuPlano</div>
          </div>
          <img
            src={shot.src}
            alt={cap}
            className="frame__img pzoom"
            data-full={shot.src}
            onLoad={(e) => {
              const el = e.currentTarget;
              setPortrait(el.naturalHeight > el.naturalWidth);
            }}
          />
        </div>
        <figcaption>{cap}</figcaption>
      </figure>
      <div className="pthumbs">
        {panel.shots.map((s, i) => (
          <button
            className={`pthumb${i === active ? " is-on" : ""}`}
            type="button"
            key={s.src}
            onClick={() => setActive(i)}
          >
            <img src={s.src} alt={s.cap} loading="lazy" decoding="async" />
            <span>{s.cap}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MeuPlano() {
  const [tab, setTab] = useState(PANELS[0].id);

  return (
    <section className="section tech tech--plano" id="meuplano">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow eyebrow--on-navy">Plataformas próprias · 02</span>
          <h2 className="h-section">meuPlano — gestão de ativo de ponta a ponta</h2>
          <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }}>
            Cadastro de ativos, plano de manutenção, ordem de serviço, ensaios, termografia e drone.
            Um sistema só, alimentado pela operação real.
          </p>
        </div>

        <div className="ptabs reveal" role="tablist">
          {PANELS.map((p) => (
            <button
              className={`ptab${p.id === tab ? " is-on" : ""}`}
              role="tab"
              type="button"
              aria-selected={p.id === tab}
              aria-controls={p.id}
              key={p.id}
              onClick={() => setTab(p.id)}
            >
              {p.tab}
            </button>
          ))}
        </div>

        <div className="ppanels reveal">
          {PANELS.map((p) => (
            <div
              className={`ppanel${p.id === tab ? " is-on" : ""}`}
              id={p.id}
              role="tabpanel"
              key={p.id}
            >
              <div className="ppanel__text">
                <h4 className="ptitle">{p.title}</h4>
                <p className="psub">{p.sub}</p>
                <ul className="flist">
                  {p.features.map((f, i) => (
                    <li key={i}>
                      <CheckIcon className="fdot" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ppanel__media">{p.id === tab && <Pshots panel={p} />}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
