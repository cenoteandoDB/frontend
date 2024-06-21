import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Auth/AuthProvider";
import logo from "../../assets/logo.png";
import "./Header.css"
function Header() {
  const {user, isAuthenticated , logout, getUser } = useAuthContext()
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleUserToggleDropdown = () => {
    console.log(user)
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogout = () => {
    logout();
  };
  const showUser = showUserDropdown ? "show" : "";

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated, user]); 

  return (
    <>
      <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
        <div className="container">
          <a href="../../index3.html" className="navbar-brand">
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
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Turismo
                </Link>
              </li>
               {/*turismo  */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Research
                </Link>
              </li>
               {/*data  */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
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
                <img src="/src/assets/Icons/facebook.svg" alt="" />
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
                <img src="/src/assets/Icons/instagram.svg" alt="" />
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
                <img src="/src/assets/Icons/linkedin.svg" alt="" />
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
                      src="/src/assets/Icons/avatar.svg"
                      alt="User Avatar"
                      className="img-size-25 img-circle mr-3"
                    />
                    <div className="media-body pt-1">
                      <h3 className="dropdown-item-title font-weight-bold">
                        {user?.name}
                        <img
                          src={ showUserDropdown ? "/src/assets/Icons/arrow-down.svg" : "/src/assets/Icons/arrow-up.svg"}
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
