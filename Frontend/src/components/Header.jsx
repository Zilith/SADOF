import '../styles/Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <button>Logo</button>
      </div>
      <nav className="nav-menu">
        <div className="nav-item">
          <i className="icon-clock"></i>
          <span>Reclamaciones</span>
        </div>
        <div className="nav-item">
          <i className="icon-settings"></i>
          <span>Configuración</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
