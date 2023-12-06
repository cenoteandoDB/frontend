import React, { useContext } from 'react';
import { Tag } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { adminRoutes } from '../../../routes';
import { AdminTablesContext } from '../../context/admin-context';

export const TagsRoutes = () => {
  const { route } = useContext(AdminTablesContext);

  const location = useLocation();
  const tagStyle = (tagName: string) =>
    location.pathname === tagName ? 'solid' : 'outline';

  return (
    <>
      {adminRoutes.map((adminRoute, index) => {
        if (adminRoute.includes('/form/')) {
          return null;
        }
        return (
          <Tag
            colorScheme='highligthed'
            key={`${adminRoute}-${index}`}
            variant={tagStyle(`${route}/${adminRoute}`)}
          >
            <Link to={`${adminRoute}`}>{adminRoute}</Link>
          </Tag>
        );
      })}
    </>
  );
};
