import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table'

const Table = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: "Region",
        accessor: 'region',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    prepareRow,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    useSortBy,
    usePagination);


  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => {
            return <tr>
              {headerGroup.headers.map(header => {
                return (
                  <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                    {header.render('Header')}
                    <span>
                      {header.isSorted
                        ? header.isSortedDesc
                          ? 'V'
                          : 'A'
                        : ''}
                    </span>
                  </th>
                );
              })}
            </tr>
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
      <button type='submit' onClick={() => previousPage()}> Previous </button>
      <button type='submit' onClick={() => nextPage()}> Next </button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
      <br />
      <br />
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <br />
      <br />

      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[5, 10, 15, 20, 25].map(pageSize => (
          <option key={pageSize}
            value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </>
  );
};

export default Table;
