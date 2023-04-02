import React from 'react';
import { Tag } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { adminRoutes } from '../../../routes';

interface TagsRoutesProps {
  route: string;
}

export const TagsRoutes: React.FC<TagsRoutesProps> = (props) => {
  const { route } = props;

  const location = useLocation();
  const tagStyle = (tagName: string) =>
    location.pathname === tagName ? 'solid' : 'outline';


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
