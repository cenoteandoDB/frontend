import React, { useState, useEffect, useCallback } from "react";
import { DashboardData } from "../Dashboard/DashboardData";
import { InviteUser } from "../../Components/Modals/InviteUser";
import { ConfirmAction } from "../../Components/Modals/ConfirmAction";
import { UpdateUser } from "../../Components/Modals/UpdateUser";
import { useUsers, useDeleteUser } from "../../graphql/Users/UsersCustomHooks";
import { UserInterface, PaginationInterface, SortInterface } from "../../Types/UserTypes";

import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import _, { set } from 'lodash';

export const Users = () => {
  const initialPagination: PaginationInterface = { limit: 50, offset: 0 };
  const initialSort: SortInterface = { sortOrder: "ASC", field: "name" };
  //const initialName: string | null = null;

  const { usersData, usersError, usersLoading, refetchUsers, updatePagination, updateSort, searchUserByName, currentSortOrder, totalItems} = useUsers(initialPagination, initialSort);
  const { handleDeleteUser, deleteUserLoading, deleteUserError, deleteUserData } = useDeleteUser();

  const loading = usersLoading || deleteUserLoading;
  const noData = !usersLoading && (!usersData || usersData.length === 0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdatModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchName, setSearchName] = useState<string>("");
  const [ItemIdSelected, setItemIdSelected] = useState<string | null>(null)
  const [Sort, setSort] = useState<SortInterface>(initialSort);

  //FUNCIONES
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
      searchUserByName(name);
    }, 1000),
    []
  );

  const handleDelete = (userId: string) => {
    handleDeleteUser(userId);
  };

  const handleUpdateUser = (UserId?:  string) =>{
  
    if(UserId){
      setItemIdSelected(UserId)
      setShowUpdatModal(true);
    }
  };

  const handleUpdateUserToggleModal = () => {
    setShowUpdatModal(!showUpdateModal);
    if(!showUpdateModal){
      setItemIdSelected(null);
    }
  };

  const handleInviteUserToggleModal = () => {
    setShowInviteModal(!showInviteModal);
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
  }, [searchName, handleSearch, searchUserByName]);

  useEffect(() => {
    if (deleteUserData) {
      toast.success("Usuario eliminado exitosamente");
      refetchUsers();
    }
  }, [deleteUserData, refetchUsers]);

  useEffect(() => {
    if (usersError || deleteUserError) {
        toast.error(`"Esta operación no se ha podido completar"`);
    }
  }, [usersError, deleteUserError]);

  return (
    <>
      <DashboardData>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6 col-md-5">
                <h1>Usuarios</h1>
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
                  <div className="col-md-2 d-none" >
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
                      onClick={handleInviteUserToggleModal}
                    >
                      <img src="/src/assets/Icons/add-user.svg" alt="" />
                      Invitar
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
                    {/* USERS TABLE */}
                    {loading ?  ( 
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                      <ClipLoader loading={loading} size={50} />
                    </div>
                    ) : noData ? (
                    <p>No se encontraron usuarios</p>
                  ) : (
                    <table className="table table-hover text-nowrap">
                      <thead className="bg-header-footer">
                        <tr>
                          <th>
                          <a onClick={() => handleSortChange("name")}>  Nombre{" "}
                            {Sort.field == 'name'? 
                            (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                          <a onClick={() => handleSortChange("surname")}> Apellidos{" "}
                            {Sort.field == 'surname'? 
                            (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                           </a>
                          </th>
                          <th>
                          <a onClick={() => handleSortChange("email")}>Correo electrónico{" "}
                            {Sort.field == 'email'? 
                            (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("profile")}>Tipo de usuario{" "}
                              {Sort.field == 'profile'? 
                              (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("createdAt")}>Fecha de creación{" "}
                              {Sort.field == 'profile'? 
                               (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                 
                        {usersData && usersData.map((item: UserInterface) => (
                          <tr key={item.id}>
                         
                          <td>{item.name} </td>
                          <td>{item.surname}</td>
                          <td>{item.email}</td>
                          <td>
                            <span className="tag bg-tag-success">{item?.profile ? item?.profile : 'INDEFINIDO'}</span>
                          </td>
                          <td>{item.createdAt}</td>
                          <td>
                            {" "}
                            <a className="d-none">
                              <img src="/src/assets/Icons/eye.svg" alt="" />
                            </a>
                            <a onClick={() => handleUpdateUser(item.id)}>
                              <img src="/src/assets/Icons/edit.svg" alt="" />
                            </a>
                            <a onClick={() => handleOpenDeleteModal(item.id)}>
                              <img src="/src/assets/Icons/trash.svg" alt="" />
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
        {/* MODAL INVITE USER*/}
          <InviteUser
            showModal={showInviteModal}
            handleToggleModal={handleInviteUserToggleModal}
          ></InviteUser>
          <ConfirmAction
            show={showDeleteModal}
            title="Eliminar"
            message="¿Estás seguro de que quieres realizar esta acción?"
            onConfirm={handleActionDeleteConfirm}
            onCancel={handleActionDeleteCancel}
          ></ConfirmAction>
          <UpdateUser
            id={ItemIdSelected}
            showModal={showUpdateModal}
            handleToggleModal={handleUpdateUserToggleModal}
            refetch={refetchUsers}
          ></UpdateUser>
        </section>
      </DashboardData>
    </>
  );
};
