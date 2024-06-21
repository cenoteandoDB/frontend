import React from "react";

export const RequestList = () => {
  return (
    <>
      <div className="card card-solid pb-5 pt-2">
        <div className="card-body pb-0">
          <div className="header-section-cnt mb-4">
            <p className="header-section-text-cnt mb-0">Por revisar</p>
            <small>
              Se sugiere revisar estas acciones y responder en un plazo máximo
              de 3 días a partir de la solicitud.
            </small>
          </div>

          <table className="table table-hover text-nowrap">
            <thead className="bg-header-footer">
              <tr>
                <th>
                  Status <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Fecha <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Acción <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Usuario <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Cenote <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th>
                  Categoria
                  <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label className="tag-red-round">Urgente</label>
                </td>
                <td>11-7-2014</td>
                <td>
                  <label className="tag-green-round">
                    <img src="/src/assets/Icons/new-arrow-up.svg" alt="" />
                    Alta
                  </label>
                </td>

                <td>Jonh Doe</td>
                <td>San Isidro</td>
                <td>
                  <label className="tag-bluesky-round">
                    Información General
                  </label>
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
                <td>
                  <label className="tag-red-round">Urgente</label>
                </td>
                <td>11-7-2014</td>
                <td>
                  <label className="tag-red-round">
                    <img src="/src/assets/Icons/trash.svg" alt="" />
                    Eliminación
                  </label>
                </td>

                <td>Jonh Doe</td>
                <td>San Isidro</td>
                <td>
                  <label className="tag-bluesky-round">
                    Información General
                  </label>
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
                <td>
                  <label className="tag-yellow-round">Pendiente</label>
                </td>
                <td>11-7-2014</td>
                <td>
                  <label className="tag-blue-round">
                    <img src="/src/assets/Icons/edit.svg" alt="" />
                    Modificación
                  </label>
                </td>

                <td>Jonh Doe</td>
                <td>San Isidro</td>
                <td>
                  <label className="tag-bluesky-round">
                    Información General
                  </label>
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
                <td>
                  <label className="tag-yellow-round">Pendiente</label>
                </td>
                <td>11-7-2014</td>
                <td>
                  <label className="tag-green-round">
                    <img src="/src/assets/Icons/new-arrow-up.svg" alt="" />
                    Alta
                  </label>
                </td>

                <td>Jonh Doe</td>
                <td>San Isidro</td>
                <td>
                  <label className="tag-bluesky-round">
                    Información General
                  </label>
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
