import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeButtonsArray } from "../utils/functions";

const Pagination = ({ paginationObject, onPageClicked }) => {
  const { perPage, currentPage, totalRecords } = paginationObject;
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    onPageClicked(page);
  }, [page, currentPage]);

  const ButtonCount = Math.floor(Math.ceil(totalRecords / perPage));
  const PaginationButtons = makeButtonsArray(ButtonCount);

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

Pagination.propTypes = {
  paginationObject: PropTypes.shape({
    perPage: PropTypes.number,
    currentPage: PropTypes.shape({
      isActive: PropTypes.bool,
      pageNumber: PropTypes.number,
    }),
    totalRecords: PropTypes.number,
  }),
  onPageClicked: PropTypes.func,
};

export default Pagination;
