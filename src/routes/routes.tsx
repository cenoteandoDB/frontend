// ./client/src/router.js
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Dashboard } from '../components/dashboard';
import { NavbarWrapper } from '../components/navbar';
import { CenoteandoTableWrapper } from '../components/table';

const ADMIN_KEY = '/admin';
export const adminRoutes = ['cenotes', 'variables', 'references'];

const routeBuilder = (
  parentRoute: string,
  routesObj: string[],
  Component: React.FC<any>
): Array<{ path: string; element: JSX.Element }> => {
  const routes: Array<{ path: string; element: JSX.Element }> = [];
  routesObj.map((route) => routes.push({
    path: `${parentRoute}/${route}`,
    element: <Component route={route}/>
  }));

  return routes;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavbarWrapper />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: ADMIN_KEY,
        element: <Dashboard route={ADMIN_KEY} />,
        children: routeBuilder(ADMIN_KEY, adminRoutes, CenoteandoTableWrapper),
      },
    ],
  },
]);

export default router;
