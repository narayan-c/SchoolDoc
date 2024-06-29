import { useState, useEffect } from 'react';
import { Column, flexRender, useReactTable, getCoreRowModel, getSortedRowModel,   ExpandedState,
  getExpandedRowModel, ColumnFiltersState, RowData, getFilteredRowModel, VisibilityState} from '@tanstack/react-table'
import "./style.css";
import React from 'react';


declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select'
  }
}

// our pester.dev specific react-table
const PesterDataTable = ({
  columns,
  data,
}) => {

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
 
 
  const table = useReactTable(
    {
      columns,
      data,
      filterFns: {},
      state: {
        columnFilters,
        expanded,
        columnVisibility
      },
      onExpandedChange: setExpanded,
      onColumnVisibilityChange: setColumnVisibility,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getFilteredRowModel: getFilteredRowModel(), //client side filtering
      
    });

  // Render the UI for your table
  return (
    <>
    {/* <input
        value={table.getState().globalFilter || ''}
        onChange={e => table.setGlobalFilter(e.target.value || undefined)}
        placeholder={`Search all fields...`}
      /> */}
      <div>
        <div className="input-group">
          {table.getAllLeafColumns().map((column) => (
              <label key={column.id} >
                <input
                  type="checkbox"
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                />
                {column.id}
              </label>
          ))}
        </div>
      </div>
    <table role="table" style={{display: "contents"}}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} role="row">
            <th>S.N.</th>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                role="columnheader"
                /* className={header.column.columnDef.className} */
                style={{ cursor: "pointer"}}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getIndex() > 0 && header.column.getIndex() < 1 ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody role="rowgroup">
          {table.getRowModel().rows.map((row, i) => {
            return (
              <tr key={row.id} role="row">
                <td>{i + 1}</td>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} role="cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )
          })}
</tbody>
    </table>
    </>
  );
};

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}
  console.log(columnFilterValue);
  console.log(filterVariant);

  return filterVariant === 'range' ? (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === 'select' ? (
    <select
      onChange={e => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option>
    </select>
  ) : (
    <DebouncedInput
      className="w-36 border shadow rounded"
      onChange={value => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
    // See faceted column filters example for datalist search suggestions
  )
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}

export default PesterDataTable;