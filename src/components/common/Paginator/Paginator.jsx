import React, { useState } from 'react';
import classes from '../../Users/Users.module.css';

const Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * pageSize + 1;
  const rightPortionPageNumber = portionNumber * pageSize;
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  const portionCount = Math.ceil(pagesCount / portionSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>
          prev
        </button>
      )}
      {pages
        .filter(
          (page) =>
            page >= leftPortionPageNumber && page <= rightPortionPageNumber
        )
        .map((page) => {
          return (
            <span
              className={currentPage === page && classes.selectedPage}
              onClick={(e) => {
                onPageChanged(page);
              }}
            >
              {page}
            </span>
          );
        })}
      {portionNumber < portionCount && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>
          next
        </button>
      )}
    </div>
  );
};

export default Paginator;
