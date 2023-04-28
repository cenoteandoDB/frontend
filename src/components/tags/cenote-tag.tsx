import React, { FC } from 'react';

import * as _chakra_ui_system from '@chakra-ui/system';
import {
  IconProps,
  Tag,
  TagLeftIcon,
  TagRightIcon,
  TagLabel,
} from '@chakra-ui/react';

interface TagsProps {
  tagIcon?: _chakra_ui_system.ComponentWithAs<'svg', IconProps>;
  label: string;
  tagSize: string;
  colorScheme: string;
  iconSide: 'left' | 'right';
  onHandleIconClick: (label: string) => void;
}

export const CenoteTag: FC<TagsProps> = (props) => {
  const { iconSide, tagIcon, label, tagSize, colorScheme, onHandleIconClick } = props;
  return (
    <Tag size={tagSize} colorScheme={colorScheme} onClick={() => onHandleIconClick(label)} >
      {iconSide === 'left' && <TagLeftIcon as={tagIcon}  />}
      <TagLabel>{label}</TagLabel>
      {iconSide === 'right' && <TagRightIcon as={tagIcon} />}
    </Tag>
  );
};
