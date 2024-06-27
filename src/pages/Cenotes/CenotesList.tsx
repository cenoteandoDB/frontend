import React, { useState } from "react";
import { DashboardData } from "../Dashboard/DashboardData";
import { InviteUser } from "../../Components/Modals/InviteUser";
import { useCenotes } from "../../graphql/Cenotes/CenotesCustomHooks";
import { CenoteInterface } from "../../Types/CenotesTypes";

export const List_cenotes = () => {
  const initialPagination: PaginationInterface = { limit: 50, offset: 0 };
  const initialSort: SortInterface = { sortOrder: "ASC", field: "name" };
  //const initialName: string | null = null;

  const { cenotesData, cenotesError, cenotesLoading, refetchCenotes, updatePagination, updateSort, searchCenoteByName, currentSortOrder, totalItems} = useCenotes(initialPagination, initialSort);

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
                      {cenotesData && cenotesData.map((item: CenoteInterface) => (
                          <tr key={item.firestore_id}>
                            <td>
                              <a>
                                <img src="/src/assets/Icons/heart.svg" alt="" />
                              </a>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.state}</td>
                            <td>{item.municipality}</td>
                            <td>{item.type ? item.type : 'SIN TIPO'}</td>
                            <td>{item.createdAt}</td>
                            <td>{item.updatedAt}</td>
                            <td>
                              {item.touristic && (
                                <span className="tag tag-blue-round">
                                {" "}
                                <img
                                  src="/src/assets/Icons/beach.svg"
                                  alt=""
                                />{" "}
                                Turismo
                              </span>
                              )}
                          
                            </td>
                            <td>{item.variable_count}</td>
                            <td>
                            
                              <a>
                                <img src="/src/assets/Icons/eye.svg" alt="" />
                              </a>
                              <a>
                                <img src="/src/assets/Icons/trash.svg" alt="" />
                              </a>
                            </td>
                          </tr>
                          )
                      )}
                       
                     
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
