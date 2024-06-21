import React, { useState } from "react";
import { DashboardData } from "../Dashboard/DashboardData";
import { InviteUser } from "../../Components/Modals/InviteUser";

export const List_cenotes = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <DashboardData>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6 col-md-6">
                <h1>Lista de cenotes</h1>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="row">
                  <div className="col-md-5">
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
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-block btn-white  btn-sm"
                    >
                      <img src="/src/assets/Icons/plus.svg" alt="" />
                      Nuevo cenote
                    </button>
                  </div>
                  <div className="col-md-1">
                    <a className="btn btn-block btn-white  btn-sm">
                      <img src="/src/assets/Icons/edit.svg" alt="" />
                    </a>
                  </div>
                  <div className="col-md-1">
                    <a className="btn btn-block btn-white  btn-sm">
                      <img src="/src/assets/Icons/heart.svg" alt="" />
                    </a>
                  </div>
                  <div className="col-md-1">
                    <a className="btn btn-block btn-white  btn-sm">
                      <img src="/src/assets/Icons/upload.svg" alt="" />
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
                          <th>
                            <div>
                              <input
                                type="checkbox"
                                id="myCheckbox"
                                name="myCheckbox"
                              />
                            </div>
                          </th>
                          <th></th>
                          <th>
                            ID{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Nombre de cenote{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Estado{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Municipio{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Tipo{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Creado{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Actualizado{""}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Etiquetas{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Variable{""}
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
                          <th>
                            <input type="checkbox" />
                          </th>
                          <td>
                            {" "}
                            <a>
                              <img src="/src/assets/Icons/heart.svg" alt="" />
                            </a>
                          </td>
                          <td>1234567 </td>
                          <td>Chen kin</td>
                          <td>Yucatán</td>
                          <td>Tizimin</td>
                          <td>Sin Tipo</td>
                          <td>11-7-2014</td>
                          <td>2-7-2014</td>
                          <td>
                            <span className="tag tag-blue-round">
                              {" "}
                              <img
                                src="/src/assets/Icons/beach.svg"
                                alt=""
                              />{" "}
                              Turismo
                            </span>
                          </td>
                          <td>8</td>
                          <td>
                            {" "}
                            <a>
                              <img src="/src/assets/Icons/eye.svg" alt="" />
                            </a>
                            <a>
                              <img src="/src/assets/Icons/trash.svg" alt="" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <input type="checkbox" />
                          </th>
                          <td>
                            {" "}
                            <a>
                              <img src="/src/assets/Icons/heart.svg" alt="" />
                            </a>
                          </td>
                          <td>1234567 </td>
                          <td>Chen kin</td>
                          <td>Yucatán</td>
                          <td>Tizimin</td>
                          <td>Sin Tipo</td>
                          <td>11-7-2014</td>
                          <td>2-7-2014</td>
                          <td>
                            <span className="tag tag-blue-round">
                              {" "}
                              <img
                                src="/src/assets/Icons/beach.svg"
                                alt=""
                              />{" "}
                              Turismo
                            </span>
                          </td>
                          <td>8</td>
                          <td>
                            {" "}
                            <a>
                              <img src="/src/assets/Icons/eye.svg" alt="" />
                            </a>
                            <a>
                              <img src="/src/assets/Icons/trash.svg" alt="" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <input type="checkbox" />
                          </th>
                          <td>
                            {" "}
                            <a>
                              <img src="/src/assets/Icons/heart.svg" alt="" />
                            </a>
                          </td>
                          <td>1234567 </td>
                          <td>Chen kin</td>
                          <td>Yucatán</td>
                          <td>Tizimin</td>
                          <td>Sin Tipo</td>
                          <td>11-7-2014</td>
                          <td>2-7-2014</td>
                          <td>
                            <span className="tag tag-blue-round">
                              {" "}
                              <img
                                src="/src/assets/Icons/beach.svg"
                                alt=""
                              />{" "}
                              Turismo
                            </span>
                          </td>
                          <td>8</td>
                          <td>
                            {" "}
                            <a>
                              <img src="/src/assets/Icons/eye.svg" alt="" />
                            </a>
                            <a>
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
                            <a>
                              <img src="/src/assets/Icons/heart.svg" alt="" />
                            </a>
                          </td>
                          <td>1234567 </td>
                          <td>Chen kin</td>
                          <td>Yucatán</td>
                          <td>Tizimin</td>
                          <td>Sin Tipo</td>
                          <td>11-7-2014</td>
                          <td>2-7-2014</td>
                          <td>
                            <span className="tag tag-blue-round">
                              {" "}
                              <img
                                src="/src/assets/Icons/beach.svg"
                                alt=""
                              />{" "}
                              Turismo
                            </span>
                          </td>
                          <td>8</td>
                          <td>
                            {" "}
                            <a>
                              <img src="/src/assets/Icons/eye.svg" alt="" />
                            </a>
                            <a>
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
                            <a>
                              <img src="/src/assets/Icons/heart.svg" alt="" />
                            </a>
                          </td>
                          <td>1234567 </td>
                          <td>Chen kin</td>
                          <td>Yucatán</td>
                          <td>Tizimin</td>
                          <td>Sin Tipo</td>
                          <td>11-7-2014</td>
                          <td>2-7-2014</td>
                          <td>
                            <span className="tag tag-blue-round">
                              {" "}
                              <img
                                src="/src/assets/Icons/beach.svg"
                                alt=""
                              />{" "}
                              Turismo
                            </span>
                          </td>
                          <td>8</td>
                          <td>
                            {" "}
                            <a>
                              <img src="/src/assets/Icons/eye.svg" alt="" />
                            </a>
                            <a>
                              <img src="/src/assets/Icons/trash.svg" alt="" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <input type="checkbox" />
                          </th>
                          <td>
                            {" "}
                            <a>
                              <img src="/src/assets/Icons/heart.svg" alt="" />
                            </a>
                          </td>
                          <td>1234567 </td>
                          <td>Chen kin</td>
                          <td>Yucatán</td>
                          <td>Tizimin</td>
                          <td>Sin Tipo</td>
                          <td>11-7-2014</td>
                          <td>2-7-2014</td>
                          <td>
                            <span className="tag tag-blue-round">
                              {" "}
                              <img
                                src="/src/assets/Icons/beach.svg"
                                alt=""
                              />{" "}
                              Turismo
                            </span>
                          </td>
                          <td>8</td>
                          <td>
                            {" "}
                            <a>
                              <img src="/src/assets/Icons/eye.svg" alt="" />
                            </a>
                            <a>
                              <img src="/src/assets/Icons/trash.svg" alt="" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <input type="checkbox" />
                          </th>
                          <td>
                            {" "}
                            <a>
                              <img src="/src/assets/Icons/heart.svg" alt="" />
                            </a>
                          </td>
                          <td>1234567 </td>
                          <td>Chen kin</td>
                          <td>Yucatán</td>
                          <td>Tizimin</td>
                          <td>Sin Tipo</td>
                          <td>11-7-2014</td>
                          <td>2-7-2014</td>
                          <td>
                            <span className="tag tag-blue-round">
                              {" "}
                              <img
                                src="/src/assets/Icons/beach.svg"
                                alt=""
                              />{" "}
                              Turismo
                            </span>
                          </td>
                          <td>8</td>
                          <td>
                            {" "}
                            <a>
                              <img src="/src/assets/Icons/eye.svg" alt="" />
                            </a>
                            <a>
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
          <InviteUser
            showModal={showModal}
            handleToggleModal={handleToggleModal}
          ></InviteUser>
        </section>
      </DashboardData>
    </>
  );
};
