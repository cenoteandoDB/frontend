import React from "react";

export const HistoryList = () => {
  return (
    <>
      <div className="card card-solid pb-5 pt-2">
        <div className="card-body pb-0">
          <div className="header-section-cnt mb-4">
            <p className="header-section-text-cnt mb-0">Historial</p>
          </div>

          <table className="table table-hover text-nowrap">
            <thead className="bg-header-footer">
              <tr>
                <th>
                  Acción <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Fecha <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Nombre del cenote{" "}
                  <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Categoria{" "}
                  <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Descriptor{" "}
                  <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label className="tag-green-round">
                    <img src="/src/assets/Icons/new-arrow-up.svg" alt="" />
                    Alta
                  </label>
                </td>
                <td>11-7-2014</td>
                <td>San Isidro</td>
                <td>Agua</td>
                <td>Contacto</td>
                <td>
                  <a href="">
                    <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="tag-red-round">
                    <img src="/src/assets/Icons/trash.svg" alt="" />
                    Eliminación
                  </label>
                </td>
                <td>11-7-2014</td>
                <td>San Isidro</td>
                <td>Agua</td>
                <td>Contacto</td>
                <td>
                  <a href="">
                    <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="tag-blue-round">
                    <img src="/src/assets/Icons/edit.svg" alt="" />
                    Modificación
                  </label>
                </td>
                <td>11-7-2014</td>
                <td>San Isidro</td>
                <td>Agua</td>
                <td>Contacto</td>
                <td>
                  <a href="">
                    <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="tag-green-round">
                    <img src="/src/assets/Icons/new-arrow-up.svg" alt="" />
                    Alta
                  </label>
                </td>
                <td>11-7-2014</td>
                <td>San Isidro</td>
                <td>Agua</td>
                <td>Contacto</td>
                <td>
                  <a href="">
                    <img src="/src/assets/Icons/arrow-down.svg" alt="" />
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
