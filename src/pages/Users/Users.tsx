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
  const initialPagination: PaginationInterface = { limit: 10, offset: 0 };
  const initialSort: SortInterface = { sortOrder: "ASC", field: "name" };
  //const initialName: string | null = null;

  const { usersData, usersError, usersLoading, refetchUsers, updatePagination, updateSort, searchUserByName, currentSortOrder} = useUsers(initialPagination, initialSort);
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
    console.log((initialPagination.offset || 0) + usersData.length < initialPagination.limit ? 0 : 1  )
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
      console.log("setItemIdSelected")
      console.log(setItemIdSelected)
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
                            <img
                              src={Sort.sortOrder =='ASC' && Sort.field == 'name'  ? "/src/assets/Icons/arrow-down.svg": "/src/assets/Icons/arrow-up.svg" }
                            /></a>
                          </th>
                          <th>
                          <a onClick={() => handleSortChange("surname")}> Apellidos{" "}
                            <img
                              src={Sort.sortOrder =='ASC' && Sort.field == 'surname'  ? "/src/assets/Icons/arrow-down.svg": "/src/assets/Icons/arrow-up.svg" }
                            /></a>
                          </th>
                          <th>
                          <a onClick={() => handleSortChange("email")}>Correo electrónico{" "}
                            <img
                                src={Sort.sortOrder =='ASC' && Sort.field == 'email'  ? "/src/assets/Icons/arrow-down.svg": "/src/assets/Icons/arrow-up.svg" }
                            /></a>
                          </th>
                          <th>
                            Tipo de usuario{" "}
                            <img
                              src="/src/assets/Icons/arrow-down.svg"
                              alt=""
                            />
                          </th>
                          <th>
                          <a onClick={() => handleSortChange("createdAt")}>Fecha de creación{" "}
                            <img
                               src={Sort.sortOrder =='ASC' && Sort.field == 'createdAt'  ? "/src/assets/Icons/arrow-down.svg": "/src/assets/Icons/arrow-up.svg" }
                            /></a>
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
            refetchUsers={refetchUsers}
          ></UpdateUser>
        </section>
      </DashboardData>
    </>
  );
};
