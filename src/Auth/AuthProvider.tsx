import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../graphql/Users/UsersCustomHooks';
import { UserInterface, LoginInterface } from '../Types/UserTypes';
import { useUserByEmail } from '../graphql/Users/UsersCustomHooks';

interface AuthContextProps {
  token: string | null;
  user: UserInterface | undefined;
  isAuthenticated: boolean;
  login: (loginData: LoginInterface) => Promise<void>;
  logout: () => void;
  error: string | null;
  getUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));
  const { user: fetchedUser, loading, error: fetchError } = useUserByEmail(email || '');
  const [user, setUser] = useState<UserInterface | undefined>();
  const [error, setError] = useState<string | null>(null);

  const { login: loginApi } = useAuth();

  const login = async (loginData: LoginInterface) => {
    try {
      const { token } = await loginApi(loginData);
      localStorage.setItem('token', token);
      localStorage.setItem('email', loginData.email);
      setToken(token);
      setEmail(loginData.email);
      setError(null);
    } catch (err) {
      setError('Incorrect email or password');
      console.error('Login error:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken(null);
    setUser(undefined);
    setError(null);
  };

  const getUser = () => {
    if (email) {
      setUser(fetchedUser);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');

    if (storedToken && storedEmail) {
      setToken(storedToken);
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
    }
  }, [fetchedUser]);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout, error, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
