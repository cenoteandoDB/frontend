import React from 'react';

import { Center, Flex, Heading, Tag } from '@chakra-ui/react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { adminRoutes } from '../../services/routes';

interface DashboardProps {
  route: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ route }) => {
  const location = useLocation();

  const tagStyle = (tagName: string) =>
    location.pathname === tagName ? 'solid' : 'outline';

  const Tags = (): JSX.Element => {
    return (
      <>
        {adminRoutes.map((adminRoute, index) => (
          <Tag
            key={`${adminRoute}-${index}`}
            variant={tagStyle(`${route}/${adminRoute}`)}
          >
            <Link to={`${adminRoute}`}>Tabla de {adminRoute}</Link>
          </Tag>
        ))}
      </>
    );
  };

  return (
    <>
      <Heading>Este es el dashboard</Heading>
      <Center>
        <Flex gap={2} mb='20px' width='95%'>
          <Tags />
        </Flex>
      </Center>
      <Outlet />
    </>
  );
};
