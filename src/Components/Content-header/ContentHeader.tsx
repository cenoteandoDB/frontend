import { useState } from "react";
import { Link } from "react-router-dom";
export const ContentHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const show = showDropdown ? "show" : "";

  return (
    <>
      <nav className="main-header navbar navbar-expand-md navbar-light navbar-white" style={{'zIndex': '1' }}>
        <div className="container">
          <div className="collapse navbar-collapse order-3" id="navbarCollapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link  btn-cnt-button-rad-8-round" to="/home">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  btn-cnt-button-rad-8-round" to="/">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  btn-cnt-button-rad-8-round" to="/cenotes">
                  Lista de Cenotes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  btn-cnt-button-rad-8-round" to="/">
                  Mapa de Cenotes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  btn-cnt-button-rad-8-round" to="/users">
                  Usuarios
                </Link>
              </li>

              <li className={"nav-item dropdown " + show}>
                <a
                  className="nav-link  btn-cnt-button-rad-8-round"
                  data-toggle="dropdown"
                  aria-expanded="true"
                  onClick={handleToggleDropdown}
                >
                  Descriptores
                </a>
                <div
                  className={
                    "dropdown-menu dropdown-menu-md dropdown-menu-center " +
                    show
                  }
                  style={{ left: 0, right: "inherit" }}
                >
                  <Link to="/variables" className="dropdown-item">
                    <p className="text-md text-muted mb-0">Variables</p>
                  </Link>
                  <div className="dropdown-divider" />
                  <Link to="/referencias" className="dropdown-item">
                    <p className="text-md text-muted mb-0">Referencias</p>
                  </Link>
                  <div className="dropdown-divider" />
                  <Link to="/especies" className="dropdown-item">
                    <p className="text-md text-muted mb-0">Especies</p>
                  </Link>
                  <div className="dropdown-divider" />
                  <Link to="/geograficos" className="dropdown-item">
                    <p className="text-md text-muted mb-0">Capas Geográficas</p>
                  </Link>
                  <div className="dropdown-divider" />
                  <Link to="/" className="dropdown-item">
                    <p className="text-md text-muted mb-0">Archivos</p>
                  </Link>
                </div>
              </li>

              <li className="nav-item">
                <Link className="nav-link  btn-cnt-button-rad-8-round" to="/">
                  OAI-PMH
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
