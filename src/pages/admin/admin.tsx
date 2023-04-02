import { Center, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { TagsRoutes } from './components/tags-routes';
import { AdminTablesContext } from './context/admin-context';

interface AdminProps {
  route: string;
}

export const Admin: React.FC<AdminProps> = (props) => {
  const { route } = props;
  
  return (
    <AdminTablesContext.Provider
      value={{
        route: route,
      }}
    >
      <Center>
        <Heading>Admin Route</Heading>
      </Center>
      <Center>
        <Flex gap={2} mb='20px' width='95%'>
          <TagsRoutes />
        </Flex>
      </Center>
      <Outlet />
    </AdminTablesContext.Provider>
  );
};
