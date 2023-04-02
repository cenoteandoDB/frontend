import React from 'react';
import { CheckIcon } from '@chakra-ui/icons';
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';

interface InputRightIconProps {
  inputValue: string;
  inputName?: string;
  onChangeCallback: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickCallback: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  iconComponent: JSX.Element
}

export const InputRightIcon: React.FC<InputRightIconProps> = (props) => {
  const { inputValue, inputName, onChangeCallback, onClickCallback, iconComponent } = props;
  return (
    <InputGroup>
      <Input
        name='new-alternative-name'
        value={inputValue}
        onChange={onChangeCallback}
      />
      <InputRightElement>
        <IconButton
          name={inputName}
          aria-label=''
          onClick={onClickCallback}
          icon={iconComponent}
          variant='ghost'
        />
      </InputRightElement>
    </InputGroup>
  );
};
