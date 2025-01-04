import {BASE_API_URL} from "../api/rest-api.ts";

const error_default = {
  title: "Error de conexión",
  message: "Error al intentar conectarse con el servidor",
  status: false,
};

export const loginValidate = async (username: string, password: string) => {
  try {
    const response = await fetch(BASE_API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors", // <---
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok && response.status === 0) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    /*if (response.status === 401) {
        console.error("Error 401 - Unauthorized");
        return login_error_401;
      }*/

    const data = await response.json();

    if (data.status === true) {
      //set the session
      //console.log("session data: " + data);
      //setSession(data.token);
      //setUserData(data);
    }

    return data;
  } catch (error) {
    // manejar errores de la API
    console.error(error);
    return error_default;
  }
};
