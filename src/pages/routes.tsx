import React, { lazy, Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';
import { LoadingSpinner } from '../components/loading-spinner';

const Admin = lazy(() =>
  import('./admin').then(({ Admin }) => ({ default: Admin }))
);
const Cenote = lazy(() =>
  import('./cenote').then(({ Cenote }) => ({ default: Cenote }))
);
const CenoteandoTableWrapper = lazy(() =>
  import('./admin/components/table').then(({ CenoteandoTableWrapper }) => ({
    default: CenoteandoTableWrapper,
  }))
);
const Home = lazy(() =>
  import('./home').then(({ Home }) => ({ default: Home }))
);
const Map = lazy(() => import('./map').then(({ Map }) => ({ default: Map })));
const NavbarWrapper = lazy(() =>
  import('../components/navbar').then(({ NavbarWrapper }) => ({
    default: NavbarWrapper,
  }))
);

const Login = lazy(() =>
  import('./login').then(({ Login }) => ({ default: Login }))
);
const Signup = lazy(() =>
  import('./signup').then(({ Signup }) => ({ default: Signup }))
);

const ADMIN_KEY = '/admin';
const MAP_KEY = '/map';
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
  routesObj.map((route) =>
    routes.push({
      path: `${parentRoute}/${route}`,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Component route={route} />
        </Suspense>
      ),
    })
  );

  return routes;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarWrapper />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: ADMIN_KEY,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Admin route={ADMIN_KEY} />
          </Suspense>
        ),
        children: routeBuilder(ADMIN_KEY, adminRoutes, CenoteandoTableWrapper),
      },
      {
        path: MAP_KEY,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Map />
          </Suspense>
        ),
      },
      {
        path: 'cenote/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Cenote />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: 'signup',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Signup />
      </Suspense>
    ),
  },
]);

export default router;
