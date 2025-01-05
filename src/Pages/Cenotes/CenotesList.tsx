import React, { useCallback, useEffect, useRef, useState } from "react";
import { DashboardData } from "../Dashboard/DashboardData";
import {
  deleteCenote, getCenotesList,
} from "../../graphql/Cenotes/CenotesCustomHooks";
import { CenoteInterface } from "../../Types/CenotesTypes";
import { ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { ConfirmAction } from "../../Components/Modals/ConfirmAction";
import { CreateCenote } from "../../Components/Modals/CreateCenote";
import { UpdateCenote } from "../../Components/Modals/UpdateCenote";
import { useAuthContext } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  addFavouriteCenote,
  getUserFavouriteCenotes,
  removeFavouriteCenote
} from "../../graphql/Users/UsersCustomHooks";
import {SortInterface} from "../../Types/UserTypes.tsx";
import _ from "lodash";


export const List_cenotes = () => {
  const initialSort: SortInterface = { sortOrder: "ASC", field: "name" };
  const navigate = useNavigate();
  const testCenoteId = "00YaFC8pXUrx7ib4wx8Z";
  const isFirstRender = useRef(true);

  const { user } = useAuthContext();
  const [cenotes, setCenotes] = useState([]);
  const [favouriteCenotesIds, setFavouriteCenotesIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const noData = !loading && (!cenotes || cenotes.length === 0);

  const [showCreateCenoteModal, setShowCreateCenoteModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdatModal] = useState<boolean>(false);
  const [itemIdSelected, setItemIdSelected] = useState<string | null>(null)


  const [sort, setSort] = useState<SortInterface>(initialSort);
  const [searchName, setSearchName] = useState<string>("");

  const handleSortChange = ( field: string) => {
  };

  const handleNextPage = () => {
  };

  const handlePreviousPage = () => {
  };

  const handlePage = (page: number) => {
  };

  const handleSearch = useCallback(
    _.debounce((name: string) => {
      if (isFirstRender.current) {
        console.log("I'm here to render")
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

  const handleActionDeleteConfirm = async () => {
    setLoading(true)
    setShowDeleteModal(false);
    setItemIdSelected('');
    if(itemIdSelected){
      await deleteCenote(itemIdSelected);
      await fetchCenotes();
    }
  };

  const handleActionDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemIdSelected('');
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

  const handleAddFavoriteCenote = async (cenoteId: string | undefined) => {
    if (user?.id && cenoteId){
      await addFavouriteCenote(user?.id, cenoteId);
      favouriteCenotesIds.push(cenoteId);
      setFavouriteCenotesIds(prevState => [...prevState, cenoteId]);
    }
  };

  const handleIsFavoriteCenote = (cenoteId: string | undefined | null) => {
    if (cenotes && favouriteCenotesIds && cenoteId) {
      return favouriteCenotesIds.includes(cenoteId)
    }
  };

  const handleRemoveFavoriteCenote = async (cenoteId: string | undefined) => {
    if (user?.id && cenoteId) {
      await removeFavouriteCenote(user?.id, cenoteId);
      const filteredFavouriteCenotes = favouriteCenotesIds.filter(id => id !== cenoteId);
      setFavouriteCenotesIds(filteredFavouriteCenotes);
    }
  };

  const fetchCenotes = async () => {
    try {
      const cenotesList = await getCenotesList();
      setCenotes(cenotesList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cenotes:', error);
    }
  };

  const fetchFavouriteCenotes = async () => {
    try {
      const favouriteCenotes = await getUserFavouriteCenotes(user?.id);
      const favouriteCenotesIds = favouriteCenotes.map(c => c.id);
      setFavouriteCenotesIds(favouriteCenotesIds);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching favourite cenotes:', error);
    }
  };

  //USE EFECTS
  useEffect(() => {
    console.log(JSON.stringify(user));
    fetchCenotes();
    fetchFavouriteCenotes();
  }, []);


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
                              {sort.field == 'name'? 
                              (<img src={sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("state")}> Estado{" "}
                            {sort.field == 'state'? 
                            (<img src={sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                           
                            <a onClick={() => handleSortChange("municipality")}> Municipio{" "}
                            {sort.field == 'municipality'? 
                            (<img src={sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th> 
                            <a onClick={() => handleSortChange("type")}> Tipo{" "}
                            {sort.field == 'type'? 
                            (<img src={sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                            
                            <a onClick={() => handleSortChange("createdAt")}> Creado{" "}
                            {sort.field == 'createdAt'? 
                            (<img src={sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th>
                            Actualizado{""}
                            <a onClick={() => handleSortChange("description")}>Descripción{" "}
                              {sort.field == 'description'? 
                              (<img src={sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("updatedAt")}> Etiquetas{" "}
                              {sort.field == 'updatedAt'? 
                              (<img src={sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("variable_count")}> Variable{""}
                            {sort.field == 'variable_count'? 
                            (<img src={sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                              <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                            )}
                          </a>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {cenotes && cenotes.map((item: CenoteInterface) => (
                          <tr key={item.id}>
                            <td>
                              {handleIsFavoriteCenote(item?.id) ?
                              ( <a className="cursor-pointer" onClick={() => handleRemoveFavoriteCenote(item.id)}>
                              <img src="/assets/Icons/heart-red.svg" alt="" />
                            </a>)
                              : (
                                <a className="cursor-pointer" onClick={() => handleAddFavoriteCenote(item.id)}>
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
                              <a className="cursor-pointer" onClick={() => handleUpdateCenote(item.id)}>
                                <img src="/assets/Icons/edit.svg" alt="" />
                              </a>
                              <a className="cursor-pointer" onClick={() => handleOpenDeleteModal(item.id)}>
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
                        <button
                          className="page-link"
                          disabled={12 === 1}
                          onClick={handlePreviousPage}
                        >
                          «
                        </button>
                      </li>
                      <li className="page-item">
                        <button
                          className="page-link"
                          disabled={true}
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
            refetch={fetchCenotes}
          ></CreateCenote>
          <ConfirmAction
            show={showDeleteModal}
            title="Eliminar"
            message="¿Estás seguro de que quieres realizar esta acción?"
            onConfirm={handleActionDeleteConfirm}
            onCancel={handleActionDeleteCancel}
          ></ConfirmAction>
          <UpdateCenote
            id={itemIdSelected}
            showModal={showUpdateModal}
            handleToggleModal={handleUpdateCenoteToggleModal}
            refetch={fetchCenotes}
          ></UpdateCenote>
        </section>
      </DashboardData>
    </>
  );
};
