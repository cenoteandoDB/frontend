import React, {useEffect, useState} from "react";
import {DashboardData} from "../../Dashboard/DashboardData";
import {useParams} from 'react-router-dom';
import {Gallery} from "../../../Components/Gallery/Gallery";
import "./CenoteProfile.css";
import {ClipLoader} from "react-spinners";
import {
  getCenoteById,
  getCenoteData,
  getCenotePhotos,
  getCenoteSpecies
} from "../../../graphql/Cenotes/CenotesCustomHooks";
import {ToastContainer} from "react-toastify";
import {GeomorphologyTab} from './GeomorphologyTab';
import {CenoteMofInterface, MeasurementsInterface, MofInterface,} from "../../../Types/CenotesTypes";
import MapSelector from "../../../Components/Utils/mapSelector";
import {BibliographyTab} from "./BibliographyTab";
import {IndicatorsTab} from "./IndicatorsTab";
import {WaterTab} from "./WaterTab";
import {AddImages} from "../../../Components/Modals/AddImages";
import {EditMofs} from "../../../Components/Modals/EditMofs";
import {ThemeIconEnum} from "../../../graphql/Cenotes/CenoteDto.ts";
import {VariableThemeEnum} from "../../../Types/VariablesTypes.tsx";
import {BiodiversityTab} from "./BiodiversityTab.tsx";


export type ThemeMofs = {
  [category: string]: MofInterface[];
};

