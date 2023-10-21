import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup } from '@chakra-ui/react';
import { Table as ReactTable } from '@tanstack/react-table';
import { Column } from '@tanstack/table-core';
import React from 'react';

export function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: ReactTable<any>;
}) {
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return (
    <>
      <InputGroup>
        <datalist id={column.id + 'list'}>
          {sortedUniqueValues.map((value, index) => (
            <option value={value} key={`filter-key-${value}-${index}`} />
          ))}
        </datalist>
        <Input
          type='text'
          size={'xs'}
          value={(columnFilterValue ?? '') as string}
          onChange={(value) => column.setFilterValue(value.target.value)}
          placeholder={`Buscar... (${column.getFacetedUniqueValues().size})`}
          list={column.id + 'list'}
        />
        {columnFilterValue ? (
          <IconButton
            variant='ghost'
            onClick={() => column.setFilterValue('')}
            aria-label='Clear search'
            icon={<CloseIcon />}
            size='xs'
          />
        ) : null}
      </InputGroup>
    </>
  );
}
