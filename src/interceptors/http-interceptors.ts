import { InternalAxiosRequestConfig } from 'axios';

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const authHeader = config?.headers?.['Authorization'];
  console.log('interceptor ', authHeader);
  
  if (!authHeader) {
    const accessToken = window.sessionStorage.getItem('userSession');
    const tokenType = 'Bearer';

    if (accessToken && tokenType) {
      if (config.headers !== null && config.headers !== undefined) {
        config.headers['Authorization'] = tokenType + ' ' + accessToken;
      }
    }
  }
  return config;
};
