import React from 'react';

import {
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
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react';

import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@chakra-ui/icons';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Filter } from '../filter';
import { TableTypes } from './types';

interface TableProps {
  columns: ColumnDef<TableTypes, string>[];
  data: any;
}



const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const CenoteandoTable: React.FC<TableProps> = (props) => {
  const { data, columns } = props;
  const [tableData] = React.useState(data);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
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

  return (
    <Center>
      <VStack spacing={4} width='95%'>
        <Box width='100%'>
          <InputGroup width='25%'>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input
              placeholder='Buscar en todas las columnas'
              value={globalFilter ?? ''}
              onChange={(value) => setGlobalFilter(value.target.value)}
            />
          </InputGroup>
        </Box>
        <Card>
          <Box overflow={'scroll'}>
            <Table variant={'simple'} size='md' overflow={'scroll'}>
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
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: <ChevronUpIcon boxSize={4} />,
                                desc: <ChevronDownIcon boxSize={4} />,
                              }[header.column.getIsSorted() as string] ?? null}
                            </Flex>
                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter column={header.column} table={table} />
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
                          <Td key={`td-${cell.id}-${index}`} isTruncated>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Card>
        <Flex width='100%' justify='space-evenly'>
          <Flex width='33%' justify='flex-start' gap={4}>
            <Box>
              <Select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </Select>
            </Box>
          </Flex>
          <Flex width='33%' gap={2} justify='center'>
            <Box alignSelf='flex-start'>
              <Text fontSize='md'>Página</Text>
              <Text as='b'>
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
    </Center>
  );
};
