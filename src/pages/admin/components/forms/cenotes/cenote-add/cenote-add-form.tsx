import React from 'react';

import { gql, useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import {
  Coordinates,
  CoordinatesInput,
  CreateCenoteMutation,
  NewCenoteInput,
} from '../../../../../../__generated__/graphql';

const ADD_CENOTE_MUTATION = gql`
  mutation CreateCenote($newCenote: NewCenoteInput!) {
    createCenote(new_cenote: $newCenote) {
      id
      location {
        coordinates {
          latitude
          longitude
        }
      }
    }
  }
`;

interface CenoteAddFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialCoordinatesState = {
  latitude: '',
  longitude: '',
};

export const CenoteAddForm: React.FC<CenoteAddFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [addCenote, { data, loading, error, reset }] =
    useMutation<CreateCenoteMutation>(ADD_CENOTE_MUTATION);
  const [coordinates, setCoordinates] = React.useState<CoordinatesInput>(
    initialCoordinatesState
  );
  const toast = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    if (!targetName) {
      return;
    }

    setCoordinates({
      ...coordinates,
      [targetName]: targetValue,
    } as CoordinatesInput);
  };

  const handleAddCenote = () => {
    if (!coordinates.latitude || !coordinates.longitude) {
      return;
    }

    addCenote({
      variables: {
        newCenote: { coordinates: coordinates },
      },
    });
  };

  if (data && !loading && !error) {
    if (!data?.createCenote) return null;
    const {
      id,
      location: { coordinates },
    } = data.createCenote;
    onClose();
    toast({
      title: `Cenote agregado con id ${id}`,
      description: `Coordenadas: ${coordinates.latitude}, ${coordinates.longitude}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    reset();
    setCoordinates(initialCoordinatesState);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar nuevo cenote</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Latitud</FormLabel>
            <Input
              name='latitude'
              value={coordinates.latitude}
              onChange={handleChange}
              type='number'
            />
          </FormControl>
          <FormControl>
            <FormLabel>Longitud</FormLabel>
            <Input
              name='longitude'
              value={coordinates.longitude}
              onChange={handleChange}
              type='number'
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button isLoading={loading} onClick={handleAddCenote}>
            Agregar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
