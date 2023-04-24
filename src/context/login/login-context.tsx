import React, { createContext, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { AuthDto } from '../../models/AuthTypes';

interface LoginContextI {
  userData: AuthDto | null,
  setUserData: React.Dispatch<SetStateAction<AuthDto | null>>;
}

export const LoginContext = createContext<LoginContextI>({} as LoginContextI);

interface LoginContextProviderProps {
  children: ReactNode;
}

export const LoginContextProvider: FC<LoginContextProviderProps> = (props) => {
  const { children } = props;
  const [userData, setUserData] = useState<AuthDto | null>(null);

  return (
    <LoginContext.Provider value={{ userData, setUserData }}>
      {children}
    </LoginContext.Provider>
  );
};
