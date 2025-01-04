import React, { createContext, useContext, useState, useEffect } from 'react';
import {loginPost, useAuth} from '../graphql/Users/UsersCustomHooks';
import { UserInterface, LoginRequestDto } from '../Types/UserTypes';
import { useUserByEmail } from '../graphql/Users/UsersCustomHooks';

interface AuthContextProps {
  token: string | null;
  user: UserInterface | undefined;
  isAuthenticated: boolean;
  login: (loginData: LoginRequestDto) => Promise<void>;
  logout: () => void;
  error: string | null;
  getUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));
  const { user: fetchedUser, error: fetchError } = useUserByEmail(email || '');
  const [user, setUser] = useState<UserInterface | undefined>();
  const [error, setError] = useState<string | null>(null);

  const login = async (loginData: LoginRequestDto) => {
    try {
      const loginResponse = await loginPost(loginData);
      localStorage.setItem('token', loginResponse.jwt);
      localStorage.setItem('refreshToken', loginResponse.refreshToken);
      localStorage.setItem('email', loginResponse.email);
      setToken(loginResponse.jwt);
      setRefreshToken(loginResponse.refreshToken);
      setUser(loginResponse);
      setError(null);
    } catch (err) {
      setError('Incorrect email or password');
      console.error('Login error:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setToken(null);
    setRefreshToken(null);
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
