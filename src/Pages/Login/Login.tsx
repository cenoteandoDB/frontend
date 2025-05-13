import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../Auth/AuthProvider";
import { LoginInterface } from "../../Types/UserTypes";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

/**
 * Componente de inicio de sesión
 * Maneja la autenticación de usuarios y muestra el formulario de login
 */
export const Login = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState<LoginInterface>({email: "", password: ""});
  const { login, isAuthenticated, error, loading } = useAuthContext();

  // Validar formulario cuando cambian los datos
  useEffect(() => {
    const isFormFilled = Object.values(formData).every(value => value.trim());
    setIsFormValid(isFormFilled);
  }, [formData]);

  // Mostrar errores de autenticación
  useEffect(() => {
    if(error) {
      toast.error(error);
    }
  }, [error]);

  // Redirigir si ya está autenticado
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  /**
   * Maneja cambios en los campos del formulario
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Maneja el envío del formulario
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      // Los errores ya son manejados por el AuthProvider
      console.error('Error en el formulario:', err);
    }
  }

  return (
    <div>
      <Dashboard>
        <div className="login-bg">
          <section className="content-header">
            <div className="container-fluid">
              <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </section>
          <div className="row">
            <div className="col-md-6 text-center d-flex align-items-center justify-content-center">
              <div>
                <h2 className="login-title">
                  Cenoteando Data
                </h2>
                <p className="lead mb-5 login-text">
                  Te damos la bienvenida a Cenoteando Data, el <br />
                  repositorio más grande de cenotes de la <br /> península
                  de Yucatán.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="login-box login-box-cnt margin-top-50">
                <div className="card login-box-cnt">
                  <div className="card-body login-card-body">
                    <div className="justify-content-center text-center">
                      <p className="login-title-font-card text-center">Iniciar Sesión</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <div className="mb-3">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            value={formData.email}
                            className="form-control"
                            placeholder="Correo Electrónico"
                            disabled={loading}
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
                            disabled={loading}
                          />
                          <div className="input-group-append">
                            <div className="input-group-text">
                              <img
                                src="/assets/Icons/slash-eye.svg"
                                alt="Mostrar/Ocultar contraseña"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mb-1">
                        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                      </p>

                      <div className="d-flex justify-content-center">
                        <button 
                          type="submit" 
                          disabled={!isFormValid || loading} 
                          className="btn btn-bg-blue"
                        >
                          {loading ? 'Iniciando sesión...' : 'Ingresar'}
                        </button>
                      </div>
                    </form>

                    <div className="social-auth-links text-center">
                      <div className="row">
                        <div className="col-md-6">
                          <Link 
                            to="/verifycode"
                            className="btn btn-white-border col-md-12 float-left"
                          >
                            <img className="mb-1" src="/assets/Images/register.png" alt="Registro con código" />
                            <p>Registrarse con código de invitación</p>
                          </Link>
                        </div>
                        <div className="col-md-6">
                          <Link 
                            to="/registerv1"
                            className="btn btn-white-border col-md-12 float-right"
                          >
                            <img className="mb-1" src="/assets/Images/register.png" alt="Registro con email" />
                            <p>Registrarse con correo electrónico</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
};
