import { CheckIcon, XIcon } from "../ui/icons";

type Cell =
  | { kind: "yes" }
  | { kind: "no" }
  | { kind: "text"; label: string }
  | { kind: "v"; label: string; link?: { href: string; label: string } };

type Row = {
  feat: string;
  /** Selo "em desenvolvimento" ao lado do item. */
  roadmap?: boolean;
  common: Cell;
  spl: Cell;
};

const ROWS: Row[] = [
  { feat: "Limpeza e roçada", common: { kind: "yes" }, spl: { kind: "yes" } },
  { feat: "Atendimento a chamados", common: { kind: "yes" }, spl: { kind: "yes" } },
  {
    feat: "Supervisório próprio multi-fabricante",
    common: { kind: "no" },
    spl: { kind: "v", label: "meuWatt" },
  },
  {
    feat: "Gestão de ativo com histórico completo",
    common: { kind: "text", label: "Planilha, quando tem" },
    spl: { kind: "v", label: "meuPlano" },
  },
  {
    feat: "Monitoramento do status do CFTV",
    roadmap: true,
    common: { kind: "no" },
    spl: { kind: "yes" },
  },
  { feat: "Acesso remoto seguro via VPN", common: { kind: "no" }, spl: { kind: "yes" } },
  {
    feat: "Parametrização remota de inversores e relés",
    common: { kind: "no" },
    spl: { kind: "yes" },
  },
  {
    feat: "Relatório mensal profissional",
    common: { kind: "text", label: "PDF genérico" },
    spl: {
      kind: "v",
      label: "Relatório de engenharia",
      link: { href: "#relatorios", label: "ver exemplos em PDF →" },
    },
  },
  {
    feat: "Responsável técnico com ART",
    common: { kind: "text", label: "Raramente" },
    spl: { kind: "v", label: "Sempre" },
  },
  { feat: "Plano de manutenção estruturado", common: { kind: "no" }, spl: { kind: "yes" } },
];

function renderCell(cell: Cell) {
  switch (cell.kind) {
    case "yes":
      return (
        <>
          <CheckIcon className="ic ic--yes" /> Sim
        </>
      );
    case "no":
      return (
        <>
          <XIcon className="ic ic--no" /> Não
        </>
      );
    case "text":
      return cell.label;
    case "v":
      return (
        <>
          <span className="v">{cell.label}</span>
          {cell.link && (
            <a className="minilink" href={cell.link.href}>
              {cell.link.label}
            </a>
          )}
        </>
      );
  }
}

export default function Comparacao() {
  return (
    <section className="section compare">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow eyebrow--on-navy">Anti-objeção de preço</span>
          <h2 className="h-section">O&M não é tudo igual</h2>
          <p className="lead">Antes de comparar preço, compare o que está incluso.</p>
        </div>
        <div className="ctable reveal" data-d="1">
          <div className="ctable__head">
            <div>O que você recebe</div>
            <div>O&amp;M comum</div>
            <div className="col-spl">Splendor O&amp;M</div>
          </div>
          {ROWS.map((row) => (
            <div className="crow" key={row.feat}>
              <div className="feat">
                {row.feat}{" "}
                {row.roadmap && <span className="roadmap roadmap--ink">em desenvolvimento</span>}
              </div>
              <div className="common">{renderCell(row.common)}</div>
              <div className="spl">{renderCell(row.spl)}</div>
            </div>
          ))}
        </div>
        <p className="compare__foot reveal">
          O barato de quem só apaga incêndio custa caro em <em>geração perdida</em>.
        </p>
      </div>
    </section>
  );
}
