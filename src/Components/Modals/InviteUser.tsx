import React, {useState, useEffect} from "react";
import { EnumsInterface, InviteUserInterface } from "../../Types/UserTypes";
import { SingleModalPropsInterface } from "../../Types/UtilsTypes";
import { useUserRoles, useInviteUser } from "../../graphql/Users/UsersCustomHooks";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Permisions } from "../Utils/Permisions";
import {UserRoleEnum} from "../../graphql/Users/UserDto.ts";

export const InviteUser: React.FC<SingleModalPropsInterface> = ({showModal, handleToggleModal}) => {
  const {rolesData } = useUserRoles();
  const { inviteUser, loading, error, success, dataInviteUser } = useInviteUser();
  const [showTab, setShowTab] = useState('tab_1');
  const [inviteUserId, setInviteUserId] = useState(null);
  const [inviteUserFormData, setInviteUserFormData] = useState<InviteUserInterface>({
    name: "",
    email: "",
    userRole: "BASIC"
  });
 
  const handleToggleTab = (tabName: string) => {
    setShowTab(tabName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setInviteUserFormData((prevState) => ({
          ...prevState,
          [name]: value
      }));
  };

  const handleInviteUser = async (event: React.FormEvent) => {
      event.preventDefault();
      inviteUser(inviteUserFormData);
  };

  useEffect(() => {
    if (error) {
      toast.error(`Error inviting user: ${error.message}`);
      if (handleToggleModal) {
        handleToggleModal();
      }
    }
    if (success) {
      setInviteUserId(dataInviteUser.id)
      toast.success("Operación exitosa");
     
      if(inviteUserFormData.userRole == 'ADMIN'){
        if (handleToggleModal) {
          handleToggleModal();
          setInviteUserFormData({
            name: "",
            email: "",
            userRole: "BASIC"
          });
        }
      } else {
        setShowTab('tab_2')
      }
    }
    /*setInviteUserFormData({
      name: "",
      email: "",
      userRole: ""
    });*/
  }, [error, success]);

  useEffect(() => {
      setInviteUserFormData(prev => ({ ...prev, userRole: 'BASIC' }));
  }, []);


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
          <div className="modal-dialog modal-xl">
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
              <ul className="nav nav-pills ml-auto p-2 d-flex justify-content-between w-100 py-3 ">
                {inviteUserId && success ? 
                 <li className="nav-item flex-grow-1">
                 <a className={showTab == 'tab_1' ? "nav-link  text-center text-cnt bg-active-cnt py-3" : "nav-link text-center text-cnt bg-cnt py-3"} 
                   href="#tab_1" 
                   data-toggle="tab">
                    <img src="/assets/Icons/done.svg"></img> Información básica
                 </a>
               </li>:  <li className="nav-item flex-grow-1">
                  <a className={showTab == 'tab_1' ? "nav-link  text-center text-cnt bg-active-cnt py-3" : "nav-link text-center text-cnt bg-cnt py-3"} 
                    href="#tab_1" 
                    data-toggle="tab" 
                    onClick={() => handleToggleTab('tab_1')}>
                     <img src="/assets/Icons/done.svg"></img> Información básica
                  </a>
                </li>}
               
                {success &&
                 <li className="nav-item flex-grow-1">
                 <a className={showTab == 'tab_2' ? "nav-link  text-center text-cnt bg-active-cnt py-3" : "nav-link text-center text-cnt bg-cnt py-3"} 
                   href="#tab_2" 
                   data-toggle="tab" 
                   onClick={() => handleToggleTab('tab_2')}>
                    <img src="/assets/Icons/progress.svg"></img> Cenotes y permisos
                 </a>
                </li>
                }
               
              </ul>
              <div className="tab-content">
                <div className={showTab == 'tab_1' ? "tab-pane active" : "tab-pane"} id="tab_1">
                  <form onSubmit={evt => handleInviteUser(evt)}>
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
                            value={inviteUserFormData.email}
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
                            value={inviteUserFormData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="modal-label-c">Tipo de usuario</label>
                          <select 
                            name="userRole"
                            className="form-control"
                            value={inviteUserFormData.userRole}
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
                        Close
                      </button>
                      <button  type="submit"  className="btn btn-primary">
                        Invitar
                      </button>
                    </div>
                  </form>
                </div>
                <div className={showTab == 'tab_2' ? "tab-pane active" : "tab-pane"} id="tab_2">
                  {inviteUserId && <Permisions userId={inviteUserId}></Permisions>}
                           
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
