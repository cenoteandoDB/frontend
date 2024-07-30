import React, { useCallback, useEffect, useState } from "react";
import { DashboardData } from "../../Dashboard/DashboardData";
import { PaginationInterface, SortInterface } from "../../../Types/UserTypes";
import { useSpecies } from "../../../graphql/Species/SpeciesCustomHooks";
import _, { sortBy } from "lodash";
import { ClipLoader } from "react-spinners";
import { SpeciesInterface } from "../../../Types/SpeciesTypes";
import { CardSpecies } from "../../../Components/Card/CardSpecies";

export const SpeciesList = () => {
  const initialPagination: PaginationInterface = { limit: 50, offset: 0 };
  const initialSort: SortInterface = { sortOrder: "ASC", field: "name" };
  const { speciesData, speciesError, speciesLoading, refetchSpecies, updatePagination, updateSort, searchSpecieByName, currentSortOrder, totalItems} = useSpecies(initialPagination, initialSort);
  const loading = speciesLoading;
  const noData = !speciesLoading && (!speciesData || speciesData.length === 0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchName, setSearchName] = useState<string>("");
  const [Sort, setSort] = useState<SortInterface>(initialSort);
  const [isTableList, setIsTableList] = useState<boolean>(true);

  const handleSortChange = (field: string) => {
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
      searchSpecieByName(name);
    }, 1000),
    []
  );

  const handleSetIsTableList = (isTable: boolean) => {
    refetchSpecies();
    setIsTableList(isTable);
    setCurrentPage(0);
  };

  useEffect(() => {
    handleSearch(searchName);
  }, [searchName, handleSearch, searchSpecieByName]);
  
  return (
    <>
      <DashboardData>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6 col-md-5">
                <h1>Especies</h1>
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
                      className={isTableList ?  "btn btn-block btn-white btn-sm border border-dark" :  "btn btn-block btn-white btn-sm"}
                      onClick={() => handleSetIsTableList(true)}
                    >
                      <img src="/src/assets/Icons/table_list.svg" alt="" />
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="button"
                      className={!isTableList ?  "btn btn-block btn-white btn-sm border border-dark" :  "btn btn-block btn-white btn-sm"}
                      onClick={() => handleSetIsTableList(false)}
                    >
                      <img src="/src/assets/Icons/tabler-layout-grid.svg"  alt="" />
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
                  {/* TABLE */}
                  {loading ?  ( 
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                      <ClipLoader loading={loading} size={50} />
                    </div>
                    ) : noData ? (
                          <p>No se encontraron usuarios</p>
                    ) : (
                      <div>
                        { isTableList &&
                        <>
                          <table className="table table-hover text-nowrap">
                            <thead className="bg-header-footer">
                              <tr>
                                <th>
                                  <a onClick={() => handleSortChange("name")}>  Nombre científico{" "}
                                    {Sort.field == 'name'? 
                                    (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                                      <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                                    )}
                                  </a>
                                </th>
                                <th>
                                  <a onClick={() => handleSortChange("name")}>  Nombre Especie{" "}
                                    {Sort.field == 'name'? 
                                    (<img src={Sort.sortOrder =='ASC'? "/src/assets/Icons/sort-arrow-up.svg": "/src/assets/Icons/sort-arrow-down.svg" }/>) : (
                                      <img src="/src/assets/Icons/up-and-down-arrows.svg" alt="down"/>
                                    )}
                                  </a>
                                </th>
                                <th>
                                  Fecha Creación{" "}
                                </th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {speciesData && speciesData.map((item: SpeciesInterface) => (
                                <tr key={item.id}>

                                  <td>{item.name}</td>
                                  <td>{item.name}</td>
                                  <td>{item.createdAt}</td>
                                  <td>
                                    {item?.inaturalistId  && 
                                    <a href={'https://mexico.inaturalist.org/observations/' + item?.inaturalistId }>
                                        <span className="tag tag-blue-round">iNatural</span>
                                    </a>
                                    }
                                    {item?.gbifId  && 
                                      <a href={'https://www.gbif.org/es/occurrence/' + item?.gbifId }>
                                        <span className="tag tag-blue-round">GBIF</span>
                                      </a>
                                    }
                                  
                                  
                                  </td>
                                </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </>
                        }
                        { !isTableList &&
                        <>
                          <div className="row">
                            {speciesData && speciesData.map((item: SpeciesInterface) => (
                            
                                <CardSpecies 
                                  key={item.id} // Use a unique key for each element
                                  {...item} // Spread item properties
                                ></CardSpecies>
                           
                              )
                            )}
                          </div>
                        </>
                        }
                      </div>
                    )
                  }
                    
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
        </section>
      </DashboardData>
    </>
  );
};
