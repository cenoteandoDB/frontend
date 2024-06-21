import React, { useState } from "react";
import { DashboardData } from "../../Dashboard/DashboardData";
import { Gallery } from "../../../Components/Gallery/Gallery";
import "./CenoteProfile.css";

export const CenoteProfile = () => {
  const [tabController, setTabController] = useState(
    "custom-tabs-first-home-tab"
  );
  const handleTabController = (tabName: string) => {
    setTabController(tabName);
  };
  return (
    <div>
      <DashboardData>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12 col-md-8">
                <p className="lbl-bread-subtitle mb-1">
                  {" "}
                  <img src="/src/assets/Icons/map.svg" alt="" />
                  Telchaquillo, Yucatán
                </p>
                <h1 className="lbl-bread-title mt-0">Che’e’en Chaak</h1>
                <p className="lbl-bread-subtitle">
                  “Cenote de aguas cristalinas”
                </p>
                <label className="tag-green-round mr-2">
                  <img src="/src/assets/Icons/check.svg" alt="" />
                  90% de índice de capacidad de carga
                </label>
                <label className="tag-green-round mr-2">
                  <img src="/src/assets/Icons/check.svg" alt="" />
                  85% de índice de cumplimiento de buenas prácticas
                </label>
                <label className="tag-green-round mr-2">
                  <img src="/src/assets/Icons/check.svg" alt="" />
                  62% de índice de accesibilidad al cenote
                </label>{" "}
                <label className="tag-green-round mr-2">
                  <img src="/src/assets/Icons/check.svg" alt="" />
                  100% de índice de presencia en redes sociales
                </label>
                <label className="tag-green-round mr-2">
                  <img src="/src/assets/Icons/check.svg" alt="" />
                  88% de índice de descripción de biodiversidad
                </label>
                <label className="tag-green-round mr-2">
                  <img src="/src/assets/Icons/check.svg" alt="" />
                  67% de índice de satisfacción de experiencia con base en
                  comentarios de visitantes
                </label>
              </div>
              <div className="col-sm-12 col-md-4">
                <div className="row">
                  <div className="col-md-4">
                    <button
                      type="submit"
                      className="btn btn-bg-blue-round  btn-block mt-5 float-right"
                    >
                      <img
                        src="/src/assets/Icons/beach.svg"
                        alt=""
                        className="mr-2 "
                      />
                      Turismo
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn  btn-white  mt-5 float-right"
                    >
                      <img src="/src/assets/Icons/edit.svg" alt="" />
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="submit"
                      className="btn btn-white  mt-5 float-right"
                    >
                      <img
                        src="/src/assets/Icons/heart.svg"
                        alt=""
                        className="mr-2 "
                      />
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="submit"
                      className="btn btn-white  mt-5 float-right"
                    >
                      <img
                        src="/src/assets/Icons/upload.svg"
                        alt=""
                        className="mr-2 "
                      />
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="submit"
                      className="btn btn-white  mt-5 float-right"
                    >
                      <img
                        src="/src/assets/Icons/trash.svg"
                        alt=""
                        className="mr-2 "
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <Gallery></Gallery>
          <div className="row mt-5">
            <div className="col-12">
              <div className="card card-primary card-outline card-outline-tabs">
                <div className="card-header p-0 border-bottom-0">
                  <ul
                    className="nav nav-tabs"
                    id="custom-tabs-four-tab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className={
                          tabController === "custom-tabs-first-home-tab"
                            ? "nav-link active"
                            : "nav-link "
                        }
                        id="custom-tabs-first-home-tab"
                        data-toggle="pill"
                        role="tab"
                        aria-controls="custom-tabs-four-home"
                        aria-selected="false"
                        onClick={() =>
                          handleTabController("custom-tabs-first-home-tab")
                        }
                      >
                        <img
                          className="image-center"
                          src="/src/assets/Icons/overall-info.svg"
                          alt=""
                        />
                        <br></br>
                        Información General
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          tabController === "custom-tabs-two-home-tab"
                            ? "nav-link active"
                            : "nav-link "
                        }
                        id="custom-tabs-two-home-tab"
                        data-toggle="pill"
                        role="tab"
                        aria-controls="custom-tabs-two-home-tab"
                        aria-selected="false"
                        onClick={() =>
                          handleTabController("custom-tabs-two-home-tab")
                        }
                      >
                        <img
                          className="image-center"
                          src="/src/assets/Icons/leaf.svg"
                          alt=""
                        />
                        <br></br>
                        Biodiversidad
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          tabController === "custom-tabs-three-messages-tab"
                            ? "nav-link active"
                            : "nav-link "
                        }
                        id="custom-tabs-three-messages-tab"
                        data-toggle="pill"
                        role="tab"
                        aria-controls="custom-tabs-three-messages-tab"
                        aria-selected="false"
                        onClick={() =>
                          handleTabController("custom-tabs-three-messages-tab")
                        }
                      >
                        <img
                          className="image-center"
                          src="/src/assets/Icons/water.svg"
                          alt=""
                        />
                        <br></br>
                        Agua
                      </a>
                    </li>
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-widget="navbar-search"
                          data-target="#navbar-search5"
                          href="#"
                          role="button"
                        >
                          <img
                            className="image-center"
                            src="/src/assets/Icons/arrow-right.svg"
                            alt=""
                          />
                        </a>
                        <div
                          className="navbar-search-block"
                          id="navbar-search5"
                        >
                          <form className="form-inline">
                            <div className="input-group input-group-sm">
                              <input
                                className="form-control form-control-navbar"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-navbar"
                                  type="submit"
                                >
                                  <i className="fas fa-search" />
                                </button>
                                <button
                                  className="btn btn-navbar"
                                  type="button"
                                  data-widget="navbar-search"
                                >
                                  <i className="fas fa-times" />
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </li>
                    </ul>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content" id="custom-tabs-four-tabContent">
                    <div
                      className={
                        tabController === "custom-tabs-first-home-tab"
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id="custom-tabs-first-home-tab"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-first-home-tab"
                    >
                      {/*Informacion General*/}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-6">
                              <h5 className="title-color title-weight">
                                Acerca de
                              </h5>
                            </div>
                            <div className="col-md-6">
                              {" "}
                              <p className="title-color float-right">Editar</p>
                            </div>
                            <div className="col-md-12">
                              <p className="text-justify">
                                Esta joya natural se encuentra en la Comisaría
                                de Telchaquillo, en el Municipio de
                                Tecoh aproximadamente una hora del centro de la
                                Ciudad de Mérida. Es de tipo semiabierto y se
                                caracteriza por su entrada de ensueño de
                                unas escaleras de piedra hacía sus aguas
                                cristalinas y refrescantes que invitan a
                                sumergirse en ellas. Sus profundidades son un
                                espectáculo en sí mismas, ya que a pesar de que
                                en algunas zonas apenas llega a los 30 cm,
                                también hay otras zonas de mayor profundidad.
                              </p>
                            </div>
                            <div className="col-md-12">
                              <div className=" column-1">
                                <p className="left">Horario </p>
                                <p className="right">
                                  Lunes a Jueves: 8:00 AM - 07:00 PM Viernes:
                                  7:00 AM - 09:30 PM Sábado: 6:30 AM - 10:30 PM
                                  Sábado: 6:30 AM - 02:00 PM
                                </p>
                              </div>
                              <div className=" column-2">
                                <p className="left">Precio</p>
                                <p className="right">
                                  $150 MXN por persona
                                  <ul>
                                    <li>Pago en efectivo y tarjeta</li>
                                    <li>Pago en efectivo y tarjeta</li>
                                    <li>Pago en efectivo y tarjeta</li>
                                  </ul>
                                </p>
                              </div>
                              <div className=" column-3">
                                <p className="left">Tipo de cenote</p>
                                <p className="right">
                                  Cenote Uso diverso Apto para aventura
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-5">
                            <div className="col-md-6">
                              <h5 className="title-color title-weight">
                                Información General
                              </h5>
                            </div>
                            <div className="col-md-6">
                              {" "}
                              <p className="title-color float-right">Editar</p>
                            </div>
                            <div className="col-md-12">
                              <div className="container-blue">
                                <ul className="left">
                                  <li>Estacionamiento</li>
                                  <li>Entrada de autobuses</li>
                                  <li>Regaderas</li>
                                </ul>
                                <ul className="right">
                                  <li>Sanitarios</li>
                                  <li>Comedor</li>
                                  <li>Basurero</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="row ">
                            <div className="col-md-6">
                              <h5 className="title-color title-weight">
                                Indicadores
                              </h5>
                            </div>
                            <div className="col-md-6">
                              {" "}
                              <p className="title-color float-right">Editar</p>
                            </div>
                            <div className="col-md-12">
                              <div className="container-blue">
                                <ul className="left">
                                  <li>Estacionamiento</li>
                                  <li>Entrada de autobuses</li>
                                  <li>Regaderas</li>
                                </ul>
                                <ul className="right">
                                  <li>Sanitarios</li>
                                  <li>Comedor</li>
                                  <li>Basurero</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <h5 className="title-color title-weight">
                                Accesibilidad
                              </h5>
                            </div>
                            <div className="col-md-6">
                              {" "}
                              <p className="title-color float-right">Editar</p>
                            </div>
                            <div className="col-md-12">
                              <div className="container-blue">
                                <ul className="left">
                                  <li>Tipo de entrada del cenote</li>
                                  <li>Escalones</li>
                                  <li>Material de los escalones</li>
                                </ul>
                                <ul className="right">
                                  <li>Rampa para sillas de ruedas</li>
                                  <li>Rampa para sillas de ruedas</li>
                                  <li>Madera</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mapa">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239199.86744682692!2d-89.86432684135937!3d20.485804534793676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f564163f47834fb%3A0x6c285237ee16e849!2sCenote%20Kankirixche!5e0!3m2!1ses-419!2smx!4v1716921028516!5m2!1ses-419!2smx"
                              width={600}
                              height={450}
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              className="mapa"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </div>
                        </div>
                      </div>
                      {/*END: Informacion General*/}
                    </div>
                    <div
                      className={
                        tabController == "custom-tabs-two-home-tab"
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id="custom-tabs-two-home-tab"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-two-home-tab"
                    >
                      Biodiversidad Module In progress
                    </div>
                    <div
                      className={
                        tabController == "custom-tabs-three-messages-tab"
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id="custom-tabs-three-messages-tab"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-three-messages-tab"
                    >
                      Agua Module In Progress
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </DashboardData>
    </div>
  );
};
