import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './pages/routes';
import { ApiInstanceProvider } from './hooks/api-instance-provider';
import { httpClient } from './services/http-client';
import { requestInterceptor } from './interceptors/http-interceptors';
import { LoginContextProvider } from './context/login';
import { theme } from './utils/theme-colors';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ApiInstanceProvider
        config={httpClient}
        requestInterceptors={[requestInterceptor]}
      >
        <LoginContextProvider>
          <RouterProvider router={router} />
        </LoginContextProvider>
      </ApiInstanceProvider>
    </ChakraProvider>
  </React.StrictMode>
);
