import React, { useState, useEffect } from "react";
import { DashboardData } from "../Dashboard/DashboardData";
import { InviteUser } from "../../Components/Modals/InviteUser";
import { ConfirmAction } from "../../Components/Modals/ConfirmAction";
import { UpdateUser } from "../../Components/Modals/UpdateUser";
import {deleteUser, getUsersList} from "../../graphql/Users/UsersCustomHooks";
import {SortInterface, UserInterface} from "../../Types/UserTypes";

import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState<string>("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [ItemIdSelected, setItemIdSelected] = useState<string | null>(null);


  const initialSort: SortInterface = { sortOrder: "ASC", field: "name" };
  const [Sort, setSort] = useState<SortInterface>(initialSort);

  //FUNCIONES
  const handleSortChange = ( field: string) => {
  };
  
  const handleNextPage = () => {
  };

  const handlePreviousPage = () => {
  };

  const handlePage = (page: number) => {
  };

  const handleDelete = async (userId: string) => {
    setLoading(true);
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdateUser = (userId?:  string) =>{
    setShowUpdateModal(true);
    if(userId){
      setItemIdSelected(userId);
    }
  };

  const handleUpdateUserToggleModal = () => {
    setShowUpdateModal(!showUpdateModal);
    if(!showUpdateModal){
      setItemIdSelected(null);
    }
  };

  const handleInviteUserToggleModal = () => {
    setShowInviteModal(!showInviteModal);
  };

  const handleOpenDeleteModal = (userId?: string) => {
    setShowDeleteModal(true);
    if(userId){
      setItemIdSelected(userId);
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

  const fetchUsers = async () => {
    try {
      const usersList = await getUsersList();
      setUsers(usersList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // USE EFFECTS

  useEffect(() => {
    fetchUsers();
  }, []);

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
                    <form onSubmit={() => console.log("TODO here")}>
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
                  <div className="col-md-2 d-none" >
                    <button
                      type="button"
                      className="btn btn-block btn-white  btn-sm"
                    >
                      <img src="/assets/Icons/filter.svg" alt="" />
                      Filtrar
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn btn-block btn-white btn-sm text-buttons-cnt"
                      onClick={handleInviteUserToggleModal}
                    >
                      <img src="/assets/Icons/add-user.svg" alt="" />
                      Invitar
                    </button>
                  </div>
                  <div className="col-md-1 d-none">
                    <a>
                      <img src="/assets/Icons/edit.svg" alt="" />
                    </a>
                  </div>
                  <div className="col-md-1 d-none">
                    <a>
                      <img src="/assets/Icons/trash.svg" alt="" />
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
                    ) : users.length == 0 ? (
                    <p>No se encontraron usuarios</p>
                  ) : (
                    <table className="table table-hover text-nowrap">
                      <thead className="bg-header-footer">
                        <tr>
                          <th>
                          <a onClick={() => handleSortChange("name")}>  Nombre{" "}
                            {Sort.field == 'name'?
                            (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                          <a onClick={() => handleSortChange("surname")}> Apellidos{" "}
                            {Sort.field == 'surname'?
                            (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                           </a>
                          </th>
                          <th>
                          <a onClick={() => handleSortChange("email")}>Correo electrónico{" "}
                            {Sort.field == 'email'?
                            (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("profile")}>Tipo de usuario{" "}
                              {Sort.field == 'profile'?
                              (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("createdAt")}>Fecha de creación{" "}
                              {Sort.field == 'profile'?
                               (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                 
                        {users && users.map((item: UserInterface) => (
                          <tr key={item.id}>
                         
                          <td>{item.name} </td>
                          <td>{item.surname}</td>
                          <td>{item.email}</td>
                          <td>
                            <span className="tag rounded py-1 px-2 text-buttons-cnt bg-cnt">{item.role}</span>
                          </td>
                          <td>{item.createdAt}</td>
                          <td>
                            {" "}
                            <a className="d-none">
                              <img src="/assets/Icons/eye.svg" alt="" />
                            </a>
                            <a onClick={() => handleUpdateUser(item.id)}>
                              <img src="/assets/Icons/edit.svg" alt="" />
                            </a>
                            <a onClick={() => handleOpenDeleteModal(item.id)}>
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
                        Total: {100}
                      </a>
                   
                      <li className="page-item">
                        <button className="page-link" disabled={true} onClick={handlePreviousPage}>
                          «
                        </button>
                      </li>
                      {Array.from({ length: Math.ceil(100 / 10) }, (_, index) => (
                        <li className="page-item" key={index}>
                          <a
                            className={0 === index + 1 ? "page-link text-white bg-primary" : "page-link"}
                            onClick={() => handlePage(index + 1)}
                          >
                             {index + 1}
                  
                          </a>
                        </li>
                      ))}
                      <li className="page-item" >
                        <button className="page-link" disabled={true} onClick={handleNextPage}>
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
            refetch={fetchUsers}
          ></UpdateUser>
        </section>
      </DashboardData>
    </>
  );
};
