import React, { useEffect, useState } from "react";

export default function Pagination(props) {
  const { perPage, currentPage, totalRecords } = props.paginationObject;
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    props.onPageClicked(page);
  }, [page, currentPage]);

  let ButtonCount = Math.floor(Math.ceil(totalRecords / perPage));

  const getButtonsCount = (ButtonCount) => {
    let content = [];
    for (let i = 1; i <= ButtonCount; i++) {
      content.push(i);
    }
    return content;
  };

  const onPageClick = (num) => {
    setPage({ pageNumber: num, isActive: true });
  };

  const setPrevious = () => {
    if (page.pageNumber != 1) {
      setPage({ pageNumber: page.pageNumber - 1, isActive: true } );
    }
  };

  const setNext = () => {
    if (page.pageNumber != ButtonCount) {
      setPage({ pageNumber: page.pageNumber + 1, isActive: true } );
    }
  };

  return (
    <div className="pagination">
      <ul className="pagination-list row">
        <li>
          <span className="pagination-button">
            <button type="button" onClick={setPrevious}>
              Previous
            </button>
          </span>
        </li>
        <li>
          <ul>
            {getButtonsCount(ButtonCount).map((num) => (
              <li className="pagination-item" key={num}>
                <button
                  type="button"
                  className={ page.pageNumber == num && page.isActive ? "page-active" : "" }
                  onClick={() => onPageClick(num)}>
                  {num}
                </button>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <span className="pagination-button">
            <button type="button" onClick={setNext}>
              Next
            </button>
          </span>
        </li>
      </ul>
    </div>
  );
}
