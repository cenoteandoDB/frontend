import React, { useEffect, useState } from 'react'
import {
    AccessLevelEnum,
    UpdateVariableInterface,
    VariableCategoryEnum,
    VariableOriginEnum,
    VariableRepresentationEnum,
    VariableSphereEnum,
    VariableThemeEnum,
    VariableTypeEnum
} from '../../Types/VariablesTypes';
import {
    getVariableById,
    updateVariable,
} from '../../graphql/Variables/VariablesCustomHooks';
import { IconSelector } from '../Utils/IconSelector';
import {UpdateVariablePropsInterface} from "../../Types/UtilsTypes.tsx";

export const UpdateVariable: React.FC<UpdateVariablePropsInterface> = ({id, showModal, handleToggleModal, refetch }) => {
    const initialVariablesForm: UpdateVariableInterface = {
        id: id ?? '',
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
        icon:"",
        variableRepresentation: "" };

    const [loading, setLoading] = useState(true);

    const [ variableInfo, setVariableInfo] = useState<UpdateVariableInterface>(initialVariablesForm);
    const [ isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVariableInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(id) {
            await updateVariable(id, variableInfo);
            refetch();
        }
    };
    
    const handleIconSelect = (icon: string) => {
        setVariableInfo(prev => ({ ...prev, icon: icon }));
    };

    // Use Effects

    useEffect(() => {
        if (!id) return;

        const getVariableInfoToUpdate = async (id: string | null | undefined) => {
            try {
                const variable = await getVariableById(id);
                setVariableInfo(variable as UpdateVariableInterface);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching variable:', error);
            }
        };

        getVariableInfoToUpdate(id);
    }, [id]);


    useEffect(() => {
        if (id) {
            const nonRequiredFields = ['methodology', 'units', 'description']; // List of non-required fields
            const isFormFilled = Object.entries(variableInfo).every(([key, value]) => 
                nonRequiredFields.includes(key) || value
            );
            setIsFormValid(isFormFilled);
        } else {
            setIsFormValid(false);
        }
    }, [variableInfo]);


    return (
        <div>
          {showModal && (
            <div
              className={`modal fade ${showModal ? "show" : ""}`}
              id="modal-invite-user"
              style={{ paddingRight: 22, display: "block" }}
              aria-modal="true"
              role="dialog"
              data-backdrop="static"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title-c">Actualizar Variable</h4>
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
                  <form onSubmit={evt => handleSubmit(evt)}>
                    <div className="modal-body">
               
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label className="modal-label-c" htmlFor="exampleInputPassword1">
                            Nombre
                            </label>
                            <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={variableInfo.name}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="modal-label-c" htmlFor="description">
                                Description
                            </label>
                            <input
                            type="text"
                            name="description"
                            className="form-control"
                            value={variableInfo.description}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c">Categoria</label>
                            <select 
                            name="category"
                            className="form-control"
                            value={variableInfo.category}
                            onChange={handleChange}>
                            {Object.values(VariableCategoryEnum).map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c">Nivel de acceso</label>
                            <select 
                            name="accessLevel"
                            className="form-control"
                            value={variableInfo.accessLevel}
                            onChange={handleChange}>
                            {Object.values(AccessLevelEnum).map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c">Tipo de variable</label>
                            <select 
                            name="type"
                            className="form-control"
                            value={variableInfo.type}
                            onChange={handleChange}>
                            {Object.values(VariableTypeEnum).map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c">Tema/Etiqueta</label>
                            <select 
                            name="theme"
                            className="form-control"
                            value={variableInfo.theme}
                            onChange={handleChange}>
                            {Object.values(VariableThemeEnum).map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c">Esfera</label>
                            <select 
                            name="sphere"
                            className="form-control"
                            value={variableInfo.sphere}
                            onChange={handleChange}>
                            {Object.values(VariableSphereEnum).map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c">Campo o Calculadas</label>
                            <select 
                            name="origin"
                            className="form-control"
                            value={variableInfo.origin}
                            onChange={handleChange}>
                            {Object.values(VariableOriginEnum).map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c" htmlFor="description">
                                Unidades
                            </label>
                            <input
                            type="text"
                            name="units"
                            className="form-control"
                            value={variableInfo.units}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c" htmlFor="methodology">
                                Metodologia
                            </label>
                            <input
                            type="text"
                            name="methodology"
                            className="form-control"
                            value={variableInfo.methodology}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label className="modal-label-c">Representación</label>
                            <select 
                            name="variableRepresentation"
                            className="form-control"
                            value={variableInfo.variableRepresentation}
                            onChange={handleChange}>
                            {Object.values(VariableRepresentationEnum).map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group col-md-10">
                            <label className="modal-label-c">Icono</label>
                            <div>
                                
                                {variableInfo.icon && (
                                    <>
                                        <h6>Vista previa del icono seleccionado:</h6>
                                        <img src={"/assets/cenoteando-icons/" + variableInfo.icon} alt="selected-icon" width="50" height="50" />
                                        <a onClick={() => handleIconSelect("")} className='text-danger cursor-pointer'>Remove</a>
                                    </>
                                )}
                            </div>
                            <IconSelector
                                selectedIcon={variableInfo.icon}
                                onSelectIcon={handleIconSelect}
                            />
                        </div>
                        
        
                    </div>
                 
                    </div>
                    <div className="modal-footer justify-content-between">
                      <button
                        type="button"
                        className="btn btn-default"
                        data-dismiss="modal"
                        onClick={handleToggleModal}
                      >
                        Cerrar
                      </button>
                      <button  type="submit" disabled={!isFormValid || loading} className="btn btn-primary">
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}
