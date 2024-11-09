import React, { useCallback, useEffect, useState } from "react";
import { DashboardData } from "../../Dashboard/DashboardData";
import { useReferences } from "../../../graphql/References/ReferencesCustomHooks";
import { PaginationInterface, SortInterface } from "../../../Types/UserTypes";
import { ToastContainer } from "react-toastify";
import { ReferencesInterface } from "../../../Types/ReferencesTypes";
import _ from "lodash";
import { ClipLoader } from "react-spinners";
import { CreateReference } from "../../../Components/Modals/CreateReference";
import { UpdateReference } from "../../../Components/Modals/UpdateReference";

export const References = () => {
  const initialPagination: PaginationInterface = { limit: 50, offset: 0 };
  const initialSort: SortInterface = { sortOrder: "ASC", field: "title" };
  const { referencesData,  referencesError,  referencesLoading, refetchReferences, updatePagination, updateSort, searchReferenceByTitle, currentSortOrder, totalItems} = useReferences(initialPagination, initialSort);
  const loading =  referencesLoading;
  const noData = !referencesLoading && (!referencesData || referencesData.length === 0);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [ItemIdSelected, setItemIdSelected] = useState<string | null>(null)
  const [Sort, setSort] = useState<SortInterface>(initialSort);
  const [showCreateReferenceModal, setShowCreateReferenceModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdatModal] = useState<boolean>(false);
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
    _.debounce((title: string) => {
      setCurrentPage(0);
      updatePagination({ ...initialPagination, offset: 0 });
      searchReferenceByTitle(title);
    }, 1000),
    []
  );

  const handleUpdateReference = (ReferenceId?:  string) =>{
    if(ReferenceId){
      setItemIdSelected(ReferenceId)
      setShowUpdatModal(true);
    }
  };

  const handleCreateRefereceToggleModal = () => {
    setShowCreateReferenceModal(!showCreateReferenceModal);
  };

  const handleUpdateReferenceToggleModal = () => {
    setShowUpdatModal(!showUpdateModal);
    if(!showUpdateModal){
      setItemIdSelected(null);
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
    handleSearch(searchTitle);
  }, [searchTitle, handleSearch, searchReferenceByTitle]);


  return (
    <>
      <DashboardData>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6 col-md-5">
                <h1>Referencias</h1>
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
                                <img src="/assets/Icons/search.svg" alt="" />
                              </span>
                            </div>
                            <input
                              type="text"
                              name="table_search"
                              className="form-control form-control-c float-left btn-white btn-sm"
                              value={searchTitle}
                              onChange={(e) => setSearchTitle(e.target.value)}
                              placeholder="Buscar por nombre"
                            />
                          </div>
                      </form>
                  </div>
              
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn btn-block btn-white btn-sm"
                      onClick={handleCreateRefereceToggleModal}
                    >
                      <img src="/assets/Icons/plus.svg" alt="" />
                      Crear
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
                    <p>No se encontraron Referencias</p>
                  ) : (
                    <table className="table table-hover ">
                      <thead className="bg-header-footer">
                        <tr>
                          <th>
                            <a onClick={() => handleSortChange("title")}>Nombre corto{" "}
                              {Sort.field == 'title'? 
                              (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("journal_name")}>Revista{" "}
                              {Sort.field == 'journal_name'? 
                              (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                   
                          <th>
                            <a onClick={() => handleSortChange("date_primary")}>Año{" "}
                              {Sort.field == 'date_primary'? 
                              (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            Autores{" "}
                            <a onClick={() => handleSortChange("authors")}>Autores{" "}
                              {Sort.field == 'authors'? 
                              (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("doi")}>DOI{" "}
                              {Sort.field == 'doi'? 
                              (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                          <th>
                            <a onClick={() => handleSortChange("Type")}>Tipo{" "}
                              {Sort.field == 'Type'? 
                              (<img src={Sort.sortOrder =='ASC'? "/assets/Icons/sort-arrow-up.svg": "/assets/Icons/sort-arrow-down.svg" }/>) : (
                                <img src="/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                              )}
                            </a>
                          </th>
                      
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {referencesData && referencesData.map((item: ReferencesInterface) => (
                        <tr>
                          <td>{item?.short_name ?  item.short_name : item.title}</td>
                          <td>{item?.journal_name}</td>
                        
                          <td>{item?.date_primary}</td>
                          <td>{item?.authors}</td>
                          <td>{item?.doi &&
                            (<a href={item.doi} target="_blank">Link</a>)}</td>
                          <td>
                            {" "}
                            <span className="tag tag-blue-round">{item?.type}</span>
                          </td>
                         
                          <td>
                            <a onClick={() => handleUpdateReference(item.firestore_id)}>
                              <img src="/assets/Icons/edit.svg" alt="" />
                            </a>
                            <a>
                              <img src="/assets/Icons/trash.svg" alt="" />
                            </a>
                          </td>
                        </tr>
                        )
                      )}
                      
                      </tbody>
                    </table>
                  )}
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
          <CreateReference
            showModal={showCreateReferenceModal}
            handleToggleModal={handleCreateRefereceToggleModal}
            refetch={refetchReferences}
          ></CreateReference>
          <UpdateReference
            id={ItemIdSelected}
            showModal={showUpdateModal}
            handleToggleModal={handleUpdateReferenceToggleModal}
            refetch={refetchReferences}
          ></UpdateReference>
        </section>
      </DashboardData>
    </>
  );
};
