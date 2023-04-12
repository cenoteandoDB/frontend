import React, { useEffect } from 'react';

import { Center, Flex, Heading } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { AuthDto } from '../../models/AuthTypes';
import { TagsRoutes } from './components/tags-routes';
import { AdminTablesContext } from './context/admin-context';

interface AdminProps {
  route: string;
}

export const Admin: React.FC<AdminProps> = (props) => {
  const { route } = props;
  const {data, fetch} = useApi(
    'api/auth/login',
    'post',
    {},{}
  );

  useEffect(() => {
    if (data) {
      const user = new AuthDto(data);
      window.sessionStorage.setItem('userSession', user.accessToken);
    }
  }, [data]);

  useEffect(() => {
    fetch({
      email: 'isaak',
      password: 'cenotes',
    });

  }, []);
  
  return (
    <AdminTablesContext.Provider
      value={{
        route: route,
        setTableData: () => undefined
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
