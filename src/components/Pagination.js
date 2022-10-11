import React, { useEffect, useState } from "react";

const getButtonsArray = (ButtonCount) => {
  let arr = [];
  for (let i = 1; i <= ButtonCount; i++) {
    arr.push(i);
  }
  return arr;
};

const Pagination = (props) => {
  const { perPage, currentPage, totalRecords } = props.paginationObject;
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    props.onPageClicked(page);
  }, [page, currentPage]);

  const ButtonCount = Math.floor(Math.ceil(totalRecords / perPage));
  const PaginationButtons = getButtonsArray(ButtonCount);

  const onPageClick = (num) => {
    setPage({ pageNumber: num, isActive: true });
  };

  const setPrevious = () => {
    if (page.pageNumber != 1) {
      setPage({ pageNumber: page.pageNumber - 1, isActive: true });
    }
  };

  const setNext = () => {
    if (page.pageNumber != ButtonCount) {
      setPage({ pageNumber: page.pageNumber + 1, isActive: true });
    }
  };

  return (
    <div className="pagination">
      <ul className="pagination-list">
        <li className="pagination-item">
          <span>
            <button type="button" onClick={setPrevious}>
              &#60;&#60;
            </button>
          </span>
        </li>
        {PaginationButtons &&
          PaginationButtons.map((num) => (
            <li className="pagination-item" key={num}>
              <button
                type="button"
                className={
                  page.pageNumber == num && page.isActive ? "page-active" : ""
                }
                onClick={() => onPageClick(num)}
              >
                {num}
              </button>
            </li>
          ))}
        <li className="pagination-item">
          <span>
            <button type="button" onClick={setNext}>
              &#62;&#62;
            </button>
          </span>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
