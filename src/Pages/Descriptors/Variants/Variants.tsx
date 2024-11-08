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
import { UpdateVariable } from "../../../Components/Modals/UpdateVariable";

export const Variants = () => {
  const initialPagination: PaginationInterface = { limit: 50, offset: 0 };
  const initialSort: SortInterface = { sortOrder: "ASC", field: "name" };

  const { variableData,  variableError,  variableLoading, refetchVariables, updatePagination, updateSort, searchVariableByName, currentSortOrder, totalItems} = useVariables(initialPagination, initialSort);
  const { handleDeleteVariable, deleteVariableLoading, deleteVariableError, deleteVariableData } = useDeleteVariable();
  const loading =  variableLoading || deleteVariableLoading;
  const noData = !variableLoading && (!variableData || variableData.length === 0);
  const [showCreateVariableModal, setShowCreateVariableModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdatModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchName, setSearchName] = useState<string>("");
  const [ItemIdSelected, setItemIdSelected] = useState<string | null>(null)
  const [Sort, setSort] = useState<SortInterface>(initialSort);

  const handleSortChange = ( field: string) => {
    const newSortOrder = currentSortOrder === "ASC" ? "DESC" : "ASC";
    setSort({ field: field, sortOrder: newSortOrder})
    updateSort({ field: field, sortOrder: newSortOrder});
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    updatePagination({ ...initialPagination, offset: nextPage * initialPagination.limit });
  };

  const handlePreviousPage = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    updatePagination({ ...initialPagination, offset: (prevPage - 1) * initialPagination.limit });
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);
    updatePagination({ ...initialPagination, offset: (page - 1) * initialPagination.limit });
  };

  const handleSearch = useCallback(
    _.debounce((name: string) => {
      setCurrentPage(0);
      updatePagination({ ...initialPagination, offset: 0 });
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

  const handleUpdateVariable = (UserId?:  string) =>{
  
    if(UserId){
      setItemIdSelected(UserId)
      setShowUpdatModal(true);
    }
  };

  const handleUpdateVariableToggleModal = () => {
    setShowUpdatModal(!showUpdateModal);
    if(!showUpdateModal){
      setItemIdSelected(null);
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

  const handleDisplayDescription = (id: string) => {
    setItemIdSelected(prevId => (prevId === id ? null : id));
  };

   //USE EFECTS
   useEffect(() => {
      handleSearch(searchName);
  }, [searchName, handleSearch, searchVariableByName]);

  useEffect(() => {
    if (deleteVariableData) {
      toast.success("Registro eliminado exitosamente");
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
                <h1>Variables</h1>
                <ToastContainer />
              </div>
              <div className="col-sm-6 col-md-7">
                <div className="row">
                  <div className="col-md-6">
                    <form onSubmit={() => handleSearch}>
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
                            <a onClick={() => handleSortChange("sphere")}>Esfera{" "}
                            {Sort.field == 'sphere'? 
                            (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("theme")}>Tema{" "}
                            {Sort.field == 'theme'? 
                            (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                          <a onClick={() => handleSortChange("category")}>Categoria{" "}
                            {Sort.field == 'category'? 
                            (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("name")}>Nombre{" "}
                              {Sort.field == 'name'? 
                            (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("description")}>Descripción{" "}
                            {Sort.field == 'description'? 
                            (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("accessLevel")}>Nivel de acceso{" "}
                              {Sort.field == 'accessLevel'? 
                              (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("type")}>Tipo de dato{" "}
                              {Sort.field == 'type'? 
                              (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                         
                   
                          <th>
                            <a onClick={() => handleSortChange("units")}>Unidades{" "}
                            {Sort.field == 'units'? 
                            (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("origin")}>Campo o Calculadas{" "}
                            {Sort.field == 'origin'? 
                            (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("origin")}>Temporalidad{" "}
                            {Sort.field == 'origin'? 
                            (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {variableData && variableData.map((item: VariableInterface) => (
                        <tr  key={item.name}>
                           <td>{item.sphere}</td>
                           <td>
                            <span className="tag tag-blue-round">
                              {item.theme}
                            </span>
                          </td>
                          <td>
                            <span className="tag tag-blue-round">
                            {item.category} 
                            </span>
                          </td>
                          <td>{item.name} {item.firestore_id}</td>
                          <td>
                            {item.description.length > 70 && ItemIdSelected === item.firestore_id
                              ? item.description
                              : item.description.substring(0, 70)}

                            {item.description.length > 70 && (
                              <a className="cursor-pointer" onClick={() => handleDisplayDescription(item.firestore_id)}>
                                <img 
                                  src={ItemIdSelected === item.firestore_id 
                                        ? "/src/assets/Icons/slash-eye.svg" 
                                        : "/src/assets/Icons/eye.svg"} 
                                  alt="" 
                                />
                              </a>
                            )}
                          </td>
                          <td>{item.accessLevel}</td>
                          <td>
                            <span className="tag tag-gray-round">{item.type}</span>
                          </td>
                         
                          <td>  {item.units}</td>
                          <td>  {item.origin}</td>
                          <td>  {item?.timeseries ? 'Temporales' : 'Fija'}</td>
                          <td>
                            {" "}
                            {/*<a className="d-none">
                              <img src="/src/assets/Icons/eye.svg" alt="" />
                            </a>*/}
                            <a onClick={() => handleUpdateVariable(item.firestore_id)}>
                              <img src="/src/assets/Icons/edit.svg" alt="" />
                            </a>
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
                  
                      <a className="mr-3">
                        Total: {totalItems}
                      </a>
                   
                      <li className="page-item">
                        <button className="page-link" disabled={currentPage == 1} onClick={handlePreviousPage}>
                          «
                        </button>
                      </li>
                      {Array.from({ length: Math.ceil(totalItems / initialPagination.limit) }, (_, index) => (
                        <li className="page-item" key={index}>
                          <a
                            className={currentPage === index + 1 ? "page-link text-white bg-primary" : "page-link"}
                            onClick={() => handlePage(index + 1)}
                          >
                             {index + 1}
                  
                          </a>
                        </li>
                      ))}
                      <li className="page-item" >
                        <button className="page-link" disabled={currentPage  == Math.ceil(totalItems / initialPagination.limit)} onClick={handleNextPage}>
                          »
                        </button>
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
            refetch={refetchVariables}
          ></CreateVariable>
          <ConfirmAction
            show={showDeleteModal}
            title="Eliminar"
            message="¿Estás seguro de que quieres realizar esta acción?"
            onConfirm={handleActionDeleteConfirm}
            onCancel={handleActionDeleteCancel}
          ></ConfirmAction>
          <UpdateVariable
            id={ItemIdSelected}
            showModal={showUpdateModal}
            handleToggleModal={handleUpdateVariableToggleModal}
            refetch={refetchVariables}
          ></UpdateVariable>
        </section>
      </DashboardData>
    </>
  );
};
