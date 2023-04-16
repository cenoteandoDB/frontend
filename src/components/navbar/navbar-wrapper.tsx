import React, { useContext, useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/login';
import { NavBar } from './navbar';

export const NavbarWrapper = () => {
  const { userData, setUserData } = useContext(LoginContext);
  const navigate = useNavigate();

  const userSession = window.sessionStorage.getItem('userSession');
  const userDataParsed = JSON.parse(userSession ?? '{}');
  useEffect(() => {
    if (!userSession) {
      navigate('/login');
    }
    if (userDataParsed && userDataParsed.isLoggedIn) {
      setUserData(userDataParsed);
      navigate('/admin');
    }
  }, []);

  return (
    <div>
      {userData?.isLoggedIn ? <NavBar /> : null}
      <Outlet />
    </div>
  );
};
