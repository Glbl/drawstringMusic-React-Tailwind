import React, { useMemo, useEffect, useState, useRef, forwardRef } from 'react';
import { useTable, useFilters, useSortBy, useRowSelect, useGlobalFilter } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'

import './ReactTable.css';
// import NoRecords from '../NoRecords'
// import StatusColors from '../../constants/statusColors';

export default function ReactTable({
  inputData,
  inputColumns,
  enableCheckbox,
  globalFilterValue,
  loading,
  noRecordTitle,
  backButton,
  refreshButton,
  leftAlignHeadings,
  pointerOnRow,
  handleSort,
  handleFilter,
  setFilter,
  filterBy,
  handleRowClick,
  NoRecord,
  setRowHeight
}) {
  const wrapperRef = useRef(null);
  const [activeHeader, setActiveHeader] = useState('');
  const [selectedGlobalFilter, setSelectedGlobalFilter] = useState('');
  const columns = useMemo(() => inputColumns, []);
  const data = useMemo(() => inputData, [inputData]);
  let navigate = useNavigate();

  const onBack = () => {
    navigate(-1)
  };

  const onRefresh = () => {
    window.location.reload();
  };

  const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        if (resolvedRef.current) {
          resolvedRef.current.indeterminate = indeterminate;
        }
      }, [resolvedRef, indeterminate]);

      return (
        <div className="py-2 px-2">
          <label className="bg-white border-2 border-gray-300 w-7 h-7 flex flex-shrink-0 justify-center items-center focus:ring-indigo-600 rounded cursor-pointer">
            <input
              id="checkedG"
              name="checkedG"
              type="checkbox"
              className="opacity-0 absolute cursor-pointer"
              inputRef={resolvedRef}
              indeterminate={indeterminate}
              {...rest}
            />
            <i id="checkIcon" className="fas fa-square fill-current hidden text-center text-xl text-indigo-600 pointer-events-none rounded" />
          </label>
        </div>
      );
    });

  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter, state: { sortBy, filters },
  } = useTable({
    columns,
    data,
    manualSortBy: true,
    manualFilters: true,
    initialState: {
      hiddenColumns: columns
        .filter(col => col.show === false)
        .map(col => col.accessor),
    },
  },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useRowSelect,
    (hooks) => {
      if (enableCheckbox) {
        hooks.visibleColumns.push(columns => [
          // Let's make a column for selection
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
            disableFilters: true,
            disableSortBy: true,
            disableBorder: true,
            width: '2%',
          },
          ...columns,
        ]);
      }
    });

  const getIcon = (icon) => {
    switch (icon) {
      case 'search':
        return (<i className="fal fa-search cursor-pointer text-lg" />);
      case 'filter':
        return (<i className="fas fa-caret-down cursor-pointer text-lg text-gray-500" />);
      default:
        return ('');
    }
  };

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setActiveHeader('');
    }
  };

  const handleHeaderClick = (event, id) => {
    setActiveHeader(v => (v === id ? 0 : id));
  };

  useEffect(() => {
    handleSort(sortBy)
  }, [sortBy]);

  useEffect(() => {
    if (handleFilter) handleFilter(filters);
  }, [filters]);

  useEffect(() => {
    setSelectedGlobalFilter(globalFilterValue);
  }, [globalFilterValue]);

  useEffect(() => {
    setGlobalFilter(selectedGlobalFilter);
  }, [selectedGlobalFilter]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='overflow-x-scroll'>
      <table {...getTableProps()} className="relative w-full bg-white">
        <thead className="py-1.5 border-b border-gray-300">
          {headerGroups && headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers && headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} width={column.width} className="sticky top-0 py-3 px-3 font-inter text-center text-sm font-normal bg-white text-gray-400" key={column.Header}>
                  <div className={`flex ${(leftAlignHeadings?.includes(column.id)) ? 'justify-start' : 'justify-center'} items-center whitespace-nowrap align-middle`}>
                    <div className="">{column.render('Header')}</div>
                    <div className="pl-2">
                      {column.icon &&
                        <span onClick={e => handleHeaderClick(e, column.id)} className="p-0.5">
                          {getIcon(column.icon)}
                        </span>
                      }
                      {
                        !column.disableSortBy &&
                        <span>
                          {column.isSorted
                            ? (column.isSortedDesc
                              ? <ChevronDownIcon className='w-4 h-4 ml-2 text-secondary' />
                              : <ChevronUpIcon className='w-4 h-4 ml-2 text-secondary' />
                            )
                            : <ChevronDownIcon className='w-4 h-4 ml-2 text-secondary' />
                          }
                        </span>
                      }
                      {/* {
                        column.id === (filterBy && filterBy.column) &&
                        <span
                          className="ml-1 py-1 px-3 text-sm text-white rounded-lg"
                          style={{ backgroundColor: ((StatusColors.find(f => f.title === (filterBy && filterBy.value)) || {}).color || (filterBy.value === 'USD' ? '#18C684' : '#5546FF'))}}
                        >
                          {filterBy && filterBy.value}
                          <span className="pl-1 text-white">
                            <i className="far fa-times-circle cursor-pointer" onClick={() => setFilter(null)} />
                          </span>
                        </span>
                      } */}
                    </div>
                  </div>
                  {
                    activeHeader === column.id
                      ? (
                        <div ref={wrapperRef}>
                          <div className="absolute z-50 bg-white shadow-md mt-4 rounded-lg">
                            {column.canFilter ? column.render('Filter') : null}
                          </div>
                        </div>
                      )
                      : null
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="">
          {rows && rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                id="table_row"
                {...row.getRowProps()}
                className={`${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'} font-inter zoom group ${pointerOnRow && 'cursor-pointer'} z-10 rounded-xl ease-linear duration-100`}
                onClick={(e) => pointerOnRow && handleRowClick(row.original)}
                onMouseEnter={() => { setRowHeight(document.getElementById('table_row')?.offsetHeight) }}
              >
                {row.cells && row.cells.map(cell =>
                  <td {...cell.getCellProps()} className="py-3 px-3"> {/* eslint-disable-line */}
                    {cell.isGrouped ? (
                      // If it's a grouped cell, add an expander and row count
                      <>
                        {cell.render('Cell')}
                      </>
                    ) : cell.isAggregated ? (
                      // If the cell is aggregated, use the Aggregated
                      // renderer for cell
                      cell.render('Aggregated')
                    ) : cell.isPlaceholder ? cell.render('Placeholder') : ( // For cells with repeated values, render null
                      // Otherwise, just render the regular cell
                      cell.render('Cell')
                    )}
                  </td>)}
              </tr>
            );
          })
          }
        </tbody>
      </table>
      {
        loading
          ?
          "Loading..."
          : (!inputData.length)
            ?
            "No record"
            // <NoRecord
            //   title={noRecordTitle}
            //   onBack={backButton ? onBack : false}
            //   onRefresh={refreshButton ? onRefresh : false}
            // />
            : null
      }
    </div>
  );
}