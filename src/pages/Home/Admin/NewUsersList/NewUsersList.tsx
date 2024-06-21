import React from "react";

export const NewUsersList = () => {
  return (
    <>
      <div className="card card-solid pb-5 pt-2">
        <div className="card-body pb-0">
          <div className="header-section-cnt mb-4">
            <p className="header-section-text-cnt">Nuevos Usuarios</p>
          </div>

          <table className="table table-hover text-nowrap">
            <thead className="bg-header-footer">
              <tr>
                <th>
                  ID <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Usuario <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Registro <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Permisos <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Tipo de permisos{" "}
                  <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Tipo de usuario{" "}
                  <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>183</td>
                <td>John Doe </td>
                <td>11-7-2014</td>
                <td>Admin</td>
                <td>Todos los permisos</td>
                <td>
                  <span className="tag bg-tag-success">Otros</span>
                </td>
                <td>
                  <a href="">
                    <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                  </a>
                </td>
                <td>
                  <a className="btn_approve mr-1">
                    <img src="/src/assets/Icons/check.svg" alt="" />
                  </a>
                  <a className="btn_detach ml-1">
                    <img src="/src/assets/Icons/close.svg" alt="" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>183</td>
                <td>John Doe </td>
                <td>11-7-2014</td>
                <td>Admin</td>
                <td>Todos los permisos</td>
                <td>
                  <span className="tag bg-tag-success">Otros</span>
                </td>
                <td>
                  <a href="">
                    <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                  </a>
                </td>
                <td>
                  <a className="btn_approve mr-1">
                    <img src="/src/assets/Icons/check.svg" alt="" />
                  </a>
                  <a className="btn_detach ml-1">
                    <img src="/src/assets/Icons/close.svg" alt="" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>183</td>
                <td>John Doe </td>
                <td>11-7-2014</td>
                <td>Admin</td>
                <td>Todos los permisos</td>
                <td>
                  <span className="tag bg-tag-success">Otros</span>
                </td>
                <td>
                  <a href="">
                    <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                  </a>
                </td>
                <td>
                  <a className="btn_approve mr-1">
                    <img src="/src/assets/Icons/check.svg" alt="" />
                  </a>
                  <a className="btn_detach ml-1">
                    <img src="/src/assets/Icons/close.svg" alt="" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>183</td>
                <td>John Doe </td>
                <td>11-7-2014</td>
                <td>Admin</td>
                <td>Todos los permisos</td>
                <td>
                  <span className="tag bg-tag-success">Otros</span>
                </td>
                <td>
                  <a href="">
                    <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                  </a>
                </td>
                <td>
                  <a className="btn_approve mr-1">
                    <img src="/src/assets/Icons/check.svg" alt="" />
                  </a>
                  <a className="btn_detach ml-1">
                    <img src="/src/assets/Icons/close.svg" alt="" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
