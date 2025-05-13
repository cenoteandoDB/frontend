import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../graphql/Users/UsersCustomHooks';
import { UserInterface, LoginInterface } from '../Types/UserTypes';
import { useUserByEmail } from '../graphql/Users/UsersCustomHooks';

/**
 * Interfaz para el contexto de autenticación
 */
interface AuthContextProps {
  token: string | null;
  user: UserInterface | undefined;
  isAuthenticated: boolean;
  login: (loginData: LoginInterface) => Promise<void>;
  logout: () => void;
  error: string | null;
  getUser: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

/**
 * Proveedor de autenticación que maneja el estado global de autenticación
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));
  const { user: fetchedUser, error: fetchError, loading: userLoading } = useUserByEmail(email || '');
  const [user, setUser] = useState<UserInterface | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { login: loginApi } = useAuth();

  /**
   * Función para iniciar sesión
   * @param {LoginInterface} loginData - Datos de inicio de sesión
   */
  const login = async (loginData: LoginInterface) => {
    try {
      setLoading(true);
      setError(null);
      const { token } = await loginApi(loginData);
      
      // Guardar datos en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('email', loginData.email);
      
      // Actualizar estado
      setToken(token);
      setEmail(loginData.email);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Error al iniciar sesión. Por favor intente nuevamente.';
      setError(errorMessage);
      console.error('Error de autenticación:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función para cerrar sesión
   */
  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    
    // Limpiar estado
    setToken(null);
    setUser(undefined);
    setError(null);
    setEmail(null);
  };

  /**
   * Función para obtener datos del usuario
   */
  const getUser = () => {
    if (email) {
      setUser(fetchedUser);
    }
  };

  // Efecto para cargar datos iniciales
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');

    if (storedToken && storedEmail) {
      setToken(storedToken);
      setEmail(storedEmail);
    }
  }, []);

  // Efecto para actualizar usuario cuando cambian los datos
  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
    }
  }, [fetchedUser]);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        user, 
        isAuthenticated, 
        login, 
        logout, 
        error, 
        getUser,
        loading: loading || userLoading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook para acceder al contexto de autenticación
 * @returns {AuthContextProps} Contexto de autenticación
 * @throws {Error} Si se usa fuera del AuthProvider
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe ser usado dentro de un AuthProvider');
  }
  return context;
};
