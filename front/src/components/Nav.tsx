export default function Nav() {
  return (
    <header className="nav" id="nav">
      <a href="#top" aria-label="Splendor O&M — início">
        <img src="/assets/logo-dark.png" alt="Splendor O&M" className="nav__logo nav__logo--dark" />
        <img src="/assets/logo-light.png" alt="Splendor O&M" className="nav__logo nav__logo--light" />
      </a>
      <nav className="nav__links" id="navLinks">
        <a className="nav__link" href="#servicos">Serviços</a>
        <a className="nav__link" href="#metodo">Método</a>
        <a className="nav__link" href="#tecnologia">Tecnologia</a>
        <a className="nav__link" href="#controle">Controle Remoto</a>
        <a className="nav__link" href="#quem-somos">Quem Somos</a>
        <a className="btn btn--primary btn--sm" href="#diagnostico">Agendar diagnóstico</a>
      </nav>
      <div className="nav__cta">
        <a className="btn btn--primary btn--sm" href="#diagnostico">Agendar diagnóstico</a>
        <button className="nav__burger" id="burger" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
