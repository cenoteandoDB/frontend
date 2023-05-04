import { InternalAxiosRequestConfig } from 'axios';

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const authHeader = config?.headers?.['Authorization'];
  
  if (!authHeader) {
    const userSession = window.sessionStorage.getItem('userSession');
    const userData = JSON.parse(userSession ?? '{}');
    const tokenType = 'Bearer';

    if (userData.accessToken && tokenType) {
      if (config.headers !== null && config.headers !== undefined) {
        config.headers['Authorization'] = tokenType + ' ' + userData.accessToken;
      }
    }
  }
  return config;
};
