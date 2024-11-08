import React, { useEffect, useState } from 'react'
import { UpdateCenoteInterface } from '../../Types/CenotesTypes'
import { useCenoteTypes, useGetCenoteById, useUpdateCenote } from '../../graphql/Cenotes/CenotesCustomHooks';
import { toast } from 'react-toastify';
import { EnumsInterface } from '../../Types/UserTypes';
import { UpdatePropsInterface } from '../../Types/UtilsTypes';

export const UpdateCenote: React.FC<UpdatePropsInterface> = ({id, showModal, handleToggleModal, refetch }) => {
    const initialCenotesForm: UpdateCenoteInterface = {
        name: "",
        municipality: "",
        state: "",
        touristic: false,
        type: "",
        longitude: "",
        latitude: "",
    }

    const { data, loading, error, updateCenote } = useUpdateCenote();
    const { cenoteData, loadingData, errorData } = useGetCenoteById(id);
    const [ cenoteInfo, setCenoteInfo] = useState<UpdateCenoteInterface>(initialCenotesForm);
    const [ isFormValid, setIsFormValid] = useState(false);
    const { cenoteTypesData, cenoteTypesLoading } = useCenoteTypes();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCenoteInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const parsedValue = value === 'true' ? true : false;
        setCenoteInfo((prevState) => ({
          ...prevState,
          [name]: parsedValue,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(id) {
            await updateCenote(id, cenoteInfo);
        }
    };

    useEffect(() => {
        if (cenoteData && !loadingData) {
            setCenoteInfo({
                name: cenoteData.name,
                municipality: cenoteData.municipality,
                state: cenoteData.state,
                touristic: cenoteData.touristic,
                type: cenoteData.type,
                longitude: cenoteData.longitude,
                latitude: cenoteData.latitude
            });
        } else {
            setCenoteInfo(initialCenotesForm);
        }
        if(errorData){
            toast.error('El registro no existe o no tiene un identificador')
        }
    }, [cenoteData, errorData]);

    useEffect(() => {
        if (error) {
          const errorMessage = error.graphQLErrors?.[0]?.message || 'La operación no se pudo completar, inténtelo nuevamente.';
          toast.error(errorMessage);
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
        const nonRequiredFields = ['touristic']; // List of non-required fields
        const isFormFilled = Object.entries(cenoteInfo).every(([key, value]) => 
            nonRequiredFields.includes(key) || value
        );
        setIsFormValid(isFormFilled);
    }, [cenoteInfo]);

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
                    <h4 className="modal-title-c">Actualizar Cenote</h4>
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
                              value={cenoteInfo.name}
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
                              value={cenoteInfo.state}
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
                              value={cenoteInfo.municipality}
                              onChange={handleChange}
                              required
                              />
                          </div>
                          <div className="form-group col-md-6">
                              <label className="modal-label-c">Tipo</label>
                              <select 
                              name="type"
                              className="form-control"
                              value={cenoteInfo.type}
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
                                        checked={cenoteInfo.touristic === false}
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
                                        checked={cenoteInfo.touristic === true}
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
                              value={cenoteInfo.latitude}
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
                              value={cenoteInfo.longitude}
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
