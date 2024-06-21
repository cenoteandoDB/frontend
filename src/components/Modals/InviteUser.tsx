import React, {useState, useEffect} from "react";
import { EnumsInterface, InviteUserInterface } from "../../Types/UserTypes";
import { SingleModalPropsInterface } from "../../Types/UtilsTypes";
import { useUserRoles, useInviteUser } from "../../graphql/Users/UsersCustomHooks";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const InviteUser: React.FC<SingleModalPropsInterface> = ({showModal, handleToggleModal}) => {
  const {rolesData } = useUserRoles();
  const { inviteUser, loading, error, success } = useInviteUser();
  const [inviteUserFormData, setInviteUserFormData] = useState<InviteUserInterface>({
    name: "",
    email: "",
    userRole: ""
  });

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
      toast.success("Operación exitosa");
      if (handleToggleModal) {
        handleToggleModal();
      }
    }
    setInviteUserFormData({
      name: "",
      email: "",
      userRole: ""
    });
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
                    Close
                  </button>
                  <button  type="submit"  className="btn btn-primary">
                    Invitar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
