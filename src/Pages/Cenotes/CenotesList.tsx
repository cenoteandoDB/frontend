import React, { useCallback, useEffect, useRef, useState } from "react";
import { DashboardData } from "../Dashboard/DashboardData";
import { useAddFavoriteCenote, useCenotes, useDeleteCenote, useRemoveFavoriteCenote } from "../../graphql/Cenotes/CenotesCustomHooks";
import { CenoteInterface } from "../../Types/CenotesTypes";
import { PaginationInterface, SortInterface } from "../../Types/UserTypes";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { ConfirmAction } from "../../Components/Modals/ConfirmAction";
import { CreateCenote } from "../../Components/Modals/CreateCenote";
import { UpdateCenote } from "../../Components/Modals/UpdateCenote";
import { useAuthContext } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useGetUserById } from "../../graphql/Users/UsersCustomHooks";


export const List_cenotes = () => {
  const initialPagination: PaginationInterface = { limit: 50, offset: 0 };
  const initialSort: SortInterface = { sortOrder: "ASC", field: "name" };
  const navigate = useNavigate();
  const testCenoteId = "00YaFC8pXUrx7ib4wx8Z";
  const isFirstRender = useRef(true);

  const { user } = useAuthContext()
  const [searchName, setSearchName] = useState<string>("");
  const { cenotesData, cenotesError, cenotesLoading, refetchCenotes, updatePagination, updateSort, searchCenoteByName, currentSortOrder, totalItems} = useCenotes(initialPagination, initialSort);
  const { handleDeleteCenote, deleteCenoteLoading, deleteCenoteError, deleteCenoteData } = useDeleteCenote();
  const { addCenote, favCenoteData, favCenoteLoading, favCenoteError } = useAddFavoriteCenote();
  const { removeCenote, delFavCenoteData, delFavCenoteLoading, delFavCenoteError } = useRemoveFavoriteCenote();
  const { userData, errorData, refetchUserById} = useGetUserById(user?.id);
  const [favoriteCenote, setFavoriteCenote] = useState({userId: '', cenoteId: ''});
  const loading =  cenotesLoading || favCenoteLoading || deleteCenoteLoading || delFavCenoteLoading;
  const noData = !cenotesLoading && (!cenotesData || cenotesData.length === 0);
  const [showCreateCenoteModal, setShowCreateCenoteModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdatModal] = useState<boolean>(false);
  const [ItemIdSelected, setItemIdSelected] = useState<string | null>(null)
  const [Sort, setSort] = useState<SortInterface>(initialSort);
  const [isFavoriteAdded, setIsFavoriteAdded] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalPages = Math.ceil(totalItems / initialPagination.limit);
  const pageRange = 7; 
  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);

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
      if (isFirstRender.current) {
        console.log("I'm here to render")
        setCurrentPage(0);
        updatePagination({ ...initialPagination, offset: 0 });
        searchCenoteByName(name);
      }}, 1000),
    []
  );

  const handleCreateCenoteToggleModal = () => {
    setShowCreateCenoteModal(!showCreateCenoteModal);
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

  const handleDelete = (id: string) => {
    handleDeleteCenote(id);
  };

  const handleUpdateCenote = (UserId?:  string) =>{
    if(UserId){
      setItemIdSelected(UserId)
      setShowUpdatModal(true);
    }
  };

  const handleUpdateCenoteToggleModal = () => {
    setShowUpdatModal(!showUpdateModal);
    if(!showUpdateModal){
      setItemIdSelected(null);
    }
  };

  const handleAddFavoriteCenote = (cenoteId: string | undefined) => {
    if( user?.id && cenoteId){
      setFavoriteCenote({ ...favoriteCenote, cenoteId, userId: user.id });
      addCenote({ cenoteId: cenoteId, userId: user.id });
      setIsFavoriteAdded(true);
    }
  };

  const handleIsFavoriteCenote = (cenoteId: string | undefined | null) => {
    if(userData.favouriteCenotesIds && cenoteId){
      if(userData.favouriteCenotesIds?.includes(cenoteId)){
        return true;
      }
    }
    return false;
  };

  const handleRemoveFavoriteCenote = (cenoteId: string | undefined) => {
    if( user?.id && cenoteId){
      setFavoriteCenote({ ...favoriteCenote, cenoteId, userId: user.id });
      removeCenote({ cenoteId: cenoteId, userId: user.id });
      setIsFavoriteAdded(true);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push('...');
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages - 1) pages.push('...');
    if (endPage < totalPages) pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  //USE EFECTS
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  useEffect(() => {
    handleSearch(searchName);
  }, [searchName, handleSearch, searchCenoteByName]);

  useEffect(() => {
    if (deleteCenoteData) {
      toast.success("Registro eliminado exitosamente");
      refetchCenotes();
    }
  }, [deleteCenoteData, refetchCenotes]);

  useEffect(() => {
    if (cenotesError || deleteCenoteError) {
        toast.error(`"Esta operación no se ha podido completar"`);
    }
  }, [cenotesError, deleteCenoteError]);

useEffect(() => {
    if (favCenoteError) {
      const errorMessage = favCenoteError.graphQLErrors?.[0]?.message || 'La operación no se pudo completar, inténtelo nuevamente.';
      toast.error(errorMessage);
    }

    if (favCenoteData && !favCenoteError && isFavoriteAdded && user) {
      toast.success("Cenote agregado a sus favoritos", {
        toastId: 'favoritos',
      });
  
      refetchUserById();       // Wait for getUser to complete
    }

  }, [favCenoteData, favCenoteError, refetchUserById, isFavoriteAdded]);

  useEffect(() => {
    if (delFavCenoteError) {
      const errorMessage = delFavCenoteError.graphQLErrors?.[0]?.message || 'La operación no se pudo completar, inténtelo nuevamente.';
      toast.error(errorMessage);
    }

    if (delFavCenoteData && !delFavCenoteError && isFavoriteAdded) {
      toast.success("OK", {
        toastId: 'favoritos',
      });
      refetchUserById();       // Wait for getUser to complete
    }

  }, [delFavCenoteData, delFavCenoteError, refetchUserById, isFavoriteAdded]);
  
  useEffect(() => {
    if(userData && !errorData){
      refetchCenotes();
      setIsFavoriteAdded(false);
    }
  }, [userData, errorData]);


  return (
    <>
      <DashboardData>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6 col-md-6">
                <h1>Lista de cenotes</h1>
                <ToastContainer />
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <form onSubmit={() => handleSearch}>
                      <div className="input-group input-group-sm">
                        <div className="input-group-append">
                          <span
                            className=" btn-white btn-sm form-control-c"
                          >
                            <img src="/assets/Icons/search.svg" alt="" />
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
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-block btn-white  btn-sm"
                      onClick={handleCreateCenoteToggleModal}>
                      <img src="/assets/Icons/plus.svg" alt="" />
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
                  {loading ?  ( 
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                      <ClipLoader loading={loading} size={50} />
                    </div>
                  ) : noData ? (
                    <p>No se encontraron Cenotes</p>
                  ) : (
                    <table className="table table-hover text-nowrap">
                      <thead className="bg-header-footer">
                        <tr>
                        
                          <th></th>
                          <th>
                            <a onClick={() => handleSortChange("name")}>Nombre de cenote{" "}
                              {Sort.field == 'name'? 
                              (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("state")}> Estado{" "}
                            {Sort.field == 'state'? 
                            (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                           
                            <a onClick={() => handleSortChange("municipality")}> Municipio{" "}
                            {Sort.field == 'municipality'? 
                            (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th> 
                            <a onClick={() => handleSortChange("type")}> Tipo{" "}
                            {Sort.field == 'type'? 
                            (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                            
                            <a onClick={() => handleSortChange("createdAt")}> Creado{" "}
                            {Sort.field == 'createdAt'? 
                            (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                            Actualizado{""}
                            <a onClick={() => handleSortChange("description")}>Descripción{" "}
                              {Sort.field == 'description'? 
                              (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("updatedAt")}> Etiquetas{" "}
                              {Sort.field == 'updatedAt'? 
                              (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("variable_count")}> Variable{""}
                            {Sort.field == 'variable_count'? 
                            (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {cenotesData && cenotesData.map((item: CenoteInterface) => (
                          <tr key={item.firestore_id}>
                            <td>
                              {handleIsFavoriteCenote(item?.firestore_id) ?
                              ( <a className="cursor-pointer" onClick={() => handleRemoveFavoriteCenote(item.firestore_id)}>
                              <img src="/assets/Icons/heart-red.svg" alt="" />
                            </a>)
                              : (
                                <a className="cursor-pointer" onClick={() => handleAddFavoriteCenote(item.firestore_id)}>
                                <img src="/assets/Icons/heart.svg" alt="" />
                              </a>
                              )}
                            
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
                                  src="/assets/Icons/beach.svg"
                                  alt=""
                                />{" "}
                                Turismo
                              </span>
                              )}
                          
                            </td>
                            <td>0</td>
                            <td>
                            
                              <a className="cursor-pointer" onClick={() => {navigate(`/cenote/${testCenoteId}`);} }>
                                <img src="/assets/Icons/eye.svg" alt="" />
                              </a>
                              <a className="cursor-pointer" onClick={() => handleUpdateCenote(item.firestore_id)}>
                                <img src="/assets/Icons/edit.svg" alt="" />
                              </a>
                              <a className="cursor-pointer" onClick={() => handleOpenDeleteModal(item.firestore_id)}>
                                <img src="/assets/Icons/trash.svg" alt="" />
                              </a>
                            </td>
                          </tr>
                          )
                      )}
                       
                     
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
                        <button
                          className="page-link"
                          disabled={currentPage === 1}
                          onClick={handlePreviousPage}
                        >
                          «
                        </button>
                      </li>
                      {pageNumbers.map((page, index) => (
                        <li className="page-item" key={index}>
                          {page === '...' ? (
                            <span className="page-link">...</span>
                          ) : (
                            <a
                              className={currentPage === page ? "page-link text-white bg-primary" : "page-link"}
                              onClick={() => handlePage(Number(page))}
                            >
                              {page}
                            </a>
                          )}
                        </li>
                      ))}
                      <li className="page-item">
                        <button
                          className="page-link"
                          disabled={currentPage === totalPages}
                          onClick={handleNextPage}
                        >
                          »
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CreateCenote
            showModal={showCreateCenoteModal}
            handleToggleModal={handleCreateCenoteToggleModal}
            refetch={refetchCenotes}
          ></CreateCenote>
          <ConfirmAction
            show={showDeleteModal}
            title="Eliminar"
            message="¿Estás seguro de que quieres realizar esta acción?"
            onConfirm={handleActionDeleteConfirm}
            onCancel={handleActionDeleteCancel}
          ></ConfirmAction>
          <UpdateCenote
            id={ItemIdSelected}
            showModal={showUpdateModal}
            handleToggleModal={handleUpdateCenoteToggleModal}
            refetch={refetchCenotes}
          ></UpdateCenote>
        </section>
      </DashboardData>
    </>
  );
};