export const CenoteProfile = () => {

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<string>(VariableThemeEnum.IDENTIFICATION);
  const [category, setCategory] = useState<string | null>(null);
  const [themeMofs, setThemeMofs] = useState<ThemeMofs>();

  // cenote Data
  const [cenoteData, setCenoteData] = useState<any>();
  // photos
  const [cenotePhotos, setCenotePhotos] = useState([]);
  // mofs
  const [cenoteMofs, setCenoteMofs] = useState<CenoteMofInterface>();
  // species
  const [cenoteSpecies, setCenoteSpecies] = useState([]);



  //const { cenoteData, loadingData, errorData, refetchCenoteById } = useGetCenoteById(id);
  //const { themesData } = useThemes(); // ALL THEMES
  //const { themesList, themesLoading ,themesError } = useGetThemesByCenote(id); //THEMES WITH DATA - em principio posso tirar
  //const { mofsByThemeData, mofsByThemeError ,mofsByThemeLoading, refetchMofByTheme } = useGetMofByTheme(id, theme);


  const [showUpdateMofModal, setShowUpdateMofModal] = useState<boolean>(false);
  const [showAddImageModal, setShowAddImageModal] = useState<boolean>(false);
  const [tabController, setTabController] = useState("");

  const handleTabController = (tabcontroller: string, theme: string) => {
    if (handleIsThemeWithData(theme) || theme === 'bibliography' || theme === 'indicators') {
      setTheme(theme);
      setTabController(tabcontroller);
    }
  };

  const handleIsThemeWithData = (theme: string | undefined | null) => {
    if (cenoteMofs && theme) {
      return theme in cenoteMofs || theme === "tourism";
    }
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

  const handleOpenUpdateMofToggleModal = (category: string) => {
    setCategory(category)
    setShowUpdateMofModal(true);
  };


  const handleAddImageToggleModal = () => {
    setShowAddImageModal(!showAddImageModal);
  };

  const fetchCenoteData = async () => {
    try {
      const cenoteData = await getCenoteById(id);
      setCenoteData(cenoteData);
    } catch (error) {
      console.error('Error fetching centoe info:', error);
    }
  };

  const fetchCenotePhotos = async () => {
    try {
      const cenotePhotos = await getCenotePhotos(id);
      setCenotePhotos(cenotePhotos);
    } catch (error) {
      console.error('Error fetching cenote photos:', error);
    }
  };

  const fetchCenoteMofs = async () => {
    try {
      const cenoteMofs = await getCenoteData(id);
      setCenoteMofs(cenoteMofs);
      setThemeMofs(cenoteMofs[theme]);
      //console.log(cenoteMofs[theme])
    } catch (error) {
      console.error('Error fetching cenote MoFs:', error);
    }
  };

  const fetchCenoteSpecies = async () => {
    try {
      const cenoteSpecies = await getCenoteSpecies(id);
      setCenoteSpecies(cenoteSpecies);
    } catch (error) {
      console.error('Error fetching cenote species:', error);
    }
  };

  const refetchCenoteById = () => {
    setLoading(true);
    fetchCenoteData();
    fetchCenotePhotos();
    fetchCenoteMofs();
    fetchCenoteSpecies();
    setLoading(false);
  }

  // Use Effects

  useEffect(() => {
    fetchCenoteData();
    fetchCenotePhotos();
    fetchCenoteMofs();
    fetchCenoteSpecies();
    setLoading(false);
  }, []);

  const renderIconOnCheckOption = (mofItem: MofInterface, measurementValue: string) => {
    if (measurementValue === 'true' || measurementValue === '') {
      return <img src="/assets/Icons/check.svg" alt="check" />;
    } else if (measurementValue === 'false') {
      return <img src="/assets/Icons/Icon=tabler_x.svg" alt="tabler_x" />;
    } else if (measurementValue !== '') {
      return (
        <img
          src={`/assets/cenoteando-icons/${mofItem.variable.icon}`}
          alt={`${mofItem.variable.icon}.svg`}
        />
      );
    }
    return null;
  };

  const renderThemesIcons = (themeName: keyof typeof ThemeIconEnum): string => {
    return '/assets/cenoteando-icons/Icon=' + ThemeIconEnum[themeName] + '.svg';
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
                        <img src="/assets/Icons/map.svg" alt="" />
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
                            src="/assets/Icons/beach.svg"
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
                            <img src="/assets/Icons/edit.svg" alt="" />
                          </button>
                        </div>
                        <div className="col-md-2">
                          <button
                            type="submit"
                            className="btn btn-white  mt-5 float-right"
                          >
                            <img
                              src="/assets/Icons/heart.svg"
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
                              src="/assets/Icons/upload.svg"
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
                              src="/assets/Icons/trash.svg"
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
                {cenotePhotos && cenotePhotos.length ? (
                  <Gallery photoData={cenotePhotos} mainPhoto={cenoteData.mainPhoto} cenoteId={id} refetchCenoteById={refetchCenoteById}></Gallery>
                  ) : (   <img src="/assets/Images/no_image.jpg" className="react-photo-album--photo" loading="lazy" decoding="async"></img> )
                }
                <div className="pull-right float-right">
                  <a onClick={() => setShowAddImageModal(true)} className="cursor-pointer">
                    <img src="/assets/Icons/plus.svg"/>
                      Agregar Imagen
                  </a>
                </div>
                
                <div className="row mt-5">
                  <div className="col-12">
                    <div className="card card-primary card-outline card-outline-tabs">
                      <div className="card-header p-0 border-bottom-0">
                        <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                          {Object.values(VariableThemeEnum).map((theme: VariableThemeEnum, index: number) => (
                              <li className={handleIsThemeWithData(theme) ? 'nav-item' : 'nav-item disable-style'}
                                  key={theme}>
                                <a

                                    className={tabController === `custom-tabs-${index}-tab` ? "nav-link active" : "nav-link"}
                                    id={`custom-tabs-${index}-tab`}
                                    data-toggle="pill"
                                    role="tab"
                                    aria-controls={`custom-tabs-${index}-content`}
                                    aria-selected={tabController === `custom-tabs-${index}-tab`}
                                    onClick={() => handleTabController(`custom-tabs-${index}-tab`, theme)}
                                >
                                  <img className="image-center" src={`${renderThemesIcons(theme)}`}
                                       alt={`${theme} icon`}/>
                                  <br/>
                                  {theme}
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
                                <img className="image-center" src='/assets/cenoteando-icons/Icon=tabler_book-2.svg' alt='INDICATOR' />
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
                                <img className="image-center" src='/assets/cenoteando-icons/Icon=tabler_diamonds.svg' alt='INDICATOR' />
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
                                  src="/assets/Icons/arrow-right.svg"
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
                          {Object.values(VariableThemeEnum).map((theme: VariableThemeEnum, index: number) => (
                            <div
                              key={theme}
                              className={tabController === `custom-tabs-${index}-tab` ? "tab-pane fade show active" : "tab-pane fade"}
                              id={`custom-tabs-${index}-content`}
                              role="tabpanel"
                              aria-labelledby={`custom-tabs-${index}-tab`}
                            >
                              {/*BUTON EDIT*/}
                            

                              {/*DATOS*/}
                              {loading ?  (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                                  <ClipLoader loading={loading} size={50} />
                                </div>
                              ) : (
                              <div className="row">

                                {/*ADD AND EDIT VARIABLES BUTTON
                                <div className="float-right col-md-12">
                                  <a onClick={() => handleOpenUpdateMofToggleModal(true)} className="btn btn-bg-blue-round  float-right">
                                    <img src="/assets/Icons/plus.svg" className="mr-2 " />
                                    Add/Edit Variables
                                  </a>
                                </div>*/}

                                {/*CUSTOM FEATURES*/}

                                { theme == VariableThemeEnum.TOURISM &&
                                  <div className="mt-3 col-6">
                                    {
                                      cenoteData && !loading &&
                                        <MapSelector lat={cenoteData.latitude} lng={cenoteData.longitude} cenote={cenoteData.name}/>
                                    }
                                  </div>
                                }
                                { theme == VariableThemeEnum.BIODIVERSITY &&
                                  <div className="mt-3 col-6">
                                    {
                                    cenoteData && !loading &&
                                      <BiodiversityTab speciesList={cenoteSpecies}></BiodiversityTab>
                                    }
                                  </div>
                                }
                                { theme == VariableThemeEnum.GEOMORPHOLOGY &&
                                  <div className="mt-3 col-6">
                                    {
                                    cenoteData && !loading &&
                                    <GeomorphologyTab></GeomorphologyTab>
                                    }
                                  </div>
                                }
                                { cenoteMofs && theme == VariableThemeEnum.WATER &&
                                  <>
                                    { <WaterTab mofsByThemeData={cenoteMofs[VariableThemeEnum.WATER]} />}
                                  </>
                                }
                                {theme != VariableThemeEnum.WATER &&
                                  <>
                                    {handleIsThemeDoubleView(theme)  ?
                                    (
                                      <div className='mt-3 col-6'>
                                      {themeMofs &&
                                          Object.entries(themeMofs).map(([category, mofsList]) => (
                                          <div key={ 'category-' + category }>
                                            <div className={index == 0 ? "container-blue col-md-12" : "container-blue mt-3 col-md-12"}>
                                              <div className="d-flow-root">
                                                  <p className="title-color title-weight title-size float-left">  <img src={"/assets/Icons/star.svg"}></img> {category}</p>
                                                  <a className="title-color title-size float-right" onClick={() => handleOpenUpdateMofToggleModal(category)}>  <img src={"/assets/Icons/edit.svg"}/> Editar</a>
                                              </div>

                                              {mofsList && mofsList.map((mofItem: MofInterface) => (
                                                <div key={mofItem.id} >
                                                    <div>
                                                      {mofItem.variable.representation === 'TEXT' &&
                                                        (mofItem.measures.map((measurements_item: MeasurementsInterface) => (
                                                        <div className="measurement-item">
                                                          <span className="variable-name title-color">
                                                          {mofItem.variable.icon ?
                                                            ( <img src={"/assets/cenoteando-icons/" + mofItem.variable.icon } alt={mofItem.variable.icon + '.svg'} /> ):
                                                            ( <img src="/assets/Icons/check.svg" alt="check" /> )
                                                          }
                                                          {mofItem.variable.name}
                                                          </span>
                                                          { measurements_item.value != 'true' &&  measurements_item.value != 'false' &&
                                                            <span className="measurement-value"><strong>{measurements_item.value}</strong></span>
                                                          }
                                                        
                                                        </div>
                                                        ))
                                                      )}
                                                      {mofItem.variable.representation === 'CHECK' || mofItem.variable.representation === 'ICON' && (
                                                        <div className="two-column-container">
                                                          {mofItem.measures.map((measurements_item: MeasurementsInterface, index: number) => (
                                                            <div className="two-column-item" key={index}>
                                                                { renderIconOnCheckOption(mofItem, measurements_item.value) }
                                                                { mofItem.variable.name }
                                                            </div> 
                                                          ))}
                                                        </div>
                                                      )}

                                                      {mofItem.variable.representation === 'UNITS' &&
                                                        (mofItem.measures.map((measurements_item: MeasurementsInterface) => (
                                                        <div className="measurement-item">
                                                          <span className="variable-name title-color">
                                                          {mofItem.variable.icon &&  ( <img src={"/assets/cenoteando-icons/" + mofItem.variable.icon } alt={mofItem.variable.icon + '.svg'} /> )} 
                                                          {mofItem.variable.name}
                                                          </span>
                                                          <span className="measurement-value"><strong>{measurements_item.value} {mofItem?.variable.units}</strong></span>
                                                        </div>
                                                        ))
                                                      )}

                                                      {mofItem.variable.representation === 'LIST' &&
                                                        <div className="two-column-container">
                                                          <span className="title-color"><strong>{mofItem.variable.name}:</strong></span>
                                                          {mofItem.measures.map((measurements_item: MeasurementsInterface, index: number) => (
                                                            <div className="two-column-item" key={index}>
                                                                  {mofItem.variable.icon ?
                                                                    ( <img src={"/assets/cenoteando-icons/" + mofItem.variable.icon } alt={mofItem.variable.icon + '.svg'} /> ):
                                                                    ( <img src="/assets/Icons/check.svg" alt="check" /> )
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
                                        )
                                      )}
                                      </div>
                                    ): 
                                    (
                                      <>
                                        {themeMofs && (
                                            Object.entries(themeMofs).map(([category, mofsList]) => (
                                            <div key={ 'category-' + category } className='mt-3 col-md-6'>
                                              <div className="container-blue">
                                                <div className="d-flow-root">
                                                  <p className="title-color title-weight title-size float-left">  <img src={"/assets/Icons/star.svg"}></img> {category}</p>
                                                  <a className="title-color title-size float-right" onClick={() => handleOpenUpdateMofToggleModal(category)}>  <img src={"/assets/Icons/edit.svg"}/> Editar</a>
                                                </div>
                                             
                                                {mofsList && mofsList.map((mofItem: MofInterface) => (
                                                  <div key={mofItem.id} >
                                                      <div>
                                                        {mofItem.variable.representation === 'TEXT' &&
                                                          (mofItem.measures.map((measurements_item: MeasurementsInterface) => (
                                                          <div className="measurement-item">
                                                            <span className="variable-name title-color">
                                                            {mofItem.variable.icon ?
                                                              ( <img src={"/assets/cenoteando-icons/" + mofItem.variable.icon } alt={mofItem.variable.icon + '.svg'} /> ):
                                                              ( <img src="/assets/Icons/check.svg" alt="check" /> )
                                                            }
                                                            {mofItem.variable.name}
                                                            </span>
                                                            { measurements_item.value != 'true' &&  measurements_item.value != 'false' &&
                                                              <span className="measurement-value"><strong>{measurements_item.value}</strong></span>
                                                            }
                                                          
                                                          </div>
                                                          ))
                                                        )}
                                                        {mofItem.variable.representation === 'CHECK' || mofItem.variable.representation === 'ICON' && (
                                                          <div className="two-column-container">
                                                            {mofItem.measures.map((measurements_item: MeasurementsInterface, index: number) => (
                                                              <div className="two-column-item" key={index}>
                                                                  { renderIconOnCheckOption(mofItem, measurements_item.value) }
                                                                  { mofItem.variable.name }
                                                              </div> 
                                                            ))}
                                                          </div>
                                                        )}

                                                        {mofItem.variable.representation === 'UNITS' &&
                                                          (mofItem.measures.map((measurements_item: MeasurementsInterface) => (
                                                          <div className="measurement-item">
                                                            <span className="variable-name title-color">
                                                            {mofItem.variable.icon &&  ( <img src={"/assets/cenoteando-icons/" + mofItem.variable.icon } alt={mofItem.variable.icon + '.svg'} /> )} 
                                                            {mofItem.variable.name}
                                                            </span>
                                                            <span className="measurement-value"><strong>{measurements_item.value} {mofItem?.variable.units}</strong></span>
                                                          </div>
                                                          ))
                                                        )}

                                                        {mofItem.variable.representation === 'LIST' &&
                                                          <div className="two-column-container">
                                                            <span className="title-color"><strong>{mofItem.variable.name}:</strong></span>
                                                            {mofItem.measures.map((measurements_item: MeasurementsInterface, index: number) => (
                                                              <div className="two-column-item" key={index}>
                                                                    {mofItem.variable.icon ?
                                                                      ( <img src={"/assets/cenoteando-icons/" + mofItem.variable.icon } alt={mofItem.variable.icon + '.svg'} /> ):
                                                                      ( <img src="/assets/Icons/check.svg" alt="check" /> )
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
                              {cenoteData &&
                                <BibliographyTab referenceList={cenoteData.references}></BibliographyTab>
                              }
                              
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
              {/*<UpdateMof
                cenoteId={id}
                theme={theme}
                showModal={showUpdateMofModal}
                handleToggleModal={handleUpdateMofToggleModal}
                refetch={refetchCenoteById}
              ></UpdateMof>*/}

              <EditMofs
                cenoteId={id}
                theme={theme}
                category={category}
                showModal={showUpdateMofModal}
                handleToggleModal={handleUpdateMofToggleModal}
                refetch={refetchCenoteById}
              ></EditMofs>


              <AddImages
                id={id}
                showModal={showAddImageModal}
                handleToggleModal={handleAddImageToggleModal}
                refetch={fetchCenoteMofs}
                refetchCenoteById={refetchCenoteById}
              ></AddImages>
            </section>
          </>
      )}
      </DashboardData>
    </div>
  );
};




