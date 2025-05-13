import React, { useState } from 'react'
import { UpdateMofPropsInterface } from '../../Types/UtilsTypes'
import { useCreateMof, useGetMofByCategory, useUpdateMof } from '../../graphql/Cenotes/CenotesCustomHooks';
import { ClipLoader } from 'react-spinners';
import { createMofInterface, mofByCategoryInterface, mofInterface, updateMofInterface } from '../../Types/CenotesTypes';
import { getCurrentDate } from '../../Services/UtilsService';
import { VariableInterface } from '../../Types/VariablesTypes';
import { toast } from 'react-toastify';

export const EditMofs: React.FC<UpdateMofPropsInterface>= ({cenoteId, theme, category, showModal, handleToggleModal, refetch}) => {
    const initialCreateMofForm: createMofInterface = {
        cenoteId: cenoteId,
        timestamp:"",
        value:"",
        variableId: ""
    }

    const initialUpdateMofForm: updateMofInterface = {
        cenoteId: cenoteId,
        timestamp: "",
        oldTimestamp: "",
        value: "",
        oldValue: "",
        variableId: ""
    }

    const { mofsByCategoryData, mofsByCategoryError ,mofsByCategoryLoading, refetchMofByCategory } = useGetMofByCategory(cenoteId, category);
    const [ updateMofList, setUpdateMofList] = useState<updateMofInterface[]>([]);
    const [ createMofList, setCreateMofList] = useState<createMofInterface[]>([]);
    const { updateMofLoading, updateMof, setUpdateMofsuccess} = useUpdateMof();
    const { createMofLoading, createMof, setCreateMofsuccess} = useCreateMof();
    const [ loading, setLoading] = useState<boolean>(false);

    const handleChangeNewMeasurementsValue = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, mof_data: mofInterface) => {
            const { name, value, type } = e.target;
            const updatedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked.toString() : value.toString();
        
            // Update the state, ensuring no duplicate mof_data entries
            setUpdateMofList((prevList) => {
                const existingIndex = prevList.findIndex(item => item.variableId === mof_data.variableId);
                if (existingIndex !== -1) {
                    // Update only the value and timestamp of the existing entry
                    const updatedList = [...prevList];
                    updatedList[existingIndex] = {
                        ...updatedList[existingIndex],
                        value: updatedValue,
                        timestamp: getCurrentDate()
                    };
                    return updatedList;
                }
                // If not a duplicate, add a new entry
                return [
                    ...prevList,
                    {
                        ...initialUpdateMofForm,
                        timestamp: getCurrentDate(),
                        oldTimestamp: mof_data.measurements[mof_data.measurements.length - 1]?.timestamp || "",
                        value: updatedValue,
                        oldValue: mof_data.measurements[mof_data.measurements.length - 1]?.value || "",
                        variableId: mof_data.variableId
                    }
                ];
            });
    }

    const handleCreateNewMeasurementsValue = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, variable: VariableInterface) => {
            const { name, value, type } = e.target;
            const createValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked.toString() : value.toString();
        
            // Update the state, ensuring no duplicate mof_data entries
            setCreateMofList((prevList) => {
                const existingIndex = prevList.findIndex(item => item.variableId === variable.firestore_id);
                if (existingIndex !== -1) {
                    // Update only the value and timestamp of the existing entry
                    const createList = [...prevList];
                    createList[existingIndex] = {
                        ...createList[existingIndex],
                        value: createValue,
                        timestamp: getCurrentDate()
                    };
                    return createList;
                }
                // If not a duplicate, add a new entry
                return [
                    ...prevList,
                    {
                        ...initialCreateMofForm,
                        timestamp: getCurrentDate(),
                        value: createValue,
                        variableId: variable.firestore_id
                    }
                ];
            });
    }

    const handleSaveUpdates = async () => {
        if (updateMofList.length === 0 && createMofList.length === 0) {
            console.log("No updates to save.");
            return;
        }
        setLoading(true);
        try {
            const updatePromises = updateMofList.map((mof) => {
                if (mof.value != '') {
                    updateMof({
                        cenoteId: mof.cenoteId,
                        variableId: mof.variableId,
                        value: mof.value,
                        timestamp: mof.timestamp,
                        oldValue: mof.oldValue,
                        oldTimestamp: mof.oldTimestamp,
                    })
                }
            });
    
            const createPromises = createMofList.map(async (mof) => {
                if (mof.value != '') {
                    await createMof({
                        cenoteId: mof.cenoteId,
                        variableId: mof.variableId,
                        value: mof.value,
                        timestamp: mof.timestamp,
                    })
                }
            });
    
            // Wait for all updates and creates
            await Promise.all([...updatePromises, ...createPromises]);
            
            console.log("All updates and creates were successful.");
    
            // Refetch data and wait for completion
            if (refetchMofByCategory) {
                await refetchMofByCategory();
            }
            if(refetch) refetch();
    
            setUpdateMofList([]); // Clear update list
            setCreateMofList([]); // Clear create list
            setUpdateMofsuccess(true);
            setCreateMofsuccess(true);
    
            toast.success("Operación exitosa");
        } catch (error) {
            console.error("Error updating MOFs:", error);
            toast.error("Error saving updates");
        } finally {
            if(refetch) refetch();
            refetchMofByCategory();
            setLoading(false); // Always stop loading spinner
            if(handleToggleModal) handleToggleModal();
            
            
        }
    };
    
    const handleCancel = (closeModal: boolean = true) => {
        refetchMofByCategory();
        setUpdateMofList([]); // Clear update list
        setCreateMofList([]); // Clear create list
        if(closeModal && handleToggleModal) handleToggleModal();
    };
     
    const renderInput = (variable: VariableInterface, mof: mofInterface | null) => {
        if (!mof) {
            // Return a placeholder or empty input if mof is null or undefined
            switch (variable.variableRepresentation) {
                case 'TEXT' || 'UNITS' || 'ICON' || 'LIST':
                return (
                    <div className="form-group">
                    <label className='text_labels-inputs'>{variable.name}</label>
                    <input
                        type="text"
                        name="value"
                        className="form-control"
                        onChange={e => handleCreateNewMeasurementsValue(e,  variable) }
                    />
                    </div>
                );

                case 'CHECK':
                return (
                    <div className="form-check pl-0">
                        <input
                        type="checkbox"
                        name="value"
                        className=""
                        onChange={e => handleCreateNewMeasurementsValue(e,  variable) }
                        />
                        <label className="form-check-label text_labels-inputs">{variable.name}</label>
                    </div>
                );
             
                default:
                return ( 
                    <div className="form-group mt-2 mb-2">
                        <label className='text_labels-inputs'>{variable.name}</label>
                        <input
                            type="text"
                            name="value"
                            className="form-control"
                            onChange={e => handleCreateNewMeasurementsValue(e,  variable) }
                        />
                    </div>
                );
            }
        }
        const updatedMof = (updateMofList.length > 0) ? updateMofList.find((item) => item.variableId === mof.variableId): null;
        const displayValue = updatedMof
        ? updatedMof.value
        : mof?.measurements[mof.measurements.length - 1]?.value || "";
        const variableRepresentation = mof.variableRepresentation ? mof.variableRepresentation : 'TEXT'
       
        switch (variableRepresentation) {
            case 'TEXT' || 'UNITS' || 'ICON' || 'LIST':
            return (

                <div className="form-group">
                    <label className='text_labels-inputs'>{variable.name}</label>
                    <input
                    name="value"
                    className="form-control"
                    value={displayValue}
                    onChange={e => handleChangeNewMeasurementsValue(e,  mof)  }
                    />
                </div>
               
            );
            case 'CHECK':
            return (
                <div className="form-check pl-0">
                    <input
                    type="checkbox"
                    name="value"
                    className=""
                    checked={displayValue == 'true' ?  true : false}
                    onChange={e => handleChangeNewMeasurementsValue(e,  mof)  }
                    />
                    <label className="form-check-label text_labels-inputs">{variable.name}</label>
                </div>
               
            );
            default:
            return (
                <div className="form-group">
                    <label className='text_labels-inputs'>{variable.name}</label>
                    <input
                    name="value"
                    className="form-control"
                    value={displayValue}
                    onChange={e => handleChangeNewMeasurementsValue(e,  mof)  }
                    />
                 </div>
            );
        }
    }

    return (
    <>
        {showModal && (
            <div
                className={`modal fade ${showModal ? "show" : ""}`}
                id="modal-create-cenote"
                style={{ paddingRight: 22, display: "block" }}
                aria-modal="true"
                role="dialog"
                data-backdrop="static"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title-c">Editar {category}</h4>
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
                            {mofsByCategoryLoading || updateMofLoading || createMofLoading || loading? (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "50vh",
                                    }}
                                >
                                    <ClipLoader loading={mofsByCategoryLoading || updateMofLoading || createMofLoading} size={50} />
                                </div>
                            ) : (
                                mofsByCategoryData.map((variableItem: mofByCategoryInterface) => (
                                    <div className='mb-3' key={variableItem.variable.firestore_id}>
                                        {renderInput(variableItem?.variable, variableItem?.mof)}   
                                    </div>
                                ))
                            )}

                        </div>
                        <div className="modal-footer justify-content-between">
                            <a className="text-buttons-cn"  onClick={() => handleCancel(false)} >  <img src="/assets/Icons/trash.svg" alt="" /> Limpiar</a>

                            <div>
                                <button type="button" className="btn btn-default btn-save-white-border mr-1" onClick={() => handleCancel(true)} data-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-save ml-1"  onClick={handleSaveUpdates} disabled={updateMofList.length === 0 && createMofList.length === 0}>
                                    {updateMofLoading ? "Guardando..." : "Guardar"}
                                </button>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        )}
    </>
  )
}
