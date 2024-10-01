import React from "react";
import "./CardHome.css";

interface Props {
  hideEditDetails?: boolean;
}

const CardHome: React.FC<Props> = ({ hideEditDetails = true }) => {
  return (
    <>
      <div className="col-12 col-sm-6 col-md-2 d-flex align-items-stretch flex-column">
        <div className="d-flex flex-fill">
          <div className="pt-0">
            <div className="row">
              <div className="col-12 text-center position-relative">
                <img
                  src="../../dist/img/cenote.png"
                  alt="user-avatar"
                  className="img-fluid"
                />
                <a className="position-absolute position-icon">
                  <img src="/src/assets/Icons/heart.svg" alt="" />
                </a>
              </div>
              <div className="col-12">
                <h3 className="lead font-weight-bold mb-0">
                  <strong>Nombre del Cenote</strong>
                </h3>
                <p className="text-muted text-sm">Tipo de cenote</p>
                <ul className="ml-4 mb-0 fa-ul text-muted d-flex flex-wrap">
                  <li className="small d-flex align-items-center mr-5 mb-2 tag-icon-cnt">
                    <span className="fa-li">
                      <img src="/src/assets/Icons/map.svg" />
                    </span>
                    Lugar
                  </li>
                  <li className="small d-flex align-items-center mr-5 mb-2 tag-icon-cnt">
                    <span className="fa-li">
                      <img src="/src/assets/Icons/beach.svg" />
                    </span>
                    Turismo
                  </li>
                  {/* Add more list items here */}
                </ul>

                {hideEditDetails && (
                  <ul className="ml-4 mb-0 fa-ul text-muted">
                    <li className="small">
                      <span className="fa-li">
                        <img src="/src/assets/Icons/eye.svg" alt="" />
                      </span>
                      Visto: DD-MM-YY
                    </li>
                    <li className="small">
                      <span className="fa-li">
                        <img src="/src/assets/Icons/edit.svg" alt="" />
                      </span>
                      Editado: DD-MM-YY
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHome;
