import React, { useEffect, useState } from "react";
import DateHandler from "../utils/DateHandler";

const DateFilter = (props) => {
  const { lastDate, firstDate } = props.dates;
  const [userInput, setUserInput] = useState({ dateFrom: "", dateTo: "" });

  useEffect(() => {
    props.onDateFilterSubmit(userInput);
  }, [userInput]);

  const handleDateInputFrom = (from) => {
    if (from) {
      return DateHandler.convertToUTCdate(from);
    } else {
      return DateHandler.convertToUTCdate(lastDate);
    }
  };

  const handleDateInputTo = (to) => {
    if (to) {
      return DateHandler.convertToUTCdate(to);
    } else {
      return DateHandler.convertToUTCdate(firstDate);
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

  console.log(userInput);

  return (
    <div className="mt-1 mb-1">

      <div className="dates-filter">
      <span className="dates-filter__caption">Матчи</span>
        <div className="dates-filter__from">
          <span className="pl-1 pr-1"> с</span>
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
      </div>
    </div>
  );
};
export default DateFilter;
