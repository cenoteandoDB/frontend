import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Auth/AuthProvider";
import logo from "../../../public/assets/logo.png";
import "./Header.css"
function Header() {
  const {user, isAuthenticated , logout } = useAuthContext()
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleUserToggleDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogout = () => {
    logout();
  };
  const showUser = showUserDropdown ? "show" : "";

  return (
    <>
      <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
        <div className="container">
          <a href="https://cenoteando.web.app/home" className="navbar-brand">
            <img src={logo} alt="Cenoteando Logo" className="brand-image" />
            {/*<span className="brand-text font-weight-light">AdminLTE 3</span>*/}
          </a>
          <button
            className="navbar-toggler order-1"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse order-3" id="navbarCollapse">
            {/* SEARCH  */}
            <form className="form-inline ml-0 ml-md-3">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Buscar"
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </form>
            {/* LISTA DE ENLANCES  */}
            <ul className="navbar-nav">
               {/*research  */}
              <li className="nav-item ml-5">
                <Link className="nav-link btn-cnt-button-rad-8" to="/">
                  Comunidad
                </Link>
              </li>
               {/*turismo  */}
              <li className="nav-item ml-2">
                <Link className="nav-link btn-cnt-button-rad-8" to="/">
                  Science
                </Link>
              </li>
               {/*data  */}
              <li className="nav-item ml-2">
                <Link className="nav-link btn-cnt-button-rad-8-green " to="/">
                  Data
                </Link>
              </li>
            </ul>
          </div>
          <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="control-sidebar"
                data-slide="true"
                href="#"
                role="button"
              >
                <img src="/assets/Icons/facebook.svg" alt="" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="control-sidebar"
                data-slide="true"
                href="#"
                role="button"
              >
                <img src="/assets/Icons/instagram.svg" alt="" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="control-sidebar"
                data-slide="true"
                href="#"
                role="button"
              >
                <img src="/assets/Icons/linkedin.svg" alt="" />
              </a>
            </li>
             {/*USER DROPDOWN  */}
           {isAuthenticated && <li className={"nav-item dropdown " + showUser}>
              <a 
               className="nav-link"
               data-toggle="dropdown"
               aria-expanded="true"
               onClick={handleUserToggleDropdown}>
                <div className="media avatar-dropdown">
                    <img
                      src="/assets/Icons/avatar.svg"
                      alt="User Avatar"
                      className="img-size-25 img-circle mr-3"
                    />
                    <div className="media-body pt-1">
                      <h3 className="dropdown-item-title font-weight-bold">
                        {user?.name}
                        <img
                          src={ showUserDropdown ? "/assets/Icons/arrow-down.svg" : "/assets/Icons/arrow-up.svg"}
                          alt="User Avatar"
                          className="img-size-25 img-circle mr-3"
                        />
                      </h3>
                    </div>
                </div>
              </a>
              <div className={"dropdown-menu dropdown-menu-lg dropdown-menu-center " + showUser} style={{'zIndex': '1000' }}>
                <a  className="dropdown-item" onClick={() => handleLogout()}>
                  <div className="media">
                    {/*<img
                      src="../../dist/img/user1-128x128.jpg"
                      alt="User Avatar"
                      className="img-size-50 mr-3 img-circle"
                    />*/}
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Cerrar sesión
                      </h3>
                     
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider" />
                
              </div>
            </li>}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
