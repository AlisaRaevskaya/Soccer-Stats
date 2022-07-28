import React, { useEffect, useState } from "react";
import DateHandler from "../utils/DateHandler";

const DateFilter = (props) => {
  const [firstDate, lastDate] = props.dates;
  const [userInput, setUserInput] = useState({ dateFrom: "", dateTo: "" });

  useEffect(() => {
    props.onDateFilterSubmit(userInput);
  }, [userInput]);

  const handleDateInputFrom = (from) => {
    if (from) {
      return DateHandler.covertToUTCdate(from);
    } 
    else {
      let firstDateItem = firstDate.utcDate;
      return DateHandler.covertToUTCdate(firstDateItem);
    }
  };

  const handleDateInputTo = (to) => {
    if (to) {
      return DateHandler.covertToUTCdate(to);
    }
    else {
     let lastDateItem = lastDate.utcDate;
      return DateHandler.covertToUTCdate(lastDateItem);
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
      <div className="row justify-start">
        <span>Матчи</span>
        <span className="ml-1 mr-1"> с</span>
        <input
          type="date"
          name="From"
          placeholder="Select date start"
          onChange={dateFromChangeHandler}
        />
        <span className="ml-1 mr-1">до</span>
        <input
          type="date"
          placeholder="Select date end"
          name="To"
          onChange={dateToChangeHandler}
        />
      </div>
    </div>
  );
};
export default DateFilter;
