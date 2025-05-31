import React, {useState, useEffect} from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import { useParams } from 'react-router-dom';
import { UserInterface } from "../../Types/UserTypes";
import { useNavigate } from "react-router-dom";
import {
  getUserById,
  registerInvitedUser,
  updateUser,
  useUpdateUserInfo,
  verifyCode
} from "../../graphql/Users/UsersCustomHooks";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const RegisterByCode = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInterface>({
    email: '',
    name: '',
    password: '',
    phone: '',
    surname: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInfo({
        ...userInfo,
        [name]: value || null, 
    });
  };

  const verifyPasswordsCheck = () => {
    if (!confirmPassword || userInfo.password !== confirmPassword) {
      toast.warning(`Passwords do not match`);
      setPasswordError('Passwords do not match');
      return false;
    } else {
      setPasswordError('');
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const passwordsCheck = verifyPasswordsCheck();
        if (passwordsCheck) return;

        setLoading(true);
        await registerInvitedUser(code, userInfo);
        setLoading(false);

        toast.success('Usuario Registrado Exitosamente');
        navigate(`/`);
      } catch (e) {
        setLoading(false);
        toast.error('La operación no se pudo completar, inténtelo nuevamente.');
        console.log(e);
      }
  };

  const fetchUser = async () => {
    const userInfo = await verifyCode(code);
    userInfo.password = "";
    setUserInfo(userInfo as UserInterface);
  }

  // Use Effects

  useEffect(() => {
    fetchUser()
  }, []);

  useEffect(() => {
    // Check if all required fields are filled
    if (code) {
      console.log(JSON.stringify(userInfo));
      const mandatoryFields = ['name', 'surname', 'email', 'phone', 'password'];
      let isFormFilled = Object.entries(userInfo).every(([key, value]) => {
        if (mandatoryFields.includes(key)) {
          if (typeof value === "string") return value !== "";
          else return value !== null;
        } else {
          return true;
        }
      });
      isFormFilled = isFormFilled && confirmPassword !== '';
      setIsFormValid(isFormFilled);
    }else{
      setIsFormValid(false);
    }

  }, [code, userInfo]);


  return (
    <div>
    <Dashboard>
      <div className="login-bg">
        <section className="content-header">
          <div className="container-fluid"><ToastContainer /></div>
        </section>
        <div className="row">
          <div className="col-md-6  text-center d-flex align-items-center justify-content-center">
            <div className="">
              <div>
                <h2 className="login-title">
                Cenoteando Data
                </h2>
                <p className="lead mb-5 login-text">
                  Te damos la bienvenida a Cenoteando Data, el <br></br>
                  repositorio más grande de cenotes de la <br></br> península
                  de Yucatán.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 ">
            <div className="login-box login-box-cnt margin-top-50">
              {/* /.login-logo */}
              <div className="card login-box-cnt">
                <div className="card-body login-card-body">
                  {" "}
                  <div className="justify-content-center text-center">
                    <p className="login-title-font-card mb-2 text-center">Regístrate con correo electrónico</p>
                    <small className='text-center'>Por favor, ingresa tus datos personales.</small>
                  </div>
                  {/* /.Register */}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email_adress">Nombre</label>
                      <div className=" mb-3">
                        <input
                        type="text"
                        name="name"
                        value={userInfo.name || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email_adress">Apellidos</label>
                      <div className=" mb-3">
                        <input
                        type="text"
                        name="surname"
                        value={userInfo.surname || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email_adress">Correo Electrónico</label>
                      <div className=" mb-3">
                        <input
                        type="email"
                        name="email"
                        value={userInfo.email || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email_adress">Numero Telefónico</label>
                      <div className=" mb-3">
                        <input
                        type="text"
                        name="phone"
                        value={userInfo.phone || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                        />
                      </div>
                    </div>
              
                    <div className="form-group">
                      <label htmlFor="pass">Contraseña</label>
                      <div className="input-group mb-3">
                        <input
                        type="password"
                        name="password"
                        value={userInfo.password || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <img
                              src="/assets/Icons/slash-eye.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="pass">Confirmar Contraseña</label>
                      <div className="input-group mb-3">
                        <input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="form-control"
                        required
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <img
                              src="/assets/Icons/slash-eye.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    <p className="mb-1">
                      Tu contraseña debe contener al menos 8 caracteres, 1 mayúscula y 1 número.
                    </p>

                    <div className="d-flex justify-content-center">
                      {/* /.col */}
                      <button type="submit" disabled={!isFormValid || loading} className="btn btn-bg-blue">
                        Continuar
                      </button>
                      {/* /.col */}
                    </div>
                  </form>
                  {/* /.social-auth-links */}
                </div>
                {/* /.login-card-body */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
    </div>
  );
};
