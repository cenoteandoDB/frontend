import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../Auth/AuthProvider";
import { LoginInterface } from "../../Types/UserTypes";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";


export const Login = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");
  const [formData, setFormData] = useState<LoginInterface>({email: "", password: ""});
  const { getUser, login, isAuthenticated, error, user } = useAuthContext();

  useEffect(() => {
    const isFormFilled = Object.values(formData).every(value => value.trim());
    setIsFormValid(isFormFilled ? true : false);
}, [formData]);

  useEffect(() => {
    if(error){
      setErrorResponse('El Usuario o Contraseña son incorrectas');
      toast.warning("El Usuario o Contraseña son incorrectas");
    }
    if(isAuthenticated){
      getUser();
    }
  }, [error, isAuthenticated, user]);
 
  
  if (isAuthenticated) {
    return <Navigate to="/users" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      console.error('Login failed:', err);
    }
  }

  return (
    <div>
      <Dashboard>
        <div className="login-bg">
          <section className="content-header">
            <div className="container-fluid"> <ToastContainer /> </div>
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
                      <p className="login-title-font-card text-center">Iniciar Sesión</p>
                      {errorResponse && 
                        <small className='text-danger text-center'>{errorResponse}</small>
                      }
                    </div>
                    <div className="social-auth-links text-center d-none">
                      <div className="row">
                        <div className="col-md-6">
                          <a
                            href="#"
                            className="btn btn-white-border col-md-12 float-left"
                          >
                            <i className="fab fa-facebook mr-1" /> Ingresa con
                            Google
                          </a>
                        </div>
                        <div className="col-md-6">
                          <a
                            href="#"
                            className="btn btn-white-border col-md-12 float-right"
                          >
                            <i className="fab fa-google-plus mr-1" /> Ingresa
                            con Microsoft
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* /.Register */}
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email_adress">Correo Electrónico</label>
                        <div className=" mb-3">
                          <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            value={formData.email}
                            className="form-control"
                            placeholder="Correo Electrónico"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="pass">Contraseña</label>
                        <div className="input-group mb-3">
                          <input
                            type="password"
                            name="password"
                            id="pass"
                            onChange={handleChange}
                            value={formData.password}
                            className="form-control"
                            placeholder="Contraseña"
                          />
                          <div className="input-group-append">
                            <div className="input-group-text">
                              <img
                                src="/src/assets/Icons/slash-eye.svg"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mb-1">
                        <a href="forgot-password.html">I forgot my password</a>
                      </p>

                      <div className="d-flex justify-content-center">
                        {/* /.col */}
                        <button type="submit" disabled={!isFormValid } className="btn btn-bg-blue">
                          Ingresar
                        </button>
                        {/* /.col */}
                      </div>
                    </form>
                    {/* /.social-auth-links */}
                    <div className="social-auth-links text-center ">
                      <div className="row">
                        <div className="col-md-6">
                          <Link to="/verifycode"
                            className="btn btn-white-border col-md-12 float-left"
                          >
                             <img className="mb-1" src="/src/assets/Images/register.png" alt="" /> 
                            <p>Registrarse con código de invitación</p>
                          </Link>
                        </div>
                        <div className="col-md-6">
                          <Link to="/registerv1"
                            className="btn btn-white-border col-md-12 float-right"
                          >
                            <img className="mb-1" src="/src/assets/Images/register.png" alt="" /> 
                            <p>Registrarse con correo electrónico</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  
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
