// ./client/src/router.js
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Dashboard } from '../components/dashboard';
import { NavbarWrapper } from '../components/navbar';
import { CenoteandoTableWrapper } from '../components/table';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavbarWrapper />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/admin',
        element: <Dashboard />,
        children: [
          {
            path: '/admin/cenotes',
            element: <CenoteandoTableWrapper route='cenotes' />
          },
          {
            path: 'variables',
            element: <CenoteandoTableWrapper route='variables' />
          }
        ]
      },
      
    ]
  }
]);

export default router;
