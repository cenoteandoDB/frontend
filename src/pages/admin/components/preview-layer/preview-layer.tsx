import React from 'react';

import { ViewIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Image, Popover, PopoverArrow,
  PopoverCloseButton, PopoverContent, PopoverTrigger
} from '@chakra-ui/react';

interface PreviewLayerProps {
  url: string;
}

export const PreviewLayer: React.FC<PreviewLayerProps> = (props) => {
  const { url } = props;

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton aria-label='' size='sm' variant='ghost'>
          <ViewIcon />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <Image src={url} />
      </PopoverContent>
    </Popover>
  );
};
