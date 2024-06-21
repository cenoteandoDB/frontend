import React, {useState, useEffect} from "react";
import { EnumsInterface } from "../../Types/UserTypes";
import { useCreateVariable, useCategories, useAcessLevel, useVariableType, useThemes, useSpheres, useOrigin } from "../../graphql/Variables/VariablesCustomHooks";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SingleModalPropsInterface } from '../../Types/UtilsTypes'
import { VariableInterface } from "../../Types/VariablesTypes";

export const CreateVariable:React.FC<SingleModalPropsInterface> = ({showModal, handleToggleModal}) => {
    const initialVariablesForm: VariableInterface = {
        id: "", category: "", accessLevel: "", cenote_count: "0", createdAt: "",description: "", firestore_id: "",
        methodology: "", name: "", origin: "", sphere: "", theme: "", timeseries: "true", type: "", units: "", updatedAt: "",
    }

    const { categoryData, categoryLoading } = useCategories();
    const { acessLevelData, acessLevelLoading} = useAcessLevel();
    const { variableTypeData, variableTypeLoading}= useVariableType();
    const { themesData, themesLoading} = useThemes()
    const { spheresData, spheresLoading} = useSpheres()
    const { originData, originLoading} = useOrigin();
    const { createVariable, loading, error, success } = useCreateVariable();
   
    const loading_ = loading || categoryLoading || acessLevelLoading || variableTypeLoading || themesLoading || spheresLoading || originLoading;
    const [variableFormData, setVariableFormData] = useState<VariableInterface>(initialVariablesForm);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVariableFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(variableFormData)
       // createVariable(variableFormData);
    };
  
    useEffect(() => {
      if (error) {
        toast.error(`Error inviting user: ${error.message}`);
        if (handleToggleModal) {
          handleToggleModal();
        }
      }
      if (success) {
        toast.success("Operación exitosa");
        if (handleToggleModal) {
          handleToggleModal();
        }
      }
      setVariableFormData(initialVariablesForm);
  }, [error, success]);
  
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
                  <h4 className="modal-title-c">Crear Variable</h4>
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
                            value={variableFormData.name}
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
                            value={variableFormData.description}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c">Categoria</label>
                            <select 
                            name="category"
                            className="form-control"
                            value={variableFormData.category}
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
                            value={variableFormData.accessLevel}
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
                            value={variableFormData.type}
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
                            value={variableFormData.theme}
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
                            value={variableFormData.sphere}
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
                            value={variableFormData.origin}
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
                            value={variableFormData.units}
                            onChange={handleChange}
                            required
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
                            value={variableFormData.methodology}
                            onChange={handleChange}
                            required
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
                      Close
                    </button>
                    <button  type="submit"  className="btn btn-primary">
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
