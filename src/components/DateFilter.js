import React ,{useState } from "react";


const DateFilter = () => {
  // const [dateFrom, setDateFrom] = useState();
  // const [dateTo, setDateTo] = useSate();

  const[userInput, setUserInput]= useState({ dateFrom:'', dateTo:'' })

  const dateFromChangeHandler = (event) => {
    setUserInput((prevState) => { return { ...prevState, dateFrom: event.target.value} });
  };

  const dateToChangeHandler = (event) => {
    setUserInput((prevState) => { return { ...prevState, dateTo: event.target.value} });
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
