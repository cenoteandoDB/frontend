import React, { useEffect, useState } from 'react'
import { UpdateUserPropsInterface } from '../../Types/UtilsTypes'
import {useGetUserById, useUserRoles, useUpdateUserInfo } from '../../graphql/Users/UsersCustomHooks';
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { EnumsInterface, UserInterface } from '../../Types/UserTypes';

export const UpdateUser: React.FC<UpdateUserPropsInterface> = ({id, showModal, handleToggleModal, refetchUsers }) => {
    const { rolesData } = useUserRoles()
    const initialuserInfo: UserInterface = {email: '',name: '', surname: '',role: '' };
    const {data, loading, error, updateUserInfo } = useUpdateUserInfo();
    const { userData, loadingData, errorData } = useGetUserById(id);
    const [userInfo, setUserInfo] = useState<UserInterface>(initialuserInfo);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(id) {
            await updateUserInfo(id, userInfo);
        }
    };

    useEffect(() => {
        if (userData && !loadingData) {
            setUserInfo({email: userData.email ,name: userData.name, surname: userData.surname, role: userData.role});
        }else {
            setUserInfo(initialuserInfo);
          }
    }, [userData]);

    useEffect(() => {
        if (error) {
          toast.error('La operación no se pudo completar, inténtelo nuevamente.')
          if (handleToggleModal) {
            handleToggleModal();
          }
        }
        if(data && !error){
          toast.success('Usuario Actualizado Exitosamente');
          if (handleToggleModal) {
            handleToggleModal();
            if (refetchUsers) refetchUsers();
          }
        } 
    }, [data, error])
    
    useEffect(() => {
      if(id){
        const isFormFilled = id.trim() && Object.values(userInfo).every(value => value.trim());
        setIsFormValid(isFormFilled ? true : false);
      }else{
        setIsFormValid(false);
      }
    }, [id, userInfo]);
    
    return (
        <div>
            {showModal && (
            <div
                className={`modal fade ${showModal ? "show" : ""}`}
                id="modal-update-user"
                style={{ paddingRight: 22, display: "block" }}
                aria-modal="true"
                role="dialog"
                data-backdrop="static"
            >
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h4 className="modal-title-c">Invitar Usuario</h4>
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
                    {loadingData ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <ClipLoader loading={loadingData} size={50} />
                        </div>
                    ) : errorData ? (
                        <p>No se pudo Cargar la información</p>
                    ) :(
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div>
                                    <div className="form-group">
                                        <label
                                        className="modal-label-c"
                                        htmlFor="exampleInputEmail1"
                                        >
                                        Correo Electrónico
                                        </label>
                                        <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={userInfo.email}
                                        onChange={handleChange}
                                        required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label
                                        className="modal-label-c"
                                        htmlFor="exampleInputPassword1"
                                        >
                                        Nombre
                                        </label>
                                        <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={userInfo.name}
                                        onChange={handleChange}
                                        required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label
                                        className="modal-label-c"
                                        htmlFor="surname"
                                        >
                                        Surname
                                        </label>
                                        <input
                                        type="text"
                                        name="surname"
                                        className="form-control"
                                        value={userInfo.surname}
                                        onChange={handleChange}
                                        required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="modal-label-c">Tipo de usuario</label>
                                        <select 
                                        name="role"
                                        className="form-control"
                                        value={userInfo.role}
                                        onChange={handleChange}>
                                        {rolesData && rolesData.map((item: EnumsInterface) => (
                                            <option key={item.name}  value={item.name}>{item.name}</option>
                                        ))}
                                        </select>
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
                                <button  type="submit" disabled={!isFormValid || loading}   className="btn btn-primary">
                                Guardar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                </div>
            </div>
            )}
        </div>
    )
}
