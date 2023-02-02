import React, { useState } from "react";
import DateHandler from "../utils/DateHandler";
import searchIcon from "../assets/svg/search.svg";
import PropTypes from "prop-types";

const DateFilter = ({ dates, onDateFilterSubmit }) => {
  const { firstDate, lastDate } = dates;
  const [userInput, setUserInput] = useState({
    dateFrom: DateHandler.convertToUTCdate(firstDate),
    dateTo: DateHandler.convertToUTCdate(lastDate),
  });

  const handleSubmit = () => {
    onDateFilterSubmit(userInput);
  };

  const handleDateInputFrom = (from) => {
    if (from) {
      return DateHandler.convertToUTCdate(from);
    } else {
      return DateHandler.convertToUTCdate(firstDate);
    }
  };

  const handleDateInputTo = (to) => {
    console.log(to);
    if (to) {
      return DateHandler.convertToUTCdate(to);
    } else {
      return DateHandler.convertToUTCdate(lastDate);
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
        <span className="dates-filter__caption">Матчи</span>
        <div className="dates-filter__from">
          <span className="pl-1 pr-1">с</span>
          <input
            type="date"
            name="From"
            placeholder="Select date start"
            onChange={dateFromChangeHandler}
            max={userInput.dateTo}
          />
        </div>
        <div className="dates-filter__to">
          <span className="pl-1 pr-1">до</span>
          <input
            type="date"
            placeholder="Select date end"
            name="To"
            onChange={dateToChangeHandler}
            min={userInput.dateFrom}
          />
        </div>
        <div>
          <button className="dates-filter__btn" onClick={handleSubmit}>
            <img src={searchIcon} className="site-search__icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

DateFilter.propTypes = {
  dates: PropTypes.shape({
    firstDate: PropTypes.string,
    lastDate: PropTypes.string,
  }),
  onDateFilterSubmit: PropTypes.func,
};

export default DateFilter;
