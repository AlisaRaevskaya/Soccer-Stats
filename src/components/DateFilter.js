import React, { useState } from "react";
import searchIcon from "../assets/svg/search.svg";
import PropTypes from "prop-types";
import { convertToUTCdate } from "../utils/datesHandlers";

const DateFilter = ({ dates, onDateFilterSubmit, validationError}) => {
  const { firstDateFrom, lastDateTo } = dates;
  const [userInput, setUserInput] = useState({
    dateFrom: convertToUTCdate(firstDateFrom),
    dateTo: convertToUTCdate(lastDateTo),
  });

  const handleSubmit = () => {
    onDateFilterSubmit(userInput);
  };

  const handleDateInputFrom = (from) => {
    if (from) {
      return convertToUTCdate(from);
    } else {
      return convertToUTCdate(firstDateFrom);
    }
  };

  const handleDateInputTo = (to) => {
    if (to) {
      return convertToUTCdate(to);
    } else {
      return convertToUTCdate(lastDateTo);
    }
  };

  const dateFromChangeHandler = (event) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        dateFrom: handleDateInputFrom(event.target.value),
      };
    });
  };

  const dateToChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, dateTo: handleDateInputTo(event.target.value) };
    });
  };

  return (
    <div className="mt-1 mb-1">
      <div className="dates-filter">
    
        <span>Матчи</span>
        <div className="dates-filter__from">
          <span className="pr-1">с</span>
          <input
            type="date"
            name="From"
            placeholder="Select date start"
            onChange={dateFromChangeHandler}
            max={userInput.dateTo}
            value={userInput.dateFrom}
          />
        </div>
        <div className="dates-filter__to">
          <span className="pr-1">до</span>
          <input
            type="date"
            placeholder="Select date end"
            name="To"
            onChange={dateToChangeHandler}
            min={userInput.dateFrom}
            value={userInput.dateTo}
          />
        </div>
        <div>
          <button className="dates-filter__btn" onClick={handleSubmit}>
            <img src={searchIcon} className="site-search__icon" />
          </button>
        </div>
      </div>
      {validationError && <div className="text-red">{validationError}</div>}
    </div>
  );
};

DateFilter.propTypes = {
  dates: PropTypes.shape({
    firstDateFrom: PropTypes.string,
    lastDateTo: PropTypes.string,
  }),
  onDateFilterSubmit: PropTypes.func,
  validationError: PropTypes.string
};

export default DateFilter;
