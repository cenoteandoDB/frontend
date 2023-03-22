import React from 'react';

import { Heading } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <>
      <Heading>Este es el dashboard</Heading>
      <Link to='/admin/cenotes'>Tabla de cenotes</Link>
      <Link to='/admin/variables'>Tablas de variables</Link>
      <Outlet />
    </>
  );
};
