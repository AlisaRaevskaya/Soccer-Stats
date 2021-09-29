// - Календарь лиги - список матчей лиги/соревнования
//	List matches across (a set of) competitions.

import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import MultipleDatePicker from 'react-multi-date-picker';
import "react-multi-date-picker/styles/layouts/prime.css";
import List from '../components/List';

// render() {
//   <MultipleDatePicker
//     onSubmit={dates => console.log('selected date', dates)}
//   />
// }
// import "react-calendar/dist/Calendar.css";


export default function Matches() {
  const competitionsUrl = "https://api.football-data.org/v2/competitions";
  const baseUrl = "https://api.football-data.org/v2/competitions/{id}/matches";
  const apiKey = process.env.DOTENV.API_KEY;

  const [competitions, setCompetitions] = useState(events_info);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [date, setDate] = useState(new Date());
  const [id, setCompetitionId] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(getCompetitions, []);

  function getCompetitions() {
    axios({
      method: "get",
      url: `${competitionsUrl}`,
      headers: { "X-Auth-Token": `${apiKey}` },
    })
      .then(function (response) {
        setIsLoaded(true);
        setCompetitions(response.data.competitions);
      })
      .catch(function (error) {
        setIsLoaded(true);
        setError(error);
        // console.log(error);
      });
  }

  if (!competitions){
    return null;
}

 let events_info = competitions.map((item, index) => {
 return removeItem(item);
  });

  function removeItem(obj){
   let obj_new = Object.keys(obj).slice(0,3).filter(key=>(key)).map(key => ({[key]:obj[key]}));
    return obj_new ;
  }

  return (
    <div className="app">
      <h1 className="text-center">React Calendar</h1>
      <div className="calendar-container">
        {/* <Calendar onChange={setDate} value={date} /> */}
        <MultipleDatePicker className="rmdp-prime" showOtherDays onSubmit={date => console.log('selected date', date)}/>
      </div>
      <p className="text-center">
        <span className="bold">Selected Date:</span> {date.toDateString()}
      </p>
      {/* {events} */}
    </div>
  );
}
