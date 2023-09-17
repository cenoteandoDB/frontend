import React from 'react';

import { Center, Flex } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import { BrandLogo } from '../../components/brand-logo';
import { TagsRoutes } from './components/tags-routes';
import { AdminTablesContext } from './context/admin-context';

interface AdminProps {
  route: string;
}

export const Admin: React.FC<AdminProps> = (props) => {
  const { route } = props;
  const location = useLocation();

  return (
    <AdminTablesContext.Provider
      value={{
        route: route,
        setTableData: () => undefined,
      }}
    >
      <Center marginTop='20px'>
        <Flex gap={2} mb='20px' width='95%'>
          <TagsRoutes />
        </Flex>
      </Center>
      {location.pathname === '/admin' ? (
        <Flex
          width={'100vw'}
          height={'75vh'}
          alignContent={'center'}
          justifyContent={'center'}
        >
          <Center>
            <BrandLogo />
          </Center>
        </Flex>
      ) : (
        <Outlet />
      )}
    </AdminTablesContext.Provider>
  );
};
