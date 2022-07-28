import React, { useEffect, useState } from "react";
import DateHandler from "../utils/DateHandler";

const DateFilter = (props) => {
  // const [dateFrom, setDateFrom] = useState();
  // const [dateTo, setDateTo] = useSate();


  const [firstDate, lastDate] = props.dates;

  const [userInput, setUserInput] = useState({ dateFrom: "", dateTo: "" });

  useEffect(() => {
    props.onDateFilterSubmit(userInput);
  }, [userInput]);

  const handleDateInputFrom = (from) => {
    if (from) {
      return DateHandler.covertToUTCdate(from);
    } else {
      return DateHandler.getFirstOrLastDate(firstDate);
    }
  };

  const handleDateInputTo = (to) => {
    if (to) {
      console.log('to ' + DateHandler.covertToUTCdate(to));
      return DateHandler.covertToUTCdate(to);

    } else {
      console.log('to out' + DateHandler.covertToUTCdate(to));
      return DateHandler.getFirstOrLastDate(lastDate);
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
