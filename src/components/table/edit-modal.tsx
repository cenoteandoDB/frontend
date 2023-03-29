import React, { useEffect } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

interface EditModalProps {
  isOpen: boolean;
  inputs: any;
  onClose: () => void;
  fetch: (payload?: object | undefined) => Promise<void>;
}

export const EditModal: React.FC<EditModalProps> = (props) => {
  const { isOpen, inputs, onClose, fetch } = props;

  const inputsNames = Object.keys(inputs);

  

  useEffect(() => {
    if (isOpen) {
      fetch();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Test Modal for Editing</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {inputsNames.map((input, index) => (
            <FormControl key={`${input}-${index}`} mb={4}>
              <FormLabel>{input}</FormLabel>
              <Input />
            </FormControl>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
