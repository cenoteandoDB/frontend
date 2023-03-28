import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import { ApiInstanceProvider } from './hooks/api-instance-provider';
import { httpClient } from './services/http-client';
import { requestInterceptor } from './services/http-interceptors';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ApiInstanceProvider
        config={httpClient}
        requestInterceptors={[requestInterceptor]}
      >
        <RouterProvider router={router} />
      </ApiInstanceProvider>
    </ChakraProvider>
  </React.StrictMode>
);
