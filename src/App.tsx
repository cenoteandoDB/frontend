import React from 'react';

import { Heading } from '@chakra-ui/react';
import { CenoteandoTableWrapper } from './components/table';

import { mockData } from './utils/mock-data';
import { CenoteModel } from './models/CenotesTypes';

function App() {

  const tableData = mockData.content.map((data: any) => new CenoteModel(data));
  
  return (
    <div className='App'>
      <Heading>Cenoteando Frontend</Heading>
      <CenoteandoTableWrapper 
        tableData={tableData}
      />
    </div>
  );
}

export default App;
