export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src="/assets/logo-light.png" alt="Splendor O&M" className="footer__logo" />
            <p className="footer__desc">
              Operação e manutenção de usinas solares com tecnologia própria. Uma empresa do
              ecossistema Splendor Energia e MarchEng Engenharia.
            </p>
          </div>
          <div>
            <h5>Plataformas</h5>
            <div className="footer__links">
              <a href="#tecnologia">meuWatt</a>
              <a href="#tecnologia">meuPlano</a>
              <a href="#controle">Controle remoto</a>
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
          <span>Splendor O&M Ltda. · CNPJ 00.000.000/0001-00 · Cidade/SP</span>
          <span>Política de privacidade</span>
        </div>
      </div>
    </footer>
  );
}
