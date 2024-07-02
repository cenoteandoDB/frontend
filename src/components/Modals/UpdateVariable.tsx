import React, { useEffect, useState } from 'react'
import { UpdateVariableInterface } from '../../Types/VariablesTypes';
import { UpdatePropsInterface } from '../../Types/UtilsTypes';
import { useAcessLevel, useCategories, useGetVariableById, useOrigin, useSpheres, useThemes, useUpdateVariable, useVariableType } from '../../graphql/Variables/VariablesCustomHooks';
import { toast } from 'react-toastify';
import { EnumsInterface } from '../../Types/UserTypes';

export const UpdateVariable: React.FC<UpdatePropsInterface> = ({id, showModal, handleToggleModal, refetch }) => {
    const initialVariablesForm: UpdateVariableInterface = {
        id: id,
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
        timeseries: true };
    const { data, loading, error, updateVariable } = useUpdateVariable();
    const { variableData, loadingData, errorData } = useGetVariableById(id);
    const [ variableInfo, setVariableInfo] = useState<UpdateVariableInterface>(initialVariablesForm);
    const [ isFormValid, setIsFormValid] = useState(false);
    const { categoryData, categoryLoading } = useCategories();
    const { acessLevelData, acessLevelLoading} = useAcessLevel();
    const { variableTypeData, variableTypeLoading}= useVariableType();
    const { themesData, themesLoading} = useThemes()
    const { spheresData, spheresLoading} = useSpheres()
    const { originData, originLoading} = useOrigin();
    const loading_ = loading || categoryLoading || acessLevelLoading || variableTypeLoading 
    || variableTypeLoading || themesLoading || spheresLoading || originLoading;

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
            console.log(variableInfo)
            await updateVariable(id, variableInfo);
        }
    };

    useEffect(() => {
        if (variableData && !loadingData) {
            setVariableInfo({
                id: id,
                name: variableData.name,
                description: variableData.description,
                category: variableData.category,
                accessLevel: variableData.accessLevel,
                type: variableData.type,
                theme: variableData.theme,
                sphere: variableData.sphere,
                origin: variableData.origin,
                units: variableData.units,
                methodology: variableData.methodology,
                timeseries: true 
            });
        } else {
            setVariableInfo(initialVariablesForm);
        }
        if(errorData){
            toast.error('El registro no existe o no tiene un identificador')
        }
    }, [variableData, errorData]);

    useEffect(() => {
        if (error) {
          toast.error('La operación no se pudo completar, inténtelo nuevamente.')
          if (handleToggleModal) {
            handleToggleModal();
          }
        }
        if(data && !error){
          toast.success('Registro Actualizado Exitosamente');
          if (handleToggleModal) {
            handleToggleModal();
            if (refetch) refetch();
          }
        } 
    }, [data, error])

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
    }, [id, variableInfo]);


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
                            {categoryData && categoryData.map((item: EnumsInterface) => (
                                <option key={item.name}  value={item.name}>{item.name}</option>
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
                            {acessLevelData && acessLevelData.map((item: EnumsInterface) => (
                                <option key={item.name}  value={item.name}>{item.name}</option>
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
                            {variableTypeData && variableTypeData.map((item: EnumsInterface) => (
                                <option key={item.name}  value={item.name}>{item.name}</option>
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
                            {themesData && themesData.map((item: EnumsInterface) => (
                                <option key={item.name}  value={item.name}>{item.name}</option>
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
                            {spheresData && spheresData.map((item: EnumsInterface) => (
                                <option key={item.name}  value={item.name}>{item.name}</option>
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
                            {originData && originData.map((item: EnumsInterface) => (
                                <option key={item.name}  value={item.name}>{item.name}</option>
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
