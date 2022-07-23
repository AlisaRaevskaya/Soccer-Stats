import React, { useEffect, useState } from "react";

const DateFilter = (props) => {
  // const [dateFrom, setDateFrom] = useState();
  // const [dateTo, setDateTo] = useSate();

  const [userInput, setUserInput] = useState({ dateFrom: "", dateTo: "" });

  function setZerosForDates(dateNumber) {
    dateNumber > 9
      ? (dateNumber = dateNumber)
      : (dateNumber = "0" + dateNumber);
    console.log("check 0" + "" + dateNumber);
  }

  const getFirstDate = () => {
    let firstDate = setDate(matches[0].utcDate);
    const [dd, mm, yyyy] = firstDate.split("-");
    let month = setZerosForDates(mm);
    let date = setZerosForDates(dd);
    return `${yyyy}-${month}-${date}`;
  };

  const getCurrentDate = () => {
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();

    month = setZerosForDates(month);
    date = setZerosForDates(date);

    console.log(new Date().getFullYear() + "-" + month + "-" + date);

    return new Date().getFullYear() + "-" + month + "-" + date;
  };


  const handleDateInputFrom = (from) => {
    if (from) {
      return from;
    } else {
     return getFirstDate();
    }
  };

  const handleDateInputTo = (to) => {
    if (to) {
      console.log(to);
     return to;
    } else {
      return getCurrentDate();
    }
  };

  const dateFromChangeHandler = (event) => {

    setUserInput((prevState) => {
      return { ...prevState, dateFrom: handleDateInputFrom(event.target.value) };
    });

    props.onDateFilterSubmit(userInput);
  };

  const dateToChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, dateTo: handleDateInputTo(event.target.value) };
    });

    props.onDateFilterSubmit(userInput);
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
