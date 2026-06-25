import { CheckIcon } from "../ui/icons";

export default function CtaFinal() {
  return (
    <section className="section cta" id="diagnostico">
      <div className="container">
        <div className="cta__inner">
          <div className="cta__text reveal">
            <span className="eyebrow">Diagnóstico gratuito</span>
            <h2 className="h-section">Comece com um diagnóstico gratuito</h2>
            <p className="lead">
              Visita técnica de inspeção com checklist visual completo da sua usina. Sem custo, sem
              compromisso. Você recebe a avaliação e decide o que fazer com ela.
            </p>
            <div className="cta__trust">
              <span>
                <CheckIcon /> Checklist visual completo
              </span>
              <span>
                <CheckIcon /> Responsável técnico com ART
              </span>
              <span>
                <CheckIcon /> Sem compromisso
              </span>
            </div>
          </div>
          <div className="reveal" data-d="1">
            {/* Comportamento (validação + POST /api/leads) ligado em useSplendorInteractions */}
            <form className="form" id="diagForm" noValidate>
              <div className="form__fields" id="formFields">
                <div className="form__row">
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" name="nome" type="text" placeholder="Seu nome" required />
                </div>
                <div className="form__row">
                  <label htmlFor="zap">WhatsApp</label>
                  <input id="zap" name="zap" type="tel" placeholder="(00) 00000-0000" required />
                </div>
                <div className="form__row two">
                  <div className="form__row" style={{ margin: 0 }}>
                    <label htmlFor="cidade">Cidade da usina</label>
                    <input
                      id="cidade"
                      name="cidade"
                      type="text"
                      placeholder="Cidade / UF"
                      required
                    />
                  </div>
                  <div className="form__row" style={{ margin: 0 }}>
                    <label htmlFor="pot">Potência (kWp)</label>
                    <input id="pot" name="pot" type="text" placeholder="ex. 1.500" required />
                  </div>
                </div>
                <button className="btn btn--gold" type="submit">
                  Agendar diagnóstico
                </button>
                <p
                  className="form__err"
                  id="formErr"
                  style={{
                    display: "none",
                    color: "var(--red)",
                    fontSize: "13px",
                    marginTop: "10px",
                    textAlign: "center",
                    fontFamily: "var(--font-mono)",
                  }}
                ></p>
                <p className="form__hint">
                  Resposta em até 1 dia útil. Seus dados não são compartilhados.
                </p>
              </div>
              <div className="form__ok" id="formOk">
                <div className="badge">
                  <svg
                    viewBox="0 0 24 24"
                    width="26"
                    height="26"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4>Solicitação recebida</h4>
                <p>Em breve nossa equipe entra em contato pelo WhatsApp para agendar a visita.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
