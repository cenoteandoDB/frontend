import React, { useState, useEffect, useCallback } from "react";
import { DashboardData } from "../../Dashboard/DashboardData";
import { useVariables, useDeleteVariable } from "../../../graphql/Variables/VariablesCustomHooks";
import { PaginationInterface, SortInterface } from "../../../Types/UserTypes";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import { VariableInterface } from "../../../Types/VariablesTypes";
import { ConfirmAction } from "../../../Components/Modals/ConfirmAction";
import { CreateVariable } from "../../../Components/Modals/CreateVariable";

export const Variants = () => {
  const initialPagination: PaginationInterface = { limit: 10, offset: 0 };
  const initialSort: SortInterface = { sortOrder: "ASC", field: "name" };
  const initialName: string | null = null;

  const { variableData,  variableError,  variableLoading, refetchVariables, updatePagination, updateSort, searchVariableByName, currentSortOrder} = useVariables(initialPagination, initialSort);
  const { handleDeleteVariable, deleteVariableLoading, deleteVariableError, deleteVariableData } = useDeleteVariable();
  const loading =  variableLoading || deleteVariableLoading;
  const noData = !variableLoading && (!variableData || variableData.length === 0);
  const [showCreateVariableModal, setShowCreateVariableModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchName, setSearchName] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ItemIdSelected, setItemIdSelected] = useState<string | null>(null)

  const handleSortChange = ( field: string) => {
    const newSortOrder = currentSortOrder === "ASC" ? "DESC" : "ASC";
    updateSort({ field: field, sortOrder: newSortOrder});
  };

  const handleNextPage = () => {
    console.log((initialPagination.offset || 0) + variableData.length < initialPagination.limit ? 0 : 1  )
    setCurrentPage((initialPagination.offset || 0) + initialPagination.limit);
    updatePagination({ offset: (initialPagination.offset || 0) + initialPagination.limit });
    //updatePagination({ offset: (initialPagination.offset || 0) + usersData.length < initialPagination.limit ? 1 : 0   });
  };

  const handlePreviousPage = () => {
    console.log(Math.max((initialPagination.offset || 0) - initialPagination.limit, 0))
    setCurrentPage(Math.max((initialPagination.offset || 0) - initialPagination.limit, 0));
    updatePagination({ offset: Math.max((initialPagination.offset || 0) - initialPagination.limit, 0) });
  };

  const handlePage = (page: string) => {
    if(Number(page) >= Math.max((initialPagination.offset || 0) - initialPagination.limit, 0)){
      updatePagination({ offset:  Math.max((initialPagination.offset || 0) - initialPagination.limit, 0) });
    } else {
      updatePagination({ offset: Number(page) });
    }
  };

  const handleSearch = useCallback(
    _.debounce((name: string) => {
      searchVariableByName(name);
    }, 1000),
    []
  );

  const handleCreateVariableToggleModal = () => {
    setShowCreateVariableModal(!showCreateVariableModal);
  };

  const handleDelete = (id: string) => {
    handleDeleteVariable(id);
  };

  const handleOpenDeleteModal = (UserId?: string) => {
    setShowDeleteModal(true);
    if(UserId){
      setItemIdSelected(UserId);
    }
  };

  const handleActionDeleteConfirm = () => {
    setShowDeleteModal(false);
    setItemIdSelected('');
    if(ItemIdSelected){
      handleDelete(ItemIdSelected)
    }
  };

  const handleActionDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemIdSelected('');
  };

   //USE EFECTS
   useEffect(() => {
      handleSearch(searchName);
  }, [searchName, handleSearch, searchVariableByName]);

  useEffect(() => {
    if (deleteVariableData) {
      toast.success("Usuario eliminado exitosamente");
      refetchVariables();
    }
  }, [deleteVariableData, refetchVariables]);

  useEffect(() => {
    if (variableError || deleteVariableError) {
        toast.error(`"Esta operación no se ha podido completar"`);
    }
  }, [variableError, deleteVariableError]);

  
  return (
    <>
      <DashboardData>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6 col-md-5">
                <h1>Variantes</h1>
                <ToastContainer />
              </div>
              <div className="col-sm-6 col-md-7">
                <div className="row">
                  <div className="col-md-6">
                  <form onSubmit={handleSearch}>
                      <div className="input-group input-group-sm">
                        <div className="input-group-append">
                          <span
                            className=" btn-white btn-sm form-control-c"
                          >
                            <img src="/src/assets/Icons/search.svg" alt="" />
                          </span>
                        </div>
                        <input
                          type="text"
                          name="table_search"
                          className="form-control form-control-c float-left btn-white btn-sm"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                          placeholder="Buscar por nombre"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-md-2 d-none">
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
                      onClick={handleCreateVariableToggleModal}
                    >
                      <img src="/src/assets/Icons/plus.svg" alt="" />
                      Crear
                    </button>
                  </div>
                  <div className="col-md-1 d-none">
                    <a>
                      <img src="/src/assets/Icons/edit.svg" alt="" />
                    </a>
                  </div>
                  <div className="col-md-1 d-none">
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
                  {loading ?  ( 
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                      <ClipLoader loading={loading} size={50} />
                    </div>
                  ) : noData ? (
                    <p>No se encontraron variables</p>
                  ) : (
                    <table className="table table-hover ">
                      <thead className="bg-header-footer">
                        <tr>
                          
                          <th>
                            Categoria{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Nombre{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Descripción{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Nivel de acceso{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Tipo de dato{" "}
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
                            Esferea{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Unidades{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                            Campo o Calculadas
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {variableData && variableData.map((item: VariableInterface) => (
                        <tr  key={item.name}>
                          <td>
                            <span className="tag tag-blue-round">
                            {item.category}
                            </span>
                          </td>
                          <td>{item.name}</td>
                          <td>
                            {item.description}
                          </td>
                          <td>{item.accessLevel}</td>
                          <td>
                            <span className="tag tag-gray-round">{item.type}</span>
                          </td>
                          <td>
                            <span className="tag tag-blue-round">
                              {item.theme}
                            </span>
              
                          </td>
                          <td>{item.sphere}</td>
                          <td>  {item.units}</td>
                          <td>  {item.origin}</td>
                          <td>
                            {" "}
                            <a className="d-none">
                              <img src="/src/assets/Icons/eye.svg" alt="" />
                            </a>
                            {/*<a onClick={() => handleUpdateUser(item.id)}>
                              <img src="/src/assets/Icons/edit.svg" alt="" />
                            </a>*/}
                            <a onClick={() => handleOpenDeleteModal(item.firestore_id)}>
                              <img src="/src/assets/Icons/trash.svg" alt="" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    
                     
                      </tbody>
                    </table>
                  ) }
                  </div>
                  <div className="card-footer clearfix bg-header-footer">
                    <ul className="pagination pagination-sm m-0 float-right">
                      <li className="page-item">
                        <a className="page-link" onClick={() => handlePreviousPage()}>
                          «
                        </a>
                      </li>
                      {/*<li className="page-item">
                        <input type="number" onChange={evt => handlePage(evt.target.value)} />
                      </li>*/}
                      <li className="page-item">
                        <a className="page-link" onClick={() => handleNextPage()}>
                          »
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CreateVariable
            showModal={showCreateVariableModal}
            handleToggleModal={handleCreateVariableToggleModal}
          ></CreateVariable>
          <ConfirmAction
            show={showDeleteModal}
            title="Eliminar"
            message="¿Estás seguro de que quieres realizar esta acción?"
            onConfirm={handleActionDeleteConfirm}
            onCancel={handleActionDeleteCancel}
          ></ConfirmAction>
        </section>
      </DashboardData>
    </>
  );
};
