import React, { useMemo } from 'react';
import { Column, Table } from '@tanstack/react-table';
import DebouncedInput from './debounced-input';

interface FilterProps<TData> {
  column: Column<TData, unknown>;
  table: Table<TData>;
}

function Filter<TData>({ column, table }: FilterProps<TData>) {
  const firstValue = useMemo(
    () => table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id),
    [table, column.id]
  );

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(() => {
    if (typeof firstValue === 'number') {
      return [];
    }
    return Array.from(column.getFacetedUniqueValues().keys()).sort();
  }, [firstValue, column]);

  if (typeof firstValue === 'number') {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-2 items-center">
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [value, old?.[1]])
            }
            placeholder={`Min ${column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
              }`}
            className="w-full border shadow rounded"
          />
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [old?.[0], value])
            }
            placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
              }`}
            className="w-full border shadow rounded"
          />
        </div>
        <div className="h-1" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any, index) => (
          <option key={index} value={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-full border shadow rounded"
        list={column.id + 'list'}
        autoFocus
        value={(columnFilterValue as string) ?? ''}
        onChange={(value) => column.setFilterValue(value)}
      />
      <div className="h-1" />
    </div>
  );
}

export default Filter;