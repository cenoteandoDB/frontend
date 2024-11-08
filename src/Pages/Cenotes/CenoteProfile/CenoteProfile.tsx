import React, { useEffect, useState } from "react";
import { DashboardData } from "../../Dashboard/DashboardData";
import { useParams, useNavigate } from 'react-router-dom';
import { Gallery } from "../../../Components/Gallery/Gallery";
import "./CenoteProfile.css";
import { ClipLoader } from "react-spinners";
import { useGetCenoteById, useGetMofByTheme, useGetThemesByCenote } from "../../../graphql/Cenotes/CenotesCustomHooks";
import { toast, ToastContainer } from "react-toastify";
import { GeomorphologyTab } from './GeomorphologyTab';
import { MeasurementsInterface, mofByThemeInterface, mofInterface } from "../../../Types/CenotesTypes";
import { useThemes } from "../../../graphql/Variables/VariablesCustomHooks";
import { EnumsInterface } from "../../../Types/UserTypes";
import { BiodiversityTab } from "./BiodiversityTab";
import { UpdateMof } from "../../../Components/Modals/UpdateMof";
import MapSelector from "../../../Components/Utils/mapSelector";
import { BibliographyTab } from "./BibliographyTab";
import { IndicatorsTab } from "./IndicatorsTab";
import { WaterTab } from "./WaterTab";
import { AddImages } from "../../../Components/Modals/AddImages";


