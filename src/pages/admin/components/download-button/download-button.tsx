import { DownloadIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

interface DownloadButtonProps {
  link?: string | null;
}

export const DownloadButton: React.FC<DownloadButtonProps> = (props) => {
  const { link } = props;

  if (!link) {
    return null;
  }

  return (
    <Flex gap={2} justifyContent='center'>
      <Link to={link} target='_blank' >
        <IconButton aria-label='' size='sm' variant='ghost'>
          <DownloadIcon />
        </IconButton>
      </Link>
    </Flex>
  );
};
