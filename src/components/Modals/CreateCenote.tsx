import React, { useEffect, useState } from 'react'
import { SingleModalPropsInterface } from '../../Types/UtilsTypes'
import { CreateCenoteInterface } from '../../Types/CenotesTypes'
import { useCenoteTypes, useCreateCenote } from '../../graphql/Cenotes/CenotesCustomHooks'
import { toast } from 'react-toastify'
import { EnumsInterface } from '../../Types/UserTypes'

export const CreateCenote: React.FC<SingleModalPropsInterface> = ({showModal, handleToggleModal, refetch}) => {
    const initialCenotesForm: CreateCenoteInterface = {
        name: "",
        municipality: "",
        state: "",
        touristic: false,
        type: "",
        longitude: "",
        latitude: "",
    }
    const { cenoteTypesData, cenoteTypesLoading } = useCenoteTypes();
    const { createCenote, loading, error, success } = useCreateCenote();
    const [ isFormValid, setIsFormValid] = useState(false);
    const [ cenoteFormData, setCenoteFormData] = useState<CreateCenoteInterface>(initialCenotesForm);

    useEffect(() => {
        if (!cenoteTypesLoading && cenoteTypesData && cenoteTypesData.length > 0) {
          setCenoteFormData(prev => ({ ...prev, type: cenoteTypesData[0].name }));
        }
    }, [cenoteTypesLoading, cenoteTypesData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setCenoteFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    
    const handleChecked = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const parsedValue = value === 'true' ? true : false;
        setCenoteFormData((prevState) => ({
          ...prevState,
          [name]: parsedValue,
        }));
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        createCenote(cenoteFormData);
    };
  
    useEffect(() => {
      if (error) {
        toast.error('La operación no se pudo completar, inténtelo nuevamente.')
        if (handleToggleModal) {
          handleToggleModal();
        }
      }
      if (success) {
        toast.success("Operación exitosa");
        if(refetch){
          refetch()
        }
        if (handleToggleModal) {
          handleToggleModal();
        }
        setCenoteFormData(initialCenotesForm);
      }
    }, [error, success]);

    useEffect(() => {
        const nonRequiredFields = ['touristic']; // List of non-required fields
        const isFormFilled = Object.entries(cenoteFormData).every(([key, value]) => 
            nonRequiredFields.includes(key) || value
        );
        setIsFormValid(isFormFilled);
    }, [cenoteFormData]);


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
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title-c">Crear Cenote</h4>
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
                              value={cenoteFormData.name}
                              onChange={handleChange}
                              required
                              />
                          </div>
                          <div className="form-group col-md-6">
                              <label className="modal-label-c" htmlFor="state">
                                  Estado
                              </label>
                              <input
                              type="text"
                              name="state"
                              className="form-control"
                              value={cenoteFormData.state}
                              onChange={handleChange}
                              required
                              />
                          </div>
                          <div className="form-group col-md-6">
                              <label className="modal-label-c" htmlFor="municipality">
                                  Municipio
                              </label>
                              <input
                              type="text"
                              name="municipality"
                              className="form-control"
                              value={cenoteFormData.municipality}
                              onChange={handleChange}
                              required
                              />
                          </div>
                          <div className="form-group col-md-6">
                              <label className="modal-label-c">Tipo</label>
                              <select 
                              name="type"
                              className="form-control"
                              value={cenoteFormData.type}
                              onChange={handleChange}>
                              {cenoteTypesData && cenoteTypesData.map((item: EnumsInterface) => (
                                  <option key={item.name}  value={item.name}>{item.name}</option>
                              ))}
                              </select>
                          </div>
                          <div className="form-group col-md-2">
                            <label className="modal-label-c" htmlFor="touristic">Touristic</label>
                            <div>
                                <div className='form-check'>
                                    <input
                                        type="radio"
                                        className='form-check-input'
                                        name="touristic"
                                        value="false"
                                        checked={cenoteFormData.touristic === false}
                                        onChange={handleChecked}
                                        />
                                    <label className='form-check-label'>No</label>
                                </div>
                                <div className='form-check'>
                                    <input
                                        type="radio"
                                        className='form-check-input'
                                        name="touristic"
                                        value="true"
                                        checked={cenoteFormData.touristic === true}
                                        onChange={handleChecked}
                                        />
                                    <label className='form-check-label'>Si </label>
                                </div>
                               
                            </div>
                          </div>
                        
                          <div className="form-group col-md-5">
                              <label className="modal-label-c" htmlFor="latitude">
                                  Latitud
                              </label>
                              <input
                              type="text"
                              name="latitude"
                              className="form-control"
                              value={cenoteFormData.latitude}
                              onChange={handleChange}
                              required
                              />
                          </div>
                          <div className="form-group col-md-5">
                              <label className="modal-label-c" htmlFor="longitude">
                                  Longitud
                              </label>
                              <input
                              type="text"
                              name="longitude"
                              className="form-control"
                              value={cenoteFormData.longitude}
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
                        Cerrar
                      </button>
                      <button  type="submit"  disabled={!isFormValid || loading} className="btn btn-primary">
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
