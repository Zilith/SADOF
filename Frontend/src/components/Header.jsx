import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleConfig = () => {
    navigate("/config");
  };

  const handleReclamation = () => {
    navigate("/");
  };
  
  return (
    <header className="header">
      <div className="logo">
        <button>Logo</button>
      </div>
      <nav className="nav-menu">
        <div className="nav-item">
          <FontAwesomeIcon icon={faChartSimple} />
          <span onClick={() => handleReclamation()}>Reclamaciones</span>
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={faGear} />
          <span onClick={() => handleConfig()}>Configuración</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
