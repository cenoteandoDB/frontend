import React, { MouseEventHandler, useState } from 'react';

import { Center, Flex, Heading, Tag } from '@chakra-ui/react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const Dashboard = () => {
  const location = useLocation();

  const tagStyle = (tagName: string) =>
    location.pathname === tagName ? 'solid' : 'outline';

  return (
    <>
      <Heading>Este es el dashboard</Heading>
      <Center>
        <Flex gap={2} mb='20px' width='95%'>
          <Tag variant={tagStyle('/admin/cenotes')}>
            <Link to='/admin/cenotes'>Tabla de cenotes</Link>
          </Tag>
          <Tag variant={tagStyle('/admin/variables')}>
            <Link to='/admin/variables'>Tabla de variables</Link>
          </Tag>
        </Flex>
      </Center>
      <Outlet />
    </>
  );
};
