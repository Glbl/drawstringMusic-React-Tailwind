import React, { useState, useEffect } from 'react';
import './style.scss';
import _ from 'lodash';

export default function Pagination(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState(
    _.range(
      0,
      Math.ceil(props.total / props.dataPerPage) > 5
        ? 5
        : Math.ceil(props.total / props.dataPerPage)
    )
  );

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
    props.setCurrentPage(Number(event.target.id));
  };
  const renderPageNumbers = pageNumbers.map((n, i) => {
    return (
      <li
        key={n + 1}
        id={n + 1}
        onClick={handleClick}
        className={`${currentPage === n + 1 ? 'active' : ''}`}
      >
        {n + 1}
      </li>
    );
  });
  const onClickNext = () => {
    if (props.currentLength < 20) return;
    let pNumbers = [...pageNumbers];
    let last = pNumbers[pNumbers.length - 1];
    pNumbers.shift();
    pNumbers.push(last + 1);
    setPageNumbers(pNumbers);
    setCurrentPage(currentPage + 1);
    props.setCurrentPage(currentPage + 1);
  };
  const onClickPrev = () => {
    let pNumbers = [...pageNumbers];
    let first = pNumbers[0];
    setCurrentPage(currentPage - 1);
    props.setCurrentPage(currentPage - 1);
    if (first <= 0) {
      return;
    }
    pNumbers.pop();
    pNumbers.unshift(first - 1);
    setPageNumbers(pNumbers);
  };
  useEffect(() => {
    setPageNumbers(
      _.range(
        0,
        Math.ceil(props.total / props.dataPerPage) > 5
          ? 5
          : Math.ceil(props.total / props.dataPerPage)
      )
    );
  }, [props.total, props.dataPerPage]);
  return (
    <div>
      <ul id='page-numbers' className='paginate'>
        {currentPage !== 1 && (
          <li onClick={onClickPrev} className='flex place-items-center'>
            <span className='text-secondaryDark'>&lt;</span>
          </li>
        )}
        {pageNumbers.length > 1 ? renderPageNumbers : null}
        {pageNumbers.length > 4 ? (
          <li
            onClick={onClickNext}
            className={`flex place-items-center ${
              props.currentLength < 20 ? 'disabled' : ''
            }`}
          >
            <span className='text-secondaryDark'>&gt;</span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
