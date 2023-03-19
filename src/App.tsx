import React from 'react';

import { Heading } from '@chakra-ui/react';
import { CenoteandoTableWrapper } from './components/table';

import { mockData } from './utils/mock-data';
import { CenoteModel } from './models/CenotesTypes';
import { ApiInstanceProvider } from './hooks/api-instance-provider';
import { httpClient } from './services/http-client';
import { requestInterceptor } from './services/http-interceptors';

function App() {
  const tableData = mockData.content.map((data: any) => new CenoteModel(data));

  return (
    <div className='App'>
      <ApiInstanceProvider
        config={httpClient}
        requestInterceptors={[requestInterceptor]}
      >
        <Heading>Cenoteando Frontend</Heading>
        <CenoteandoTableWrapper tableData={tableData} />
      </ApiInstanceProvider>
    </div>
  );
}

export default App;
