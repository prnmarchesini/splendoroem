export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src="/assets/logo-light.webp" alt="Splendor O&M" className="footer__logo" loading="lazy" />
            <p className="footer__desc">
              Operação e manutenção de usinas solares com tecnologia própria. Uma empresa do
              ecossistema Splendor Energia e MarchEng Engenharia.
            </p>
          </div>
          <div>
            <h5>Plataformas</h5>
            <div className="footer__links">
              <a href="#tecnologia">meuWatt</a>
              <a href="#meuplano">meuPlano</a>
            </div>
          </div>
          <div>
            <h5>Empresa</h5>
            <div className="footer__links">
              <a href="#servicos">Serviços</a>
              <a href="#metodo">Método</a>
              <a href="#quem-somos">Quem somos</a>
              <a href="#diagnostico">Agendar diagnóstico</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>
            Splendor O&M Ltda. · CNPJ 60.096.696/0001-23 · Bertioga/SP ·{" "}
            <a href="https://wa.me/5517997377626" target="_blank" rel="noopener">
              WhatsApp (17) 99737-7626
            </a>
          </span>
          <a href="/privacidade.html">Política de privacidade</a>
        </div>
      </div>
    </footer>
  );
}
