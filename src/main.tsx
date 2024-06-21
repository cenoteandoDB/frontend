import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterByEmail } from "./Pages/Register/RegisterByEmail.tsx";
import { Login } from "./Pages/Login/Login.tsx";
import ProtectedRoute from "./Auth/ProtectedRoute.tsx";
import { AuthProvider } from "./Auth/AuthProvider.tsx";
import { Users } from "./Pages/Users/Users.tsx";
import { Home } from "./Pages/Home/Admin/Home.tsx";
import { CenoteProfile } from "./Pages/Cenotes/CenoteProfile/CenoteProfile.tsx";
import { List_cenotes } from "./Pages/Cenotes/CenotesList.tsx";
import { Variants } from "./Pages/Descriptors/Variants/Variants.tsx";
import { References } from "./Pages/Descriptors/References/References.tsx";
import { GeographicLayers } from "./Pages/Descriptors/GeographicLayers/GeographicLayers.tsx";
import { SpeciesList } from "./Pages/Descriptors/Species/SpeciesList.tsx";
import { RegisterByVerifyCode } from "./Pages/Register/RegisterByVerifyCode.tsx";
import { RegisterByCode } from "./Pages/Register/RegisterByCode.tsx";

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:5001/cenoteando/us-central1/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

/*const client = new ApolloClient({
  connectToDevTools: true,
  uri: "http://127.0.0.1:5001/cenoteando/us-central1/graphql",
  cache: new InMemoryCache(),
});*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registerv1",
    element: <RegisterByEmail />,
  },
  {
    path: "/verifycode",
    element: <RegisterByVerifyCode />,
  }, 
  {
    path: "/registerv2/:id",
    element: <RegisterByCode />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/cenote",
        element: <CenoteProfile />,
      },
      {
        path: "/cenotes",
        element: <List_cenotes />,
      },
      {
        path: "/variantes",
        element: <Variants />,
      },
      {
        path: "/referencias",
        element: <References />,
      },
      {
        path: "/geograficos",
        element: <GeographicLayers />,
      },
      {
        path: "/especies",
        element: <SpeciesList />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(

    <ApolloProvider client={client}>
      <AuthProvider>
      
          <RouterProvider router={router} />
        
      </AuthProvider>
    </ApolloProvider>


);
