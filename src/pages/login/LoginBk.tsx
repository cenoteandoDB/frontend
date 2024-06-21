import React, { useState, useEffect } from "react";

import { Dashboard } from "../Dashboard/Dashboard";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProviderbk";
import { Cenote } from "../../Types/UserTypes";
import { loginValidate } from "../../Services/UsersService";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";

import "./Login.css";
const ALL_CENOTES = gql`
  query {
    cenotes {
      id
      name
    }
  }
`;

const GET_CENOTE_BY_ID = gql`
  query ($cenoteByIdId: ID!) {
    cenoteById(id: $cenoteByIdId) {
      name
    }
  }
`;

const REGISTER = gql`
  mutation CreateLayer( $description: String!, $id: String!, $name: String!) {
    create(
      description: $description,
      id: $id,
      name: $name,
    ) {
      id
      name
      description
    }
  }
`;
import {
  AuthResponse,
  AuthResponseError,
  LoginInterface,
} from "../../Types/UserTypes";
import { identity } from "firebase-functions/v2";

export const Login = () => {
  //GET
  const { data, error, loading } = useQuery(ALL_CENOTES);
  //console.log(data);
  //console.log(error);
  //console.log(loading);

  //GET PARAMS
  const [getCenote, result] = useLazyQuery(GET_CENOTE_BY_ID);
  const [cenote, setcenote] = useState(null);
  const showCenote = (id: string) => {
    getCenote({ variables: { cenoteByIdId: id } });
  };
  
  useEffect(() => {
    if (result.data) {
      setcenote(result.data.cenoteById);
    }
  }, [result]);

  //REGISTER
  const [description, setdescription] = useState("");
  const [name, setname] = useState("");
  const [id, setid] = useState("ADMIN");
  const [ createLayer ] = useMutation(REGISTER, {refetchQueries:[{query: ALL_CENOTES}]});

   const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
  createLayer({
      variables: {
       description: description, name: name, id: id
      },
    });

 
  };


  const [formData, setFormData] = useState<LoginInterface>({
    username: "",
    password: "",
  });
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmitbk(e: React.FormEvent) {
    e.preventDefault();
    console.log(formData);
    //auth.setIsAuthenticated(true);
    /*try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }*/
  }
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Dashboard>
        <div className="login-bg">
          <section className="content-header">
            <div className="container-fluid"></div>
          </section>
          <div className="row">
            <div className="col-md-6  text-center d-flex align-items-center justify-content-center">
              <div className="">
                <div>
                  <h2 className="login-title">
                    <strong>Cenoteando Data {cenote && cenote.name}</strong>
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
                      <p className="login-title-font-card">Iniciar Sesión</p>
                    </div>
                    <div className="social-auth-links text-center ">
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
                    <form onSubmit={handleSubmitbk}>
                      <div className="form-group">
                        <label htmlFor="email_adress">Correo Electrónico</label>
                        <div className=" mb-3">
                          <input
                            type="text"
                            name="username"
                            id="email_adress"
                            onChange={handleChange}
                            value={formData.username}
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

                      <div className="d-flex justify-content-center">
                        {/* /.col */}
                        <button type="submit" className="btn btn-bg-blue">
                          Ingresar
                        </button>
                        {/* /.col */}
                      </div>
                    </form>
                    {/* /.social-auth-links */}
                    <p className="mb-1">
                      <a href="forgot-password.html">I forgot my password</a>
                    </p>
                    <form onSubmit={handleRegister}>
                      <div className="form-group">
                   
                        <div className=" mb-3">
                          <input
                            type="text"
                            name="t"
                            id="email_adress"
                            onChange={(evt) => setname(evt.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="name"
                          />
                        </div>
                      </div>
                      <div className="form-group">
    
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            name="description"
                            id="description"
                            onChange={(evt) => setdescription(evt.target.value)}
                            value={description}
                            className="form-control"
                            placeholder="Contraseña"
                          />
             
                        </div>
                      </div>

                      <div className="d-flex justify-content-center">
                        {/* /.col */}
                        <button type="submit" className="btn btn-bg-blue">
                          guardar
                        </button>
                        {/* /.col */}
                      </div>
                    </form>
                    {data &&
                      data.cenotes.map((p: Cenote) => (
                        <div onClick={() => showCenote(p.id)} key={p.id}>
                          {p.name}
                        </div>
                      ))}
                    <p className="mb-0">
                      <a href="register.html" className="text-center">
                        Register a new membership
                      </a>
                    </p>
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
