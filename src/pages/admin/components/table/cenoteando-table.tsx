/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Filter } from '../../../../components/filter';
import { AddButton } from '../add-button.tsx';
import { TableTypes } from './types';
import { fuzzyFilter } from './utils/filters';
import { LoadingSpinner } from '../../../../components/loading-spinner';

interface TableProps {
  columns: ColumnDef<TableTypes, string>[];
  data: any;
}

export const CenoteandoTable: React.FC<TableProps> = (props) => {
  const { data, columns } = props;
  const [tableData, setTableData] = React.useState(data);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const toast = useToast();
  const [globalFilter, setGlobalFilter] = React.useState<string>('');
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableExpanding: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });

  const sortedDataLength = table.getPreSortedRowModel().rows.length;
  const pageSize: number | string = table.getState().pagination.pageSize;

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <Center minH='container.sm'>
      <VStack spacing={4} width='95%' mb='50px'>
        <Flex width='100%' gap={5}>
          <Box>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon bg='light.100' color='gray.300' />
              </InputLeftElement>
              <Input
                bg='light.100'
                placeholder='Buscar en todas las columnas'
                value={globalFilter ?? ''}
                onChange={(value) => setGlobalFilter(value.target.value)}
              />
            </InputGroup>
          </Box>
          <Box alignSelf='center'>
            {sortedDataLength > 0 && (
              <Badge colorScheme='green'>
                Total de datos {sortedDataLength}
              </Badge>
            )}
          </Box>
          <Box alignSelf='center'>
            <AddButton />
          </Box>
        </Flex>
        <VStack
          spacing={4}
          width='100%'
          justifyContent='center'
          direction='column'
        >
          <Card width='95%'>
            <Box>
              <TableContainer
                maxH='container.sm'
                overflowY={pageSize > 10 ? 'scroll' : 'auto'}
              >
                <Table variant='striped' size='sm' overflow='scroll'>
                  <Thead>
                    {table.getHeaderGroups().map((headerGroups) => (
                      <Tr key={headerGroups.id}>
                        {headerGroups.headers.map((header) => (
                          <Th key={header.id}>
                            {header.isPlaceholder ? null : (
                              <>
                                <Flex
                                  gap={1}
                                  onClick={header.column.getToggleSortingHandler()}
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                >
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {{
                                    asc: <ChevronUpIcon boxSize={4} />,
                                    desc: <ChevronDownIcon boxSize={4} />,
                                  }[header.column.getIsSorted() as string] ??
                                    null}
                                </Flex>
                                {header.column.getCanFilter() ? (
                                  <div>
                                    <Filter
                                      column={header.column}
                                      table={table}
                                    />
                                  </div>
                                ) : null}
                              </>
                            )}
                          </Th>
                        ))}
                      </Tr>
                    ))}
                  </Thead>
                  <Tbody>
                    {table.getRowModel().rows.map((row, i) => {
                      return (
                        <Tr key={`tr-${row.id}-${i}`}>
                          {row.getVisibleCells().map((cell, index) => {
                            return (
                              <Td
                                key={`td-${cell.id}-${index}`}
                                whiteSpace='break-spaces'
                                maxW='80'
                                minW='40'
                              >
                                <Tooltip label={cell.getValue() as string}>
                                  <Text noOfLines={[2, 2, 1]} onClick={() => {
                                    navigator.clipboard.writeText(cell.getValue() as string);
                                    toast({
                                      title: 'Texto copiado!',
                                      status: 'success',
                                      duration: 3000,
                                      isClosable: true,
                                    });
                                  }} >
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </Text>
                                </Tooltip>
                              </Td>
                            );
                          })}
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        </VStack>
        <VStack width='100%' justifyContent='center' direction='column'>
          <Flex width='100%' justify='space-evenly'>
            <Flex width='33%' justify='flex-start' gap={4}>
              <Box>
                <Select
                  colorScheme='light'
                  color='light.text'
                  bg='light.500'
                  value={pageSize}
                  onChange={(e) => {
                    if (e.target.value === 'todos') {
                      table.setPageSize(sortedDataLength);
                      return;
                    }
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[
                    10,
                    20,
                    30,
                    40,
                    50,
                    60,
                    70,
                    80,
                    90,
                    100,
                    sortedDataLength,
                  ].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      <Text color='light.text'>Mostrar {pageSize}</Text>
                    </option>
                  ))}
                </Select>
              </Box>
            </Flex>
            <Flex width='33%' gap={2} justify='center'>
              <Box alignSelf='flex-start'>
                <Text fontSize='md' color='light.principal'>
                  Página
                </Text>
                <Text as='b' color='light.principal'>
                  {table.getState().pagination.pageIndex + 1} de{' '}
                  {table.getPageCount()}
                </Text>
              </Box>
            </Flex>
            <Flex width='33%' gap={2} justify='flex-end'>
              <Box>
                <Button
                  onClick={() => table.previousPage()}
                  isDisabled={!table.getCanPreviousPage()}
                >
                  Anterior
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => table.nextPage()}
                  isDisabled={!table.getCanNextPage()}
                >
                  Siguiente
                </Button>
              </Box>
            </Flex>
          </Flex>
        </VStack>
      </VStack>
    </Center>
  );
};
