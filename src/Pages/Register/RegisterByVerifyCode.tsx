import React, { useState } from 'react'
import { Dashboard } from '../Dashboard/Dashboard'
import { verifyCode } from '../../graphql/Users/UsersCustomHooks'
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const RegisterByVerifyCode = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [code, setCode] = useState<string>('');

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await verifyCode(code);
            setLoading(false);
            navigate(`/registerv2/${code}`);
        } catch (e) {
            setError(e.message);
            toast.warning("El código no coincide o esta incorrecto, inténtelo nuevamente.");
        }
    }

    return (
        <div>
        <Dashboard>
            <div className="login-bg">
            <section className="content-header">
                <div className="container-fluid">
                    <ToastContainer />
                    {loading &&
                    (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <ClipLoader loading={loading} size={50} />
                    </div>)
                    }
                </div>
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
                        <div className="d-flex justify-content-center">
                        <p className="login-title-font-card"></p>
                        </div>
                        <div className="justify-content-center text-center">
                        <p className="login-title-font-card mb-2 text-center">Regístrate con código</p>
                        <small className='text-center'>Para completar tu registro, por favor ingresa el código que recibiste en tu correo electrónico.</small>
                        <br></br>
                        {error &&
                        <small className='text-danger text-center'>El código no coincide o esta incorrecto.</small>
                        }                    
                    </div>
                    
                        {/* /.Register */}
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email_adress">Código de invitación</label>
                            <div className=" mb-3">
                            <input
                                type="text"
                                name="codigo"
                                value={code || ''}
                                onChange={(evt) => setCode(evt.target.value)}
                                className="form-control"
                                placeholder=""
                            />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            {/* /.col */}
                            <button type="submit" className="btn btn-bg-blue">
                            Continuar
                            </button>
                            {/* /.col */}
                        </div>
                        </form>
        
                    </div>
                    {/* /.login-card-body */}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </Dashboard>
        </div>
    )
}