export const CenoteProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<string | null>(null);
  const { cenoteData, loadingData, errorData, refetchCenoteById } = useGetCenoteById(id);

  const { themesData } = useThemes(); //ALL THEMES
  const { themesList, themesLoading ,themesError } = useGetThemesByCenote(id);//THEMES WITH DATA
  const { mofsByThemeData, mofsByThemeError ,mofsByThemeLoading, refetchMofByTheme } = useGetMofByTheme(id, theme);
  const [showUpdateMofModal, setShowUpdateMofModal] = useState<boolean>(false);
  const [showAddImageModal, setShowAddImageModal] = useState<boolean>(false);
  const [tabController, setTabController] = useState("");
  const loading = loadingData;
  console.log(mofsByThemeLoading)
  console.log(mofsByThemeData)
  const handleTabController = (tabcontroller: string, theme: string) => {
    setTheme(theme);
    setTabController(tabcontroller);
  };

  const handleIsThemeWithData = (theme: string | undefined | null) => {
    if(themesList && theme){
      if(themesList.includes(theme)){
        return true;
      }
    }
    return false;
  };

  const handleIsThemeDoubleView = (theme: string | undefined | null) => {
    const themesDoubleView = ["GEOMORPHOLOGY", "BIODIVERSITY", 'TOURISM', 'WATER'];
    if(themesDoubleView && theme){
      if(themesDoubleView.includes(theme)){
        return true;
      }
    }
    return false;
  };

  const handleUpdateMofToggleModal = () => {
    setShowUpdateMofModal(!showUpdateMofModal);
  };

  const handleAddImageToggleModal = () => {
    setShowAddImageModal(!showAddImageModal);
  };

  useEffect(() => {
    if (theme) {
      refetchMofByTheme();
    }
  }, [theme, id, refetchMofByTheme]);

  useEffect(() => {
    if(errorData){
      toast.error('El Registro no se encontro en la Base de datos')
      navigate(`/cenotes`);
    }
  }, [errorData])

  useEffect(() => {
    if(themesList && !themesError){
      setTabController("custom-tabs-0-tab")
    }
  }, [themesList])

  useEffect(() => {
    if ( themesData && themesData.length > 0) {
      setTheme(themesData[0].name);
      setTabController("custom-tabs-0-tab");
    }
  }, [themesData]);


  const renderIconOnCheckOption = (mofItem: mofInterface, measurementValue: string) => {
    if (measurementValue === 'true' || measurementValue === '') {
      return <img src="/src/assets/Icons/check.svg" alt="check" />;
    } else if (measurementValue === 'false') {
      return <img src="/src/assets/Icons/Icon=tabler_x.svg" alt="tabler_x" />;
    } else if (measurementValue !== '') {
      return (
        <img
          src={`/src/assets/cenoteando-icons/${mofItem.variableIcon}`}
          alt={`${mofItem.variableIcon}.svg`}
        />
      );
    }
    return null;
  };

  const renderThemesIcons = (themeName: string): string => {
    const themeIcons: { [key: string]: string } = {
      IDENTIFICATION: 'Icon=tabler_map.svg',
      GEOMORPHOLOGY: 'Icon=tabler_mountain.svg',
      BIODIVERSITY: 'Icon=tabler_leaf.svg',
      WATER: 'Icon=tabler_droplet.svg',
      REGULATION: 'Icon=tabler_user-shield.svg',
      TOURISM: 'Icon=tabler_beach.svg',
      ORGANIZATION: 'Icon=tabler_calendar-month.svg',
      CULTURAL: 'Icon=tabler_diamonds.svg',
      INDICATOR: 'Icon=tabler_test-pipe.svg',
      BIBLIOGRAPHY: 'Icon=tabler_book-2.svg'
    };
  
    const theme = themesData.find((item: EnumsInterface) => item.name === themeName);
    if (theme) {
      return '/src/assets/cenoteando-icons/' + themeIcons[themeName] || '/src/assets/cenoteando-icons/Icon=tabler_diamonds.svg'; // Return the icon or a default icon if not found
    }
    return '/src/assets/cenoteando-icons/Icon=tabler_diamonds.svg'; // Return a default icon if theme is not found
  };

  return (
    <div>
      <DashboardData>
     
        {loading ?  ( 
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader loading={loading} size={50} />
          </div>
        ) : (
          <>
            <section className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-12 col-md-8">
                      <ToastContainer />
                      <p className="lbl-bread-subtitle mb-1">
                        {" "}
                        <img src="/src/assets/Icons/map.svg" alt="" />
                        {cenoteData?.municipality},  {cenoteData?.state} 

                      </p>
                      <h1 className="lbl-bread-title mt-0">{cenoteData?.name}</h1>
                      <p className="lbl-bread-subtitle">
                        “Cenote de aguas cristalinas”
                      </p>
                     
                    </div>
                    <div className="col-sm-12 col-md-4">
                      <div className="row">
                        {cenoteData?.touristic &&
                        <div className="col-md-4">
                        <a
                          className="btn btn-bg-blue-round  btn-block mt-5 float-right"
                        >
                          <img
                            src="/src/assets/Icons/beach.svg"
                            alt=""
                            className="mr-2 " />
                          Turismo
                        </a>
                      </div>
                        }
                        
                        <div className="col-md-2">
                          <button
                            type="button"
                            className="btn  btn-white  mt-5 float-right"
                          >
                            <img src="/src/assets/Icons/edit.svg" alt="" />
                          </button>
                        </div>
                        <div className="col-md-2">
                          <button
                            type="submit"
                            className="btn btn-white  mt-5 float-right"
                          >
                            <img
                              src="/src/assets/Icons/heart.svg"
                              alt=""
                              className="mr-2 " />
                          </button>
                        </div>
                        <div className="col-md-2">
                          <button
                            type="submit"
                            className="btn btn-white  mt-5 float-right"
                          >
                            <img
                              src="/src/assets/Icons/upload.svg"
                              alt=""
                              className="mr-2 " />
                          </button>
                        </div>
                        <div className="col-md-2">
                          <button
                            type="submit"
                            className="btn btn-white  mt-5 float-right"
                          >
                            <img
                              src="/src/assets/Icons/trash.svg"
                              alt=""
                              className="mr-2 " />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="content">
                {cenoteData && cenoteData.photos.length ? (
                  <Gallery photoUrls={cenoteData.photos}></Gallery>
                  ) : (   <img src="/src/assets/Images/no_image.jpg" className="react-photo-album--photo" loading="lazy" decoding="async"></img> )
                }
                <div className="pull-right float-right">
                  <a onClick={() => setShowAddImageModal(true)} className="cursor-pointer">
                    <img src="/src/assets/icons/plus.svg"/>
                      Agregar Imagen
                  </a>
                </div>
                
                <div className="row mt-5">
                  <div className="col-12">
                    <div className="card card-primary card-outline card-outline-tabs">
                      <div className="card-header p-0 border-bottom-0">
                        <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                          {themesData && themesData.map((theme: EnumsInterface, index: number) => (
                            <li className={handleIsThemeWithData(theme.name) ? 'nav-item' : 'nav-item disable-style'} key={theme.name}>
                              <a
                               
                                className={tabController === `custom-tabs-${index}-tab` ? "nav-link active" : "nav-link"}
                                id={`custom-tabs-${index}-tab`}
                                data-toggle="pill"
                                role="tab"
                                aria-controls={`custom-tabs-${index}-content`}
                                aria-selected={tabController === `custom-tabs-${index}-tab`}
                                onClick={() => handleTabController(`custom-tabs-${index}-tab`, theme.name)}
                              >
                                <img className="image-center" src={`${renderThemesIcons(theme.name)}`} alt={`${theme.name} icon`} />
                                <br />
                                {theme.name}
                              </a>
                            </li>
                          ))}
                          <li className='nav-item' key='bibliography'>
                              <a
                               
                                className={tabController === `custom-tabs-bibliography-tab` ? "nav-link active" : "nav-link"}
                                id={`custom-tabs-bibliography-tab`}
                                data-toggle="pill"
                                role="tab"
                                aria-controls={`custom-tabs-bibliography-content`}
                                aria-selected={tabController === `custom-tabs-bibliography-tab`}
                                onClick={() => handleTabController(`custom-tabs-bibliography-tab`, 'bibliography')}
                              >
                                <img className="image-center" src='/src/assets/cenoteando-icons/Icon=tabler_book-2.svg' alt='INDICATOR' />
                                <br />
                                BIBLIOGRAPHY
                              </a>
                          </li>
                          <li className='nav-item' key='indicators'>
                              <a
                               
                                className={tabController === `custom-tabs-indicators-tab` ? "nav-link active" : "nav-link"}
                                id={`custom-tabs-indicators-tab`}
                                data-toggle="pill"
                                role="tab"
                                aria-controls={`custom-tabs-indicators-content`}
                                aria-selected={tabController === `custom-tabs-indicators-tab`}
                                onClick={() => handleTabController(`custom-tabs-indicators-tab`, 'indicators')}
                              >
                                <img className="image-center" src='/src/assets/cenoteando-icons/Icon=tabler_diamonds.svg' alt='INDICATOR' />
                                <br />
                                INDICATORS
                              </a>
                          </li>
                          <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                data-widget="navbar-search"
                                data-target="#navbar-search5"
                                href="#"
                                role="button"
                              >
                                <img
                                  className="image-center"
                                  src="/src/assets/Icons/arrow-right.svg"
                                  alt="" />
                              </a>
                              <div
                                className="navbar-search-block"
                                id="navbar-search5"
                              >
                                <form className="form-inline">
                                  <div className="input-group input-group-sm">
                                    <input
                                      className="form-control form-control-navbar"
                                      type="search"
                                      placeholder="Search"
                                      aria-label="Search" />
                                    <div className="input-group-append">
                                      <button
                                        className="btn btn-navbar"
                                        type="submit"
                                      >
                                        <i className="fas fa-search" />
                                      </button>
                                      <button
                                        className="btn btn-navbar"
                                        type="button"
                                        data-widget="navbar-search"
                                      >
                                        <i className="fas fa-times" />
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </li>
                          </ul>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="tab-content" id="custom-tabs-four-tabContent">
                          {themesData && themesData.map((theme: EnumsInterface, index: number) => (
                            <div
                              key={theme.name}
                              className={tabController === `custom-tabs-${index}-tab` ? "tab-pane fade show active" : "tab-pane fade"}
                              id={`custom-tabs-${index}-content`}
                              role="tabpanel"
                              aria-labelledby={`custom-tabs-${index}-tab`}
                            >
                              {/*BUTON EDIT*/}
                            

                              {/*DATOS*/}
                              {mofsByThemeLoading ?  ( 
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                                  <ClipLoader loading={mofsByThemeLoading} size={50} />
                                </div>
                              ) : (
                              <div className="row">

                                {/*ADD AND EDIT VARIABLES BUTTON*/}
                                <div className="float-right col-md-12">
                                  <a onClick={() => setShowUpdateMofModal(true)} className="btn btn-bg-blue-round  float-right">
                                    <img src="/src/assets/Icons/plus.svg" className="mr-2 " />
                                    Add/Edit Variables
                                  </a>
                                </div>

                                {/*CUSTOM FEATURES*/}

                                { theme.name == 'TOURISM' &&
                                  <div className="mt-3 col-6">
                                    {
                                      cenoteData && !loadingData && 
                                        <MapSelector lat={cenoteData.latitude} lng={cenoteData.longitude} cenote={cenoteData.name}/>
                                    }
                                  </div>
                                }
                                { theme.name == 'BIODIVERSITY' &&
                                  <div className="mt-3 col-6">
                                    {
                                    cenoteData && !loadingData && 
                                      <BiodiversityTab speciesList={cenoteData.species}></BiodiversityTab>
                                    }
                                  </div>
                                }
                                { theme.name == 'GEOMORPHOLOGY' &&
                                  <div className="mt-3 col-6">
                                    {
                                    cenoteData && !loadingData &&
                                    <GeomorphologyTab></GeomorphologyTab>
                                    }
                                  </div>
                                }

                                { theme.name == 'WATER' &&
                                  <>
                                    { <WaterTab mofsByThemeData={mofsByThemeData} />}
                                  </>
                                }
                                
                                {theme.name != 'WATER' &&
                                  <>
                                    {handleIsThemeDoubleView(theme.name)  ? 
                                    (
                                      <div className='mt-3 col-6'>
                                      {mofsByThemeData && (
                                        mofsByThemeData.map((item: mofByThemeInterface, index: number) => (
                                          <div key={ 'category-' + index }>
                                            <div className={index == 0 ? "container-blue col-md-12" : "container-blue mt-3 col-md-12"}>
                                              <p className="title-color title-weight title-size">  <img src={"/src/assets/icons/star.svg"}></img> {item.category}</p>
                                              {item && item.mofs.map((mofItem: mofInterface) => (
                                                <div key={mofItem.id} >
                                                    <div>
                                                      {mofItem.variableRepresentation === 'TEXT' &&
                                                        (mofItem.measurements.map((measurements_item: MeasurementsInterface) => (
                                                        <div className="measurement-item">
                                                          <span className="variable-name title-color">
                                                          {mofItem.variableIcon ?
                                                            ( <img src={"/src/assets/cenoteando-icons/" + mofItem.variableIcon } alt={mofItem.variableIcon + '.svg'} /> ):
                                                            ( <img src="/src/assets/Icons/check.svg" alt="check" /> )
                                                          }
                                                          {mofItem.variableName}
                                                          </span>
                                                          { measurements_item.value != 'true' &&  measurements_item.value != 'false' &&
                                                            <span className="measurement-value"><strong>{measurements_item.value}</strong></span>
                                                          }
                                                        
                                                        </div>
                                                        ))
                                                      )}
                                                      {mofItem.variableRepresentation === 'CHECK' || mofItem.variableRepresentation === 'ICON' && (
                                                        <div className="two-column-container">
                                                          {mofItem.measurements.map((measurements_item: MeasurementsInterface, index: number) => (
                                                            <div className="two-column-item" key={index}>
                                                                { renderIconOnCheckOption(mofItem, measurements_item.value) }
                                                                { mofItem.variableName }
                                                            </div> 
                                                          ))}
                                                        </div>
                                                      )}

                                                      {mofItem.variableRepresentation === 'UNITS' &&
                                                        (mofItem.measurements.map((measurements_item: MeasurementsInterface) => (
                                                        <div className="measurement-item">
                                                          <span className="variable-name title-color">
                                                          {mofItem.variableIcon &&  ( <img src={"/src/assets/cenoteando-icons/" + mofItem.variableIcon } alt={mofItem.variableIcon + '.svg'} /> )} 
                                                          {mofItem.variableName}
                                                          </span>
                                                          <span className="measurement-value"><strong>{measurements_item.value} {mofItem?.variableUnits}</strong></span>
                                                        </div>
                                                        ))
                                                      )}

                                                      {mofItem.variableRepresentation === 'LIST' &&
                                                        <div className="two-column-container">
                                                          <span className="title-color"><strong>{mofItem.variableName}:</strong></span>
                                                          {mofItem.measurements.map((measurements_item: MeasurementsInterface, index: number) => (
                                                            <div className="two-column-item" key={index}>
                                                                  {mofItem.variableIcon ?
                                                                    ( <img src={"/src/assets/cenoteando-icons/" + mofItem.variableIcon } alt={mofItem.variableIcon + '.svg'} /> ):
                                                                    ( <img src="/src/assets/Icons/check.svg" alt="check" /> )
                                                                  } 
                                                                { <strong>{measurements_item.value}</strong> }
                                                            </div>
                                                          ))}
                                                        </div>
                                                      }

                                                    </div>
                                                </div>
                                              )  
                                            )}
                                            </div>
                                          </div>
                                        ))
                                      )}
                                      </div>
                                    ): 
                                    (
                                      <>
                                        {mofsByThemeData && (
                                          mofsByThemeData.map((item: mofByThemeInterface, index: number) => (
                                            <div key={ 'category-' + index } className='mt-3 col-md-6'>
                                              <div className="container-blue">
                                                <p className="title-color title-weight title-size">  <img src={"/src/assets/icons/star.svg"}></img> {item.category}</p>
                                                {item && item.mofs.map((mofItem: mofInterface) => (
                                                  <div key={mofItem.id} >
                                                      <div>
                                                        {mofItem.variableRepresentation === 'TEXT' &&
                                                          (mofItem.measurements.map((measurements_item: MeasurementsInterface) => (
                                                          <div className="measurement-item">
                                                            <span className="variable-name title-color">
                                                            {mofItem.variableIcon ?
                                                              ( <img src={"/src/assets/cenoteando-icons/" + mofItem.variableIcon } alt={mofItem.variableIcon + '.svg'} /> ):
                                                              ( <img src="/src/assets/Icons/check.svg" alt="check" /> )
                                                            }
                                                            {mofItem.variableName}
                                                            </span>
                                                            { measurements_item.value != 'true' &&  measurements_item.value != 'false' &&
                                                              <span className="measurement-value"><strong>{measurements_item.value}</strong></span>
                                                            }
                                                          
                                                          </div>
                                                          ))
                                                        )}
                                                        {mofItem.variableRepresentation === 'CHECK' || mofItem.variableRepresentation === 'ICON' && (
                                                          <div className="two-column-container">
                                                            {mofItem.measurements.map((measurements_item: MeasurementsInterface, index: number) => (
                                                              <div className="two-column-item" key={index}>
                                                                  { renderIconOnCheckOption(mofItem, measurements_item.value) }
                                                                  { mofItem.variableName }
                                                              </div> 
                                                            ))}
                                                          </div>
                                                        )}

                                                        {mofItem.variableRepresentation === 'UNITS' &&
                                                          (mofItem.measurements.map((measurements_item: MeasurementsInterface) => (
                                                          <div className="measurement-item">
                                                            <span className="variable-name title-color">
                                                            {mofItem.variableIcon &&  ( <img src={"/src/assets/cenoteando-icons/" + mofItem.variableIcon } alt={mofItem.variableIcon + '.svg'} /> )} 
                                                            {mofItem.variableName}
                                                            </span>
                                                            <span className="measurement-value"><strong>{measurements_item.value} {mofItem?.variableUnits}</strong></span>
                                                          </div>
                                                          ))
                                                        )}

                                                        {mofItem.variableRepresentation === 'LIST' &&
                                                          <div className="two-column-container">
                                                            <span className="title-color"><strong>{mofItem.variableName}:</strong></span>
                                                            {mofItem.measurements.map((measurements_item: MeasurementsInterface, index: number) => (
                                                              <div className="two-column-item" key={index}>
                                                                    {mofItem.variableIcon ?
                                                                      ( <img src={"/src/assets/cenoteando-icons/" + mofItem.variableIcon } alt={mofItem.variableIcon + '.svg'} /> ):
                                                                      ( <img src="/src/assets/Icons/check.svg" alt="check" /> )
                                                                    } 
                                                                  { <strong>{measurements_item.value}</strong> }
                                                              </div>
                                                            ))}
                                                          </div>
                                                        }

                                                      </div>
                                                  </div>
                                                )  
                                              )}
                                              </div>
                                            </div>
                                          ))
                                        )}
                                      </>
                                    )}
                                  </>
                                }
                               
                                {/*{content[theme]}*/}
                              </div>
                              )}
                            </div>
                          ))}

                          {/*BIBLIOGRAPHY*/}
                          <div
                              key='bibliography-tab-content'
                              className={tabController === `custom-tabs-bibliography-tab` ? "tab-pane fade show active" : "tab-pane fade"}
                              id={`custom-tabs-bibliography-content`}
                              role="tabpanel"
                              aria-labelledby={`custom-tabs-bibliography-tab`}
                            >
                              <BibliographyTab referenceList={cenoteData.references}></BibliographyTab>
                          </div>
                            {/*INDICATORS*/}
                          <div
                              key='indicators-tab-content'
                              className={tabController === `custom-tabs-indicators-tab` ? "tab-pane fade show active" : "tab-pane fade"}
                              id={`custom-tabs-indicators-content`}
                              role="tabpanel"
                              aria-labelledby={`custom-tabs-indicators-tab`}
                            >
                              <IndicatorsTab></IndicatorsTab>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <UpdateMof
                cenoteId={id}
                theme={theme}
                showModal={showUpdateMofModal}
                handleToggleModal={handleUpdateMofToggleModal}
                refetch={refetchCenoteById}
              ></UpdateMof>

              <AddImages
                id={id}
                showModal={showAddImageModal}
                handleToggleModal={handleAddImageToggleModal}
                refetch={refetchMofByTheme}
              ></AddImages>
            </section>
          </>
      )}
      </DashboardData>
    </div>
  );
};




