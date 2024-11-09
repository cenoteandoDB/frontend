import React, { ChangeEvent, useEffect, useState } from 'react'
import { useCenotes } from '../../graphql/Cenotes/CenotesCustomHooks';
import { PaginationInterface, SortInterface } from '../../Types/UserTypes';
import { CenoteInterface } from '../../Types/CenotesTypes';
import { toast } from "react-toastify";
import { CenotePermissionInputInterface, CheckVariableTmpInterface, SelectedCenotesPermissionInterface, SelectedVariableTmpInterface, ThemeCheckboxInterface, VariablesPermissionInputInterface, variablesPermissionTmpList } from '../../Types/PermisionsTypes';
import { useUpdatePermissionCenote, useUpdatePermissionVariable } from '../../graphql/Permissions/PermissionsCustomHooks';
import { useAllVariables } from '../../graphql/Variables/VariablesCustomHooks';
import { ClipLoader } from 'react-spinners';
interface PermissionProps {
    userId: string;
  }
  
export const Permisions: React.FC<PermissionProps> = ({ userId }) => {
    const initialPagination: PaginationInterface = { limit: 15, offset: 0 };
    const initialSort: SortInterface = { sortOrder: "ASC", field: "name" };
    const { cenotesData, cenotesError, cenotesLoading, searchCenoteByName } = useCenotes(initialPagination, initialSort);
    const { variables } = useAllVariables();
    const { updatePermissionCenote, setSuccessCenote } = useUpdatePermissionCenote();
    const { UpdatePermissionVariable, setSuccessVariable } = useUpdatePermissionVariable();
    const [ cenoteInput, setCenoteInput] = useState('');
    const [ selectedCenotes, setSelectedCenotes] = useState<SelectedCenotesPermissionInterface[]>([]);
    const [ showPermisionsTab, setShowPermisionsTab] = useState('Cenotes');
    const [ permissionCenoteId, setPermissionCenoteId] = useState({cenoteId: '', name: ''});
    //Manejar variables ANTES de updateVariablesMutations
    const initialVariablesPermissionTmpList: variablesPermissionTmpList = { variableList: [] };
    const [ loadVariables, setLoadVariables] = useState(false);
    const [variablesPermissionTmpList, setVariablesPermissionTmpList] = useState<variablesPermissionTmpList>(initialVariablesPermissionTmpList);
    const [selectedCheckVariableTmp, setSelectedCheckVariableTmp] = useState<CheckVariableTmpInterface | null>(null);
    const [openThemes, setOpenThemes] = useState({selectedTheme: '', isOpen: false});
    const [themeCheckboxList, setThemeCheckboxList] = useState<ThemeCheckboxInterface[]>([])
    const [canActionCheckbox, setCanActionCheckbox] = useState({canEdit: true, canDelete: true})

   
    const handleCenoteInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCenoteInput(value);
        searchCenoteByName(value);
    };
   
    const handlePushCenote = (cenoteData: CenoteInterface) => {
        // Check if cenote with the same firestore_id already exists
        const isCenoteAlreadySelected = selectedCenotes.some(
        (cenote) => cenote.cenoteId === cenoteData.firestore_id
        );
    
        if (!isCenoteAlreadySelected && cenoteData.firestore_id && cenoteData.name) {
            // If not already selected, add it to the list
            setSelectedCenotes((prevSelectedCenotes) => [
                ...prevSelectedCenotes,
                {
                    canDelete: true,
                    canEdit: true,
                    canView: true,
                    cenoteId: cenoteData.firestore_id,
                    name: cenoteData.name
                  }
            ]);
        } else {
            toast.warning("El cenote seleccionado ya existe en la lista");
            console.log("Cenote with this firestore_id already exists in the list.");
        }
        // Clear inputs
        setCenoteInput('');
        searchCenoteByName('');
    };

    const handleRemoveCenote = (firestore_id: string | undefined) => {
        setSelectedCenotes((prevSelectedCenotes) =>
        prevSelectedCenotes.filter(
            (cenote) => cenote.cenoteId !== firestore_id
        )
        );
    };

    const handleSetShowPermisionsTab = (event: React.ChangeEvent<HTMLInputElement>)  => {
        setShowPermisionsTab(event.target.value);
    };

    const handleSaveAllPermissions = async (event: React.FormEvent) => {
        event.preventDefault();
    
        // First: Save permissions for selected cenotes
        const cenotePermissionInput: CenotePermissionInputInterface = {
            userId,
            cenotes: []
        };
    
        // Collect selected cenote IDs
        const cenotes_tmp: string[] = [];
    
        // Populate cenote permissions based on selectedCenotes
        for (const cenote of selectedCenotes) {
            if (cenote && cenote.cenoteId) {
                cenotes_tmp.push(cenote.cenoteId);
                cenotePermissionInput.cenotes.push({
                    cenoteId: cenote.cenoteId,
                    canDelete: cenote.canDelete,
                    canEdit: cenote.canEdit,
                    canView: cenote.canView
                });
            }
        }
    
        try {
            // Save cenote permissions at once
            await updatePermissionCenote(cenotePermissionInput);
            setSuccessCenote(true);
            console.log("Permissions updated successfully for all selected cenotes!");
    
            // Second: Iterate over each cenote in variablesPermissionTmpList and check if it has isSaved set to true
            for (const item of variablesPermissionTmpList.variableList) {
                const isCenoteSelected = selectedCenotes.some(
                    (selectedCenote) => selectedCenote.cenoteId === item.cenoteId
                );
    
                if (item.isSaved && isCenoteSelected) {
                    // Remove from `cenotes_tmp` to avoid duplicate updates
                    if(item.cenoteId) cenotes_tmp.splice(cenotes_tmp.indexOf(item.cenoteId), 1);
    
                    // Prepare data for VariablesPermissionInputInterface
                    const variablePermissionData: VariablesPermissionInputInterface = {
                        userId,
                        cenoteId: item.cenoteId as string,
                        cenotes: item.variables.map((variable) => ({
                            variableId: variable.variableId as string,
                            canDelete: variable.canDelete ?? false, // Default to false if undefined
                            canEdit: variable.canEdit ?? false,     // Default to false if undefined
                            canView: variable.canView ?? false      // Default to false if undefined
                        }))
                    };
    
                    // Save the permissions for this cenote's variables
                    await UpdatePermissionVariable(variablePermissionData);
                    console.log(`Permissions updated successfully for variables of cenoteId: ${item.cenoteId}`);
                }
            }
    
            // Process remaining cenotes in `cenotes_tmp` without variables (null permissions)
            for (const element of cenotes_tmp) {
                const variablePermissionData: VariablesPermissionInputInterface = {
                    userId,
                    cenoteId: element,
                    cenotes: []  // or `null` if API supports it
                };
    
                await UpdatePermissionVariable(variablePermissionData);
                console.log(`Permissions updated successfully for cenoteId: ${element} without variables`);
            }
    
            // All operations successful
            toast.success("Se actualizaron todos los permisos con éxito");
    
        } catch (error) {
            toast.error("Error updating permissions for selected cenotes");
            console.error("Error updating permissions:", error);
            setSuccessCenote(false);
        }
    };
     
    const handleSubmitPermissions = async (event: React.FormEvent) => {
        event.preventDefault();
        // Prepare data to match the VariablesPermissionInputInterface
        /*const data: VariablesPermissionInputInterface = {
            userId: userId,
            cenoteId: permissionCenoteId.cenoteId,
            cenotes: variablesPermissionTmpList.variableList
            .filter((item) => item.cenoteId ===  permissionCenoteId.cenoteId) // Filter by specific cenoteId
            .flatMap((item) =>
              item.variables.map((variable) => ({
                variableId: variable.variableId,
                canDelete: variable.canDelete,
                canEdit: variable.canEdit,
                canView: variable.canView
              }))
            )
        };*/
         // Update the isSaved state for the relevant cenoteId items
        setVariablesPermissionTmpList((prevState) => ({
            variableList: prevState.variableList.map((item) =>
            item.cenoteId === permissionCenoteId.cenoteId
                ? { ...item, isSaved: true }
                : item
            )
        }));
        toast.success("Permisos personalizados para " + permissionCenoteId.name + " añadidio exitosamente");
        setPermissionCenoteId({cenoteId: '', name: ''})
      
    };

    const handleCheckboxChange = (cenoteId: string | undefined, field: 'canEdit' | 'canDelete', value: boolean) => {
        if(cenoteId){
            setSelectedCenotes((prevSelectedCenotes) =>
                prevSelectedCenotes.map((cenote) =>
                cenote.cenoteId === cenoteId ? { ...cenote, [field]: value } : cenote
            ));
        }
    };

    const handlecanActionsChange = (action: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        setCanActionCheckbox((prev) => ({
            ...prev,
            [action]: value
        }))

        setVariablesPermissionTmpList((prevState) => ({
            ...prevState,
            variableList: prevState.variableList.map((item) => {
                // Asegúrate de que sea el cenote correcto
                if (item.cenoteId === permissionCenoteId.cenoteId) {
                    return {
                        ...item,
                        variables: item.variables.map((variable) =>({
                            ...variable, [action]: value 
                        })    
                        ),
                    };
                }
                return item;
            }),
        }));

        
        const updatedList  = themeCheckboxList.map((item) => ({
            ...item,
            [action]: value
        }));
        if(updatedList){
            setThemeCheckboxList(updatedList);
        }
    }

    //VARIABLES MODULE
   
    const getCenoteById = (cenoteId: string) => {
        return selectedCenotes.find(cenote => cenote.cenoteId === cenoteId);
    };

    const isCenoteInPermissionList = (cenoteId: string | undefined): CheckVariableTmpInterface | undefined => {
        return variablesPermissionTmpList.variableList.find((item) => item.cenoteId === cenoteId);
    };
  
    const createVariablePermissions = (
        cenoteId: string,
        selectedCenote: { canDelete?: boolean; canEdit?: boolean },
        variables: Array<{ firestore_id?: string; name?: string; theme?: string; description?: string }>
    ): CheckVariableTmpInterface => {
        const variablePermissions: SelectedVariableTmpInterface[] = variables.map((variable) => ({
        canDelete: true, //selectedCenote.canDelete ?? false,
        canEdit: true, //selectedCenote.canEdit ?? false,
        canView: true,
        variableId: variable.firestore_id,
        name: variable.name,
        theme: variable.theme,
        description: variable.description,
        }));
    
        return {
        cenoteId,
        variables: variablePermissions,
        isSaved: false
        };
    };
    
    const createThemeCheckboxList = (variables: Array<{ theme?: string }>) => {
        // Filtra temas únicos
        const uniqueThemes = Array.from(new Set(variables.map((variable) => variable.theme).filter(Boolean)));
        console.log(uniqueThemes)
        // Genera la lista de temas únicos con propiedades canDelete y canEdit
        const themeList: ThemeCheckboxInterface[] = uniqueThemes.map((theme) => ({
            canDelete: true,
            canEdit: true,
            theme: theme!,
        }));
        
        setThemeCheckboxList(themeList);
        console.log(themeCheckboxList)
    };

    const handleGetVariables = (cenote_id?: string, name?: string): void => {
      
        if (!cenote_id || !name) return; // Validación temprana de los parámetros necesarios
        setLoadVariables(true)
        setPermissionCenoteId({cenoteId: cenote_id, name: name})
        // Verificar si el cenote ya está en la lista de permisos
        const existingCenote = isCenoteInPermissionList(cenote_id);
        if (existingCenote) {
            setLoadVariables(false)
            console.log(`Cargando permisos existentes para el cenote con ID ${cenote_id}`);
            setSelectedCheckVariableTmp(existingCenote); // Cargar datos al estado para uso posterior
            createThemeCheckboxList(variables)
            return;
        }
    
        const selectedCenote = getCenoteById(cenote_id); // Obtener permisos para el cenote específico
        if (!selectedCenote) {
            setLoadVariables(false)
            console.error(`No se encontró el cenote con ID ${cenote_id}.`);
            return;
        }
    
        console.log(`Permisos del cenote ${cenote_id}: canEdit=${selectedCenote.canEdit}, canDelete=${selectedCenote.canDelete}`);
    
        // Crear la nueva entrada de permisos para el cenote
        const newVariablePermissions = createVariablePermissions(cenote_id, selectedCenote, variables);
        createThemeCheckboxList(variables)
    
        // Actualizar la lista de permisos de variables en el estado
        setVariablesPermissionTmpList((prevState: variablesPermissionTmpList) => ({
        variableList: [...prevState.variableList, newVariablePermissions],
        }));
        setSelectedCheckVariableTmp(newVariablePermissions);
        
        setLoadVariables(false)
        console.log(variablesPermissionTmpList)
          // Agrupación de variables por tema
    };
    
    //CENOTES
    const renderFormForCenotesPermissions = () => {
        if (showPermisionsTab === 'Cenotes') {
          return (
            <form onSubmit={evt => handleSaveAllPermissions(evt)}>
                <div className="modal-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    
                    {selectedCenotes && (
                        <>
                            {selectedCenotes.map((cenote: SelectedCenotesPermissionInterface) => (
                                <div className="form-group col-md-12" key={cenote.cenoteId}>
                                    <label className="modal-label-c" htmlFor="exampleInputEmail1">
                                        Cenote 
                                        <a className='ml-2 text-buttons-cnt bg-tag-success cursor-pointer' onClick={() => handleRemoveCenote(cenote.cenoteId)}>Eliminar</a>
                                    </label>
                                    <input
                                    type="text"
                                    name="cenote_name"
                                    className="form-control"
                                    value={cenote.name}
                                    required
                                    />
                                     <label className='text-cnt-pgrey'>
                                        <input
                                        type="checkbox"
                                        checked={cenote.canEdit}
                                        onChange={(e) => handleCheckboxChange(cenote.cenoteId, 'canEdit', e.target.checked)}
                                        />
                                        Permitir editar datos de descriptores en todas las categorías
                                    </label><br />
                                    <label className='text-cnt-pgrey'>
                                        <input
                                        type="checkbox"
                                        checked={cenote.canDelete}
                                        onChange={(e) => handleCheckboxChange(cenote.cenoteId, 'canDelete', e.target.checked)}
                                        />
                                        Permitir eliminar datos de descriptores en todas las categorías
                                    </label><br />
                                    <label>
                                        <a className='text-buttons-cnt font-weight-normal cursor-pointer' onClick={() => handleGetVariables(cenote.cenoteId, cenote.name)}>
                                            personalizar permisos  <img src="/assets/Icons/arrow-up-right.svg" alt="" />
                                        </a>
                                    </label>
                                </div>
                            ))}
                        </>
                    )}

                    <div className="form-group col-md-12">
                        <label className="modal-label-c" htmlFor="referenced_cenotes">
                            Cenote: 
                        </label>
                        <input
                        type="text"
                        name="referenced_cenotes"
                        className="form-control"
                        value={cenoteInput}
                        onChange={handleCenoteInputChange}
                        />
                        {cenoteInput && (
                            <>
                                {cenotesLoading && <p>Loading cenotes...</p>}
                                {cenotesError && <p>Error loading cenotes: {cenotesError.message}</p>}
                                <ul className="list-group">
                                    {cenotesData.map((cenote: CenoteInterface) => (
                                        <li className="list-group-item" key={cenote.firestore_id}>
                                        {cenote.name}
                                        <a className="badge badge-primary badge-pill ml-2" onClick={() => handlePushCenote(cenote)}> <i className='fa fa-plus'></i> </a>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
                <div className="modal-footer justify-content-between">
                    <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    
                    >
                    Close 
                    </button>
                    <button  type="submit"  className="btn btn-primary" disabled={selectedCenotes.length == 0}>
                        Guardar {selectedCenotes.length}
                    </button>
                </div>
            </form>
          );
        }
        return null;
    };

    //VARIABLE
    // Handler para actualizar los permisos de una variable
    const isThemeChecked = (theme: string, field: 'canEdit' | 'canDelete'): boolean | undefined => {
        const themeItem = themeCheckboxList.find((item) => item.theme === theme);
        return themeItem ? themeItem[field] : false;
    };

    const groupByTheme = (variables: SelectedVariableTmpInterface[] | undefined) => {
        if(variables){
            return variables.reduce((acc, variable) => {
                const theme = variable?.theme;
                if (theme) {  // Verificamos que "theme" no sea undefined
                  if (!acc[theme]) {
                    acc[theme] = [];
                  }
                  acc[theme].push(variable);
                }
                return acc;
              }, {} as Record<string, SelectedVariableTmpInterface[]>);
        }
    };
    
    const toggleTheme = (theme: string) => {
        if(theme == openThemes.selectedTheme){
            setOpenThemes({selectedTheme: theme, isOpen: !openThemes.isOpen})
        } else {
            setOpenThemes({selectedTheme: theme, isOpen: true})
        }
    };

    const handleVariableCheckboxChange = (
        variableId: string | undefined,
        field: 'canView' | 'canEdit' | 'canDelete',
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.checked;
        console.log(value)
        if (variableId) {
            setVariablesPermissionTmpList((prevState) => ({
                ...prevState,
                variableList: prevState.variableList.map((item) => {
                    // Asegúrate de que sea el cenote correcto
                    if (item.cenoteId === permissionCenoteId.cenoteId) {
                        return {
                            ...item,
                            variables: item.variables.map((variable) =>
                                variable.variableId === variableId
                                    ? { ...variable, [field]: value }
                                    : variable
                            ),
                        };
                    }
                    return item;
                }),
            }));
        }
    };

    const handleThemeCheckboxChange = (
        theme: string | undefined,
        field: 'canView' | 'canEdit' | 'canDelete',
        event: ChangeEvent<HTMLInputElement> | null
    ) => {
       
        if (theme && event) {
            const value = event.target.checked;
            setThemeCheckboxList((prevList) =>
                prevList.map((item) =>
                    item.theme === theme ? { ...item, [field]: value } : item
                )
            );
            setVariablesPermissionTmpList((prevState) => ({
                ...prevState,
                variableList: prevState.variableList.map((item) => {
                    // Asegúrate de que sea el cenote correcto
                    if (item.cenoteId === permissionCenoteId.cenoteId) {
                        return {
                            ...item,
                            variables: item.variables.map((variable) =>
                                variable.theme === theme
                                    ? { ...variable, [field]: value }
                                    : variable
                            ),
                        };
                    }
                    return item;
                }),
            }));
        }
    };
    
    const renderFormForVariablesPermission = () => {
        if (!selectedCheckVariableTmp) return null;
        const existingCenote = isCenoteInPermissionList(permissionCenoteId.cenoteId)
        const groupedVariables = groupByTheme(existingCenote?.variables);
        console.log(groupedVariables)
        return (
            <form onSubmit={evt => handleSubmitPermissions(evt)}>
                <div className="modal-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <div className='card'>
                        <div className="card-body table-responsive p-0">
                            <table className="table" >
                                <thead className="bg-color-header">
                                    <tr>
                                        <th style={{ width: '20%' }}>
                                            <input
                                            type="checkbox"
                                            checked={canActionCheckbox.canEdit}
                                            onChange={(e) => handlecanActionsChange('canEdit', e)}
                                            />Editar
                                        </th>
                                        <th style={{ width: '20%' }}>
                                            <input
                                            type="checkbox"
                                            checked={canActionCheckbox.canDelete}
                                            onChange={(e) => handlecanActionsChange('canDelete', e)}
                                            />Eliminar
                                        </th>
                                        <th style={{ width: '60%' }}>Categorías y descriptores</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedVariables && Object.keys(groupedVariables).map((theme, index) => (
                                        <React.Fragment key={index}>
                                            {/* Fila del Tema */}
                                            <tr>
                                                <td>
                                                    {/* Checkbox del Tema (Editar y Eliminar) */}
                                                    <input
                                                        type="checkbox"
                                                        checked={isThemeChecked(theme, 'canEdit')}
                                                        onChange={(e) => handleThemeCheckboxChange(theme, 'canEdit', e)}
                                                        className="checkbox-theme"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={isThemeChecked(theme, 'canDelete')}
                                                        onChange={(e) => handleThemeCheckboxChange(theme, 'canDelete', e)}
                                                        className="checkbox-theme"
                                                    />
                                                </td>
                                                <td>
                                                    <a onClick={() => toggleTheme(theme)} className="d-flex align-items-center text-cnt-label">
                                                        <strong>{theme}</strong>
                                                        <img
                                                            src="/assets/Icons/arrow-down.svg"
                                                            alt=""
                                                            style={{
                                                                transition: 'transform 0.3s',
                                                                transform: openThemes?.selectedTheme === theme && openThemes?.isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                                            }}
                                                            className="ms-2"
                                                        />
                                                    </a>
                                                </td>
                                            </tr>
            
                                            {/* Variables dentro del Tema */}
                                            {openThemes?.selectedTheme === theme && openThemes?.isOpen &&
                                                groupedVariables[theme].map((variable) => (
                                                    <tr key={variable.variableId}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                checked={variable.canEdit}
                                                                onChange={(e) =>
                                                                    handleVariableCheckboxChange(
                                                                        variable.variableId,
                                                                        'canEdit',
                                                                        e
                                                                    )
                                                                }
                                                                className='checkboxp'
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                checked={variable.canDelete}
                                                                onChange={(e) =>
                                                                    handleVariableCheckboxChange(
                                                                        variable.variableId,
                                                                        'canDelete',
                                                                        e
                                                                    )
                                                                }
                                                                className='checkboxp'
                                                            />
                                                        </td>
                                                        <td >{variable.name}</td>
                                                    </tr>
                                                ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="modal-footer justify-content-between">
                    <button type="button" className="btn btn-default" data-dismiss="modal">
                        Cerrar
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Guardar
                    </button>
                </div>
            </form>
        );
        
       
    };

    return (
        <>
            {permissionCenoteId.cenoteId == '' &&
                <div className='mx-3'>
                    <p className='text-cnt-label font-weight-bold'>Asignar permisos por:</p>
                    
                    <label className='mr-3'>
                        <input
                        type="radio"
                        value="Cenotes"
                        checked={showPermisionsTab === 'Cenotes'}
                        onChange={handleSetShowPermisionsTab}
                        />
                        Cenotes
                    </label>

                    <label className='ml-3'>
                        <input
                        type="radio"
                        value="Location"
                        checked={showPermisionsTab === 'Location'}
                        onChange={handleSetShowPermisionsTab}
                        />
                        Estado y Municipio
                    </label>

                    {renderFormForCenotesPermissions()}
                </div>
            }

            {permissionCenoteId.cenoteId != '' &&
                <div className='mx-3'>
                    <p className='text-cnt-label font-weight-normal' onClick={() => setPermissionCenoteId({cenoteId: '', name: ''})}>Regresar</p>
                    <h5 className='text-cnt-label font-weight-bold'>Permisos para Cenote {permissionCenoteId.name}</h5>  
                    {loadVariables &&
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                            <ClipLoader loading={true} size={50} />
                        </div>
                    }
                    {renderFormForVariablesPermission()}
                </div>
            }
            

            
        </>
    )
}

