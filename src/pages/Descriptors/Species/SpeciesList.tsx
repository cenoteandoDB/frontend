import React from "react";
import { DashboardData } from "../../Dashboard/DashboardData";

export const SpeciesList = () => {
  return (
    <>
      <DashboardData>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6 col-md-5">
                <h1>Especies</h1>
              </div>
              <div className="col-sm-6 col-md-7">
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group input-group-sm">
                      <div className="input-group-append">
                        <button
                          type="submit"
                          className="btn btn-white btn-sm form-control-c"
                        >
                          <img src="/src/assets/Icons/search.svg" alt="" />
                        </button>
                      </div>
                      <input
                        type="text"
                        name="table_search"
                        className="form-control form-control-c float-left btn-white btn-sm"
                        placeholder="Buscar"
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn btn-block btn-white  btn-sm"
                    >
                      <img src="/src/assets/Icons/filter.svg" alt="" />
                      Filtrar
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn btn-block btn-white btn-sm"
                    >
                      <img src="/src/assets/Icons/plus.svg" alt="" />
                      Crear
                    </button>
                  </div>
                  <div className="col-md-1">
                    <a>
                      <img src="/src/assets/Icons/edit.svg" alt="" />
                    </a>
                  </div>
                  <div className="col-md-1">
                    <a>
                      <img src="/src/assets/Icons/trash.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead className="bg-header-footer">
                        <tr>
                          <th></th>
                          <th>
                            ID Interno{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Nombre científico{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Nombre de especie{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Enlaces{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>

                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>
                            {" "}
                            <span className="tag tag-gray-round">
                              ID Interno
                            </span>
                          </td>
                          <td>Nombre científico</td>
                          <td>Nombre de especie</td>

                          <td>
                            <span className="tag tag-blue-round">iNatural</span>
                            <span className="tag tag-blue-round">GBIF</span>
                          </td>
                          <td>
                            {" "}
                            <a className="mr-2">
                              <img src="/src/assets/Icons/edit.svg" alt="" />
                            </a>
                            <a className="mr-2">
                              <img src="/src/assets/Icons/trash.svg" alt="" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>
                            {" "}
                            <span className="tag tag-gray-round">
                              ID Interno
                            </span>
                          </td>
                          <td>Nombre científico</td>
                          <td>Nombre de especie</td>

                          <td>
                            <span className="tag tag-blue-round">iNatural</span>
                            <span className="tag tag-blue-round">GBIF</span>
                          </td>
                          <td>
                            {" "}
                            <a className="mr-2">
                              <img src="/src/assets/Icons/edit.svg" alt="" />
                            </a>
                            <a className="mr-2">
                              <img src="/src/assets/Icons/trash.svg" alt="" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>
                            {" "}
                            <span className="tag tag-gray-round">
                              ID Interno
                            </span>
                          </td>
                          <td>Nombre científico</td>
                          <td>Nombre de especie</td>

                          <td>
                            <span className="tag tag-blue-round">iNatural</span>
                            <span className="tag tag-blue-round">GBIF</span>
                          </td>
                          <td>
                            {" "}
                            <a className="mr-2">
                              <img src="/src/assets/Icons/edit.svg" alt="" />
                            </a>
                            <a className="mr-2">
                              <img src="/src/assets/Icons/trash.svg" alt="" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="card-footer clearfix bg-header-footer">
                    <ul className="pagination pagination-sm m-0 float-right">
                      <li className="page-item">
                        <a className="page-link" href="#">
                          «
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          »
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </DashboardData>
    </>
  );
};
