import React, { useEffect, useState } from 'react'
import { UpdatePropsInterface } from '../../Types/UtilsTypes'
import { getGetUserById, updateUser } from '../../graphql/Users/UsersCustomHooks';
import { ClipLoader } from "react-spinners";
import 'react-toastify/dist/ReactToastify.css';
import { UserInterface } from '../../Types/UserTypes';
import {UserRoleEnum} from "../../graphql/Users/UserDto.ts";

export const UpdateUser: React.FC<UpdatePropsInterface> = ({id, showModal, handleToggleModal, refetch }) => {
    const initialUserInfo: UserInterface = {email: '',name: '', surname: '',role: '' };
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<UserInterface>(initialUserInfo);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value.trim()
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(id) {
            await updateUser(id, userInfo);
            if (handleToggleModal && refetch) {
                handleToggleModal();
                refetch();
            }
        }
    };

    useEffect(() => {
        const getUserInfoToUpdate = async (id: string | null | undefined) => {
            try {
                const user = await getGetUserById(id);
                setUserInfo(user as UserInterface);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        getUserInfoToUpdate(id);
    }, [id]);

    useEffect(() => {
      if (id) {
          const isFormFilled = Object.values(userInfo).every(value => {
              return value != "";
          });
          console.log(`Formed is valid? ${isFormFilled}`);
        setIsFormValid(isFormFilled);
      } else{
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
                    <h4 className="modal-title-c">Actualizar Usuario</h4>
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
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <ClipLoader loading={loading} size={50} />
                        </div>
                    ) : (
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
                                        {Object.values(UserRoleEnum).map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
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
                                <button  type="submit" disabled={!isFormValid || loading} className="btn btn-primary">
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
