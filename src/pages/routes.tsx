// ./client/src/router.js
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { NavbarWrapper } from '../components/navbar';
import { Admin } from './admin';
import { CenoteandoTableWrapper } from './admin/components/table';
import { Home } from './home';

const ADMIN_KEY = '/admin';
export const adminRoutes = ['cenotes', 'variables', 'references'];

// Builds children of admin page dynamically
// Because admin route will have tables with different data it's easier to build this routes
// with this functions instead of copy-paste the routes below.
const routeBuilder = (
  parentRoute: string,
  routesObj: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        element: <Home />,
      },
      {
        path: ADMIN_KEY,
        element: <Admin route={ADMIN_KEY} />,
        children: routeBuilder(ADMIN_KEY, adminRoutes, CenoteandoTableWrapper),
      },
    ],
  },
]);

export default router;
