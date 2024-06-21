import React, {useEffect, useState} from 'react'
import { Dashboard } from "../Dashboard/Dashboard";
import { useNavigate }  from 'react-router-dom';
import { useRegister, useUserProfile, useGovernType } from '../../graphql/Users/UsersCustomHooks';
import { EnumsInterface, UserInterface, ProfileDataInterface } from '../../Types/UserTypes';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css";
import { ClipLoader } from 'react-spinners';

export const RegisterByEmail = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [brachScreen, setbrachScreen] = useState(false);
  const [UserProfileName, setUserProfileName] = useState('');
  const {governData} = useGovernType();
  const [userInfo, setUserInfo] = useState<UserInterface>({
    email: '',
    name: '',
    password: '',
    phone: '',
    surname: '',
  });

  const initialProfileData: ProfileDataInterface = {
    companyName: '', companyUrl: '',
    school: '', degree: '',
    govern_type: '', govern_institution: '', govern:'', institution:'',
    googleScholar: '', orchid: '', researchGate: '', linkedin: ''
  };
    
  const [userProfileData, setUserProfileData] = useState<ProfileDataInterface>(initialProfileData);
  const {data, error, loading, registerUser } = useRegister(UserProfileName);
  const {profileData} = useUserProfile();

  const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserInfo(prevState => ({
      ...prevState,
      [name]: value || null
    }));
  };

  const handleChangeProfileData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserProfileData(prevState => ({
      ...prevState,
      [name]: value || null
    }));
  };

  const handleChangeScreen = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    setbrachScreen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    setbrachScreen(true);
    await registerUser(userInfo, userProfileData);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if(error) {
      toast.error('La operación no se pudo completar, inténtelo nuevamente.')
    }
    if(data && !error) {
        navigate(`/`);
        toast.success('Usuario Registrado Exitosamente');
    } 
  }, [data, error])
  
  useEffect(() => {
    if(UserProfileName == 'GOVERN'){
      setUserProfileData(prevState => ({
        ...prevState,
        govern: governData[0].name
      }));
    }
  }, [UserProfileName])
  
  return (
    <div>
    <Dashboard>
      <div className="login-bg">
        <section className="content-header">
          <div className="container-fluid">
            <ToastContainer />
            {loading && 
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <ClipLoader loading={loading} size={50} />
            </div>}
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
          {brachScreen ? 
          (
              <div className="col-md-6">
                <div className="login-box login-box-cnt margin-top-50">
                  <div className="card login-box-cnt">
                    <div className="card-body login-card-body">
                      <a onClick={() => {setbrachScreen(false); setUserProfileName(''); setUserProfileData(initialProfileData);}} className='login-subtitle-font-card'> <img src="/src/assets/Icons/arrow-left.svg"/> volver</a>
                      <div className="justify-content-center text-center">
                        <p className="login-title-font-card mb-2 text-center">Último Paso</p>
                        <small className='text-center'>Selecciona el ramo al que perteneces.</small>
                      </div>
                      {/* /.Register */} 
                      {
                        !UserProfileName && profileData && profileData.map((item: EnumsInterface) => (
                          <button className='profile-item' onClick={() => {setUserProfileName(item.name)}} key={item.name}>{item.name}</button>
                        ))
                      }
                      {
                        UserProfileName && 
                        (<button className='profile-item-selected'>{UserProfileName}</button>)
                      }
                      {UserProfileName == 'TOURIST' && 
                      (
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="companyName">Nombre de mi empresa</label>
                          <div className=" mb-3">
                            <input
                            type="text"
                            name="companyName"
                            value={userProfileData.companyName || ''}
                            onChange={handleChangeProfileData}
                            className="form-control"
                            required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="companyUrl">Sitio web de mi empresa</label>
                          <div className=" mb-3">
                            <input
                            type="text"
                            name="companyUrl"
                            value={userProfileData.companyUrl || ''}
                            onChange={handleChangeProfileData}
                            className="form-control"
                            required
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          {/* /.col */}
                          <button type="submit" disabled={!userProfileData.companyName} className="btn btn-bg-blue">
                            Continuar
                          </button>
                          {/* /.col */}
                        </div>
                      </form>
                      )}
                      {(UserProfileName == 'TEACHER' || UserProfileName == 'STUDENT') && 
                      (
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="degree">Grado de estudios</label>
                          <div className=" mb-3">
                            <input
                            type="text"
                            name="degree"
                            value={userProfileData.degree || ''}
                            onChange={handleChangeProfileData}
                            className="form-control"
                            required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="school">Nombre de la escuela</label>
                          <div className=" mb-3">
                            <input
                            type="text"
                            name="school"
                            value={userProfileData.school || ''}
                            onChange={handleChangeProfileData}
                            className="form-control"
                            required
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          {/* /.col */}
                          <button type="submit" disabled={!userProfileData.degree || !userProfileData.school} className="btn btn-bg-blue">
                            Continuar
                          </button>
                          {/* /.col */}
                        </div>
                      </form>
                      )}
                      {UserProfileName == 'GOVERN' && 
                      (
                        <form onSubmit={handleSubmit}>
                        {governData &&
                          <div className="form-group">
                            <label className="modal-label-c">Gobierno</label>
                            <select 
                              name="govern"
                              className="form-control"
                              value={userProfileData.govern}
                              onChange={handleChangeProfileData}>
                              { governData.map((item: EnumsInterface) => (
                                <option key={item.name}  value={item.name}>{item.name}</option>
                              ))}
                            </select>
                          </div>
                        }
                        <div className="form-group">
                          <label htmlFor="institution">Nombre de la Institución</label>
                          <div className=" mb-3">
                            <input
                            type="text"
                            name="institution"
                            value={userProfileData.institution || ''}
                            onChange={handleChangeProfileData}
                            className="form-control"
                            required
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          {/* /.col */}
                          <button type="submit" disabled={!userProfileData.govern} className="btn btn-bg-blue">
                            Continuar
                          </button>
                          {/* /.col */}
                        </div>
                      </form>
                      )}
                      {UserProfileName == 'INVESTIGATOR' && 
                      (
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="googleScholar">Google scholar</label>
                          <div className=" mb-3">
                            <input
                            type="text"
                            name="googleScholar"
                            value={userProfileData.googleScholar || ''}
                            onChange={handleChangeProfileData}
                            className="form-control"
                            required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="orchid">ORCHID</label>
                          <div className=" mb-3">
                            <input
                            type="text"
                            name="orchid"
                            value={userProfileData.orchid || ''}
                            onChange={handleChangeProfileData}
                            className="form-control"
                            required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="researchGate">ResearchGate</label>
                          <div className=" mb-3">
                            <input
                            type="text"
                            name="researchGate"
                            value={userProfileData.researchGate || ''}
                            onChange={handleChangeProfileData}
                            className="form-control"
                            required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="linkedin">LinkedIn</label>
                          <div className=" mb-3">
                            <input
                            type="text"
                            name="linkedin"
                            value={userProfileData.linkedin || ''}
                            onChange={handleChangeProfileData}
                            className="form-control"
                            required
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
                      )}
                    </div>
           
                  </div>
                </div>
              </div>
          ) : (
            <div className="col-md-6">
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
                    <form onSubmit={handleChangeScreen}>
                      <div className="form-group">
                        <label htmlFor="email_adress">Nombre</label>
                        <div className=" mb-3">
                          <input
                          type="text"
                          name="name"
                          value={userInfo.name || ''}
                          onChange={handleChangeUserInfo}
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
                          onChange={handleChangeUserInfo}
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
                          onChange={handleChangeUserInfo}
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
                          onChange={handleChangeUserInfo}
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
                          onChange={handleChangeUserInfo}
                          className="form-control"
                          required
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
                                src="/src/assets/Icons/slash-eye.svg"
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
                        <button type="submit" className="btn btn-bg-blue">
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
          )}
       
        
        </div>
      </div>
    </Dashboard>
    </div>
  )
}
