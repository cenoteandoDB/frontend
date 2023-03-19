import React from 'react';

import { Outlet } from 'react-router-dom';
import { NavBar } from './navbar';

export const NavbarWrapper = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
