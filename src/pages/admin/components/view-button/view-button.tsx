import React from 'react';

import { ViewIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface ViewButtonProps {
  link: string;
}

export const ViewButton: React.FC<ViewButtonProps> = (props) => {
  const { link } = props;
  return (
    <Link to={`/cenote/${link}`} target='_blank'>
      <IconButton aria-label='' size='sm' variant='ghost'>
        <ViewIcon />
      </IconButton>
    </Link>
  );
};
