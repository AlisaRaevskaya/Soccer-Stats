import React, { useEffect, useState, useMemo, memo } from "react";
import PropTypes from "prop-types";
import { makeButtonsArray } from "../utils/functions";

const PaginationInner = ({perPage, currentPage, totalRecords, onPageChange}) => {
  const [activePage, setCurrentPage] = useState(currentPage);
  const ButtonCount = useMemo(() => Math.floor(Math.ceil(totalRecords / perPage)), [totalRecords, perPage]);

  useEffect(() => {
    onPageChange(activePage);
  }, [activePage, currentPage]);

  const PaginationButtons = makeButtonsArray(ButtonCount);

  const onPageClick = (num) => {
    setCurrentPage(num);
  };

  const setPrevious = () => {
    if (activePage != 1) {
      setCurrentPage(activePage - 1);
    }
  };

  const setNext = () => {
    if (activePage != ButtonCount) {
      setCurrentPage(activePage + 1);
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
                className={currentPage == num ? "page-active" : ""}
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

PaginationInner.propTypes = {
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  totalRecords: PropTypes.number,
  onPageChange: PropTypes.func,
};

export const Pagination = memo(PaginationInner);
