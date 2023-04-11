import React, { useContext, useEffect } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { AdminTablesContext } from '../../context/admin-context';
import { useApi } from '../../../../hooks/useApi';
import { CenoteModel } from '../../../../models/CenotesTypes';
import { TableTypes } from '../table/types';

interface DeleteButtonProps {
  modalState: TableTypes;
  onCloseModal: () => void;
}
export const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const { route, tableData, setTableData } = useContext(AdminTablesContext);
  const { modalState, onCloseModal } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>(null);
  const { status, loading, error, fetch } = useApi(
    `api/${route}/${modalState.id}`,
    'delete'
  );

  useEffect(() => {
    if (status === 200) {
      onCloseModal();
      const newArr = (tableData as CenoteModel[])
        .filter((data) => data.id !== modalState.id)
        .map((cenote) => new CenoteModel(cenote));
      setTableData([...newArr]);
    }
  }, [status]);

  return (
    <>
      <Button
        aria-label=''
        leftIcon={<DeleteIcon />}
        colorScheme='red'
        isLoading={loading}
        onClick={() => onOpen()}
      >
        Borrar
      </Button>
      {isOpen && (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete?
              </AlertDialogHeader>

              <AlertDialogBody>
                Estás seguro? esto no puede deshacerse
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onClose} ref={cancelRef}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={() => fetch()} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  );
};
