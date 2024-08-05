import React, { useEffect, useState } from 'react'
import { UpdateMofPropsInterface } from '../../Types/UtilsTypes'
import { useGetCategoryByTheme, useGetMofByCenoteAndVariable, useGetVariablesByCategory, useVariablesRepresentation } from '../../graphql/Variables/VariablesCustomHooks'
import { UpdateVariableInterface, VariableInterface } from '../../Types/VariablesTypes';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { createMofInterface, MeasurementsInterface, updateMofInterface } from '../../Types/CenotesTypes';
import { getCurrentDate } from '../../Services/UtilsService';
import { useCreateMof, useUpdateMof } from '../../graphql/Cenotes/CenotesCustomHooks';

export const UpdateMof: React.FC<UpdateMofPropsInterface>= ({cenoteId, theme, showModal, handleToggleModal, refetch}) => {
    const initialVariablesForm: UpdateVariableInterface = {
        firestore_id: "",
        name: "",
        description: "",
        category: "",
        accessLevel: "",
        type: "",
        theme: "",
        sphere: "",
        origin: "",
        units: "",
        methodology: "",
        timeseries: true,
        icon: "",
        variableRepresentation:"" };

    const [variableSelected, setVariableSelected] = useState<UpdateVariableInterface>(initialVariablesForm);
    const initialCreateMofForm: createMofInterface = {
        cenoteId: cenoteId,
        timestamp:"",
        value:"",
        variableId: variableSelected.firestore_id
    }
    const initialUpdateMofForm: updateMofInterface = {
        cenoteId: cenoteId,
        timestamp: "",
        oldTimestamp: "",
        value: "",
        oldValue: "",
        variableId: variableSelected.firestore_id
    }
    const [ category, setCategory] = useState('')
    const { categoriesData, categoriesLoading} = useGetCategoryByTheme(theme)
    const { variableByCategoryData, variableByCategoryLoading, refetchVariablesByCategory} = useGetVariablesByCategory(category);
    const { MofByVariableAndCenoteData, MofByVariableAndCenoteError, MofByVariableAndCenoteLoading, refetchMofByVariableAndCenote} = useGetMofByCenoteAndVariable(cenoteId, variableSelected.firestore_id);
    const { createMofSuccess, createMofError, createMofLoading, createMof, setCreateMofsuccess} = useCreateMof();
    const { updateMofSucces, updateMofError, updateMofLoading, updateMof, setUpdateMofsuccess} = useUpdateMof();
    const [ categoryAcordionTab, setCategoryAcordionTab] = useState<string>("tab-0")
    const [ variableAcordionTab, setVariableAcordionTab] = useState<string>("")
    const [ measurementsInput, setMeasurementsInput] = useState<string>("")
    const [addRecord, setAddRecord] = useState<boolean>(false)
    const [isValid, setIsValid] = useState(false);
    const [ createMofFormData, setCreateMofFormData] = useState<createMofInterface>(initialCreateMofForm);
    const [ updateMofFormData, setUpdateMofFormData] = useState<updateMofInterface>(initialUpdateMofForm);
    const _loading = categoriesLoading;
    const noData = !categoriesLoading && (!categoriesData || categoriesData.length === 0);

    const handleCreateMof = async (e: React.FormEvent) => {
        e.preventDefault();
        await createMof(createMofFormData);
    
    };

    const handleUpdateMof = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateMof(updateMofFormData);
    
    };

    const handleChangeMofValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
          const { checked } = e.target as HTMLInputElement;
          setCreateMofFormData(prev => ({
            ...prev,
            [name]: checked.toString(),
          }));
        } else {
          setCreateMofFormData(prev => ({
            ...prev,
            [name]: value,
          }));
        }
    }

    const handleSetCategoryAccordionTab = (accordionName: string, category: string) => {
        setCategory(category);
        if(categoryAcordionTab == accordionName){
            setCategoryAcordionTab("")
        } else {
            setCategoryAcordionTab(accordionName)
        }
    }

    const handleSetVariableAccordionTab = (accordionName: string, variable: VariableInterface) => {
        handleCancelNewMeasurementsValue();
        setCreateMofFormData(prev => ({...prev, value: ''}));
        setUpdateMofFormData(prev => ({...prev, value: ''}));
        if(variableAcordionTab == accordionName){
            setVariableAcordionTab("")
            setVariableSelected(initialVariablesForm)
        } else {
        
    
            setVariableAcordionTab(accordionName)
            const timestamp = getCurrentDate(); 
            setCreateMofFormData(prev => ({ ...prev, variableId: variable.firestore_id, timestamp: timestamp }));
            setVariableSelected({
                firestore_id: variable.firestore_id,
                name: variable.name,
                description: variable.description,
                category: variable.category,
                accessLevel: variable.accessLevel,
                type: variable.type,
                theme: variable.theme,
                sphere: variable.sphere,
                origin: variable.origin,
                units: variable.units,
                methodology: variable.methodology,
                timeseries: true,
                icon: variable.icon,
                variableRepresentation: variable.variableRepresentation
            })
        }
     
    }

    const handleSetMeasurementsValues = (oldValues: MeasurementsInterface, index: string) => {
        setMeasurementsInput(index)
        setUpdateMofFormData(prev =>({...prev, oldValue: oldValues.value, oldTimestamp: oldValues.timestamp, value:oldValues.value,}))
    }

    const handleChangeNewMeasurementsValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
          const { checked } = e.target as HTMLInputElement;
          setUpdateMofFormData(prev => ({
            ...prev,
            [name]: checked.toString(),
            timestamp: getCurrentDate()
          }));
        } else {
            setUpdateMofFormData(prev => ({
            ...prev,
            [name]: value.toString(),
            timestamp: getCurrentDate()
          }));
        }
    }

    const handleCancelNewMeasurementsValue = () => {
        setMeasurementsInput('');
        setUpdateMofFormData(prev =>({...prev, oldValue: '', oldTimestamp: '', value: '', timestamp: ''}))
    }

    useEffect(() => {
        if (createMofError) {
            toast.error('La operación no se pudo completar, inténtelo nuevamente.')
        }
        if (createMofSuccess) {
            toast.success("Operación exitosa");
            if(refetch) refetch();
            refetchMofByVariableAndCenote();
            //setVariableAcordionTab('');
            setMeasurementsInput('');
            setCreateMofsuccess(false);
            if(addRecord){
                setAddRecord(false)
            }
            //setVariableSelected(initialVariablesForm)
         
        }
    }, [createMofError, createMofSuccess]);

    useEffect(() => {
        if (updateMofError) {
            toast.error('La operación no se pudo completar, inténtelo nuevamente.')
        }
        if (updateMofSucces) {
            toast.success("Operación exitosa");
            if(refetch) refetch();
            refetchMofByVariableAndCenote();
            //setVariableAcordionTab('');
            //setVariableSelected(initialVariablesForm)
            setMeasurementsInput('');
            setUpdateMofsuccess(false);
        }
    }, [updateMofError, updateMofSucces]);

    useEffect(() => {
        refetchMofByVariableAndCenote();
    }, [variableSelected, refetchMofByVariableAndCenote]);

    useEffect(() => {
        if(MofByVariableAndCenoteData && !MofByVariableAndCenoteError) {
            setUpdateMofFormData(prev => ({...prev, cenoteId: MofByVariableAndCenoteData.cenoteId,  variableId: MofByVariableAndCenoteData.variableId}))
        }
    }, [MofByVariableAndCenoteData, MofByVariableAndCenoteError]);

    useEffect(() => {
        if (!categoriesLoading && categoriesData && categoriesData.length > 0) {
         setCategory(categoriesData[0]);
        }
      }, [categoriesLoading, categoriesData]);

    useEffect(() => {
        refetchVariablesByCategory();
    }, [category]);
    
    useEffect(() => {
        const checkIfFormIsValid = () => {
          const { cenoteId, timestamp, oldTimestamp, value, oldValue, variableId } = updateMofFormData;
          return cenoteId && timestamp && oldTimestamp && value && oldValue && variableId;
        };
        
        setIsValid(checkIfFormIsValid() ? true : false);
      }, [updateMofFormData]);


    const renderInputCreateMofField = () => {
        switch (variableSelected.variableRepresentation) {
            case 'TEXT' || 'LIST':
            return (
                <textarea
                name="value"
                className="form-control"
                value={createMofFormData.value}
                onChange={handleChangeMofValue}
                />
            );
            case 'UNITS':
            return (
                <input
                type="number"
                name="value"
                className="form-control"
                value={createMofFormData.value}
                onChange={handleChangeMofValue}
                />
            );
            case 'ICON':
            return (
                <input
                type="text"
                name="value"
                className="form-control"
                value={createMofFormData.value}
                onChange={handleChangeMofValue}
                />
            );
            case 'CHECK':
            return (
                <input
                    type="checkbox"
                    name="value"
                    className="form-control"
                    checked={createMofFormData.value == 'true' || createMofFormData.value == '' ?  true : false}
                    onChange={handleChangeMofValue}
                />
                );
            default:
            return (
                <input
                type="text"
                name="value"
                className="form-control"
                value={createMofFormData.value}
                onChange={handleChangeMofValue}
                />
            );
        }
    };

    const renderInputUpdateMofField = () => {
        switch (variableSelected.variableRepresentation) {
            case 'TEXT':
            return (
                <textarea
                name="value"
                className="form-control"
                value={updateMofFormData.value}
                onChange={handleChangeNewMeasurementsValue}
                />
            );
            case 'UNITS':
            return (
                <input
                type="number"
                name="value"
                className="form-control"
                value={updateMofFormData.value}
                onChange={handleChangeNewMeasurementsValue}
                />
            );
            case 'ICON'  || 'LIST':
            return (
                <input
                type="text"
                name="value"
                className="form-control"
                value={updateMofFormData.value}
                onChange={handleChangeNewMeasurementsValue}
                />
            );
            case 'CHECK':
            return (
                <input
                    type="checkbox"
                    name="value"
                    className="form-control"
                    checked={updateMofFormData.value == 'true' ?  true : false}
                    onChange={handleChangeNewMeasurementsValue}
                />
                );
            default:
            return (
                    <input
                    type="text"
                    name="value"
                    className="form-control"
                    value={updateMofFormData.value}
                    onChange={handleChangeNewMeasurementsValue}
                />
            );
        }
    };


    return (
        <div>
        {showModal && (
          <div
            className={`modal fade ${showModal ? "show" : ""}`}
            id="modal-create-cenote"
            style={{ paddingRight: 22, display: "block" }}
            aria-modal="true"
            role="dialog"
            data-backdrop="static"
          >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title-c">Variables de {theme} - {variableSelected.name}</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleToggleModal}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">

                {_loading ?  ( 
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                      <ClipLoader loading={_loading} size={50} />
                    </div>
                  ) : noData ? (
                    <p>No se encontraron Variables</p>
                  ) : (
                    <>
                        <div id="accordion">
                            { categoriesData && categoriesData.map((item: string, index: number)=>(
                                <div className="card" key={index}>
                                    <div className="card-header pt-1 pb-1">
                                        <h4 className="card-title w-100">
                                            <a onClick={() => handleSetCategoryAccordionTab('tab-' + index, item)} className={categoryAcordionTab == 'tab-' + index ? "d-block w-100": "d-block w-100 collapsed"} data-toggle="collapse" href={"#tab-" + index} aria-expanded={categoryAcordionTab == 'tab-' + index ? "true" : "false"}>
                                                <label className='tag-gray-round'>{item}</label>
                                            </a>
                                        </h4>
                                    </div>
                                    <div id={'tab-' + index} className={categoryAcordionTab == 'tab-' + index ? "collapse show" : "collapse"} data-parent="#accordion" style={{}}>
                                        <div className="card-body">
                                        {variableByCategoryLoading &&
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <ClipLoader loading={variableByCategoryLoading} size={50} />
                                            </div>
                                        }
                                        { variableByCategoryData && variableByCategoryData.map((variableItem: VariableInterface)=>(
                                            <div className="card" key={variableItem.firestore_id}>
                                                <div className="card-header pt-1 pb-1">
                                                    <h4 className="card-title w-100">
                                                        <a onClick={() => handleSetVariableAccordionTab(variableItem.firestore_id, variableItem)} className={variableAcordionTab == variableItem.firestore_id ? "d-block w-100": "d-block w-100 collapsed"} data-toggle="collapse" href={"#" + variableItem.firestore_id} aria-expanded={variableAcordionTab == variableItem.firestore_id ? "true" : "false"}>
                                                            {variableItem.name}
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div id={variableItem.firestore_id} className={variableAcordionTab == variableItem.firestore_id ? "collapse show" : "collapse"} data-parent="#accordion" style={{}}>
                                                    <div className="card-body">
                                                        <strong>Descripción: </strong> {variableItem.description}  <strong>{variableItem?.units ? ' - ' + variableItem?.units : '' }</strong>
                                                        <hr />
                                                        { MofByVariableAndCenoteLoading ? (
                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <ClipLoader loading={MofByVariableAndCenoteLoading} size={50} />
                                                            </div>
                                                            ): (
                                                                <>
                                                                    {/*CREATE MOF*/}
                                                                    { !MofByVariableAndCenoteData &&
                                                                        <>
                                                                                {createMofLoading?  ( 
                                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                                                                        <ClipLoader loading={createMofLoading} size={50} />
                                                                                    </div>
                                                                                ) : (
                                                                                    <div>
                                                                                    <form onSubmit={evt => handleCreateMof(evt)}>
                                                                                        <div className="card-header">
                                                                                                DEFINIR UN NUEVO VALOR PARA : {variableSelected.name}
                                                                                            </div>
                                                                                            <div className="card-body">
                                                                                                {renderInputUpdateMofField()}
                                                                                            </div>
                                                                                            <div className="card-footer">
                                                                                                <button  type="submit"  disabled={!isValid} className="mt-3 mr-2 btn btn-primary">
                                                                                                    Guardar
                                                                                                </button>
                                                                                            </div>
                                                                                    </form>
                                                                                </div>
                                                                                )
                                                                            }
                                                                        </>
                                                                    }
                                                                    {/*UPDATE MOF*/}
                                                                    { MofByVariableAndCenoteData &&
                                                                        <>
                                                                        {updateMofLoading?  ( 
                                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <ClipLoader loading={MofByVariableAndCenoteLoading} size={50} />
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                          
                                                                            {!addRecord ? 
                                                                                (      
                                                                                <form onSubmit={evt => handleUpdateMof(evt)}>
                                                                                    <div className="row">
                                                                                        <ul className="list-group">
                                                                                            {MofByVariableAndCenoteData.measurements.map((itemMensurement: MeasurementsInterface, index: string) => 
                                                                                                <>
                                                                                                    <li key={'measurements'+ index} className="list-group-item d-flex justify-content-between align-items-center">
                                                                                                    
                                                                                                        {measurementsInput == 'measurements'+ index ?
                                                                                                        ( 
                                                                                                            <div>
                                                                                                                <div className="card-header">
                                                                                                                    DEFINIR UN NUEVO VALOR PARA : {variableSelected.name}
                                                                                                                    <a  onClick={() => handleCancelNewMeasurementsValue()}>
                                                                                                                    <span className=" ml-3 badge badge-default badge-pill"> 
                                                                                                                            <img src="/src/assets/Icons/close.svg" alt="" /> 
                                                                                                                        </span>
                                                                                                                    </a>
                                                                                                                </div>
                                                                                                                <div className="card-body">
                                                                                                                    {renderInputUpdateMofField()}
                                                                                                                </div>
                                                                                                                <div className="card-footer">
                                                                                                                    <button  type="submit"  disabled={!isValid} className="mt-3 mr-2 btn btn-primary">
                                                                                                                        Actualizar
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )
                                                                                                        : (
                                                                                                            <div>
                                                                                                            
                                                                                                                    <a  onClick={() => handleSetMeasurementsValues(itemMensurement, 'measurements'+ index)}>
                                                                                                                        {itemMensurement.value}
                                                                                                                        <span className=" ml-3 badge badge-default badge-pill cursor-pointer"> 
                                                                                                                            <img src="/src/assets/Icons/edit.svg" alt="" /> 
                                                                                                                        </span>
                                                                                                                    </a>
                                                                                                            </div>
                                                                                                        )
                                                                                                        } 
                                                                                                    </li>
                                                                                                    
                                                                                                
                                                                                                </>
                                                                                            )}
                                                                                        </ul>
                                                                                      
                                                                                    </div>
                                                                                    <hr />
                                                                                    <button  type="button" onClick={() => setAddRecord(true)} className="btn btn-outline-info  btn-sm">
                                                                                        <img src="/src/assets/Icons/plus.svg" alt="" /> Agregar Registro
                                                                                    </button>
                                                                                </form>):
                                                                            (
                                                                            <div>
                                                                                <form onSubmit={evt => handleCreateMof(evt)}>
                                                                                    <div className="card-header">
                                                                                            DEFINIR UN NUEVO VALOR PARA : {variableSelected.name}
                                                                                            <a  onClick={() => setAddRecord(false)}>
                                                                                            <span className=" ml-3 badge badge-default badge-pill"> 
                                                                                                    <img src="/src/assets/Icons/close.svg" alt="" /> 
                                                                                                </span>
                                                                                            </a>
                                                                                        </div>
                                                                                        <div className="card-body">
                                                                                            {renderInputUpdateMofField()}
                                                                                        </div>
                                                                                        <div className="card-footer">
                                                                                            <button  type="submit"  disabled={!isValid} className="mt-3 mr-2 btn btn-primary">
                                                                                                Guardar
                                                                                            </button>
                                                                                        </div>
                                                                                </form>
                                                                            </div>
                                                                            )

                                                                            }
                                                                            </>
                                                                     
                                                                        )}
                                                                        </>
                                                                    }
                                                                </>
                                                            )
                                                        }   
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                            )}
                        </div>  
                    </>
                  )}
               
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}