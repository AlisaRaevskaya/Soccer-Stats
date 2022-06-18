// - Календарь лиги - список матчей лиги/соревнования
//	List matches across (a set of) competitions.

import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/tables/CompetitionTable";

export default function CompetitionCalendar() {
  const competitionsUrl = "https://api.football-data.org/v2/competitions";
  const baseUrl = "https://api.football-data.org/v2/competitions/{id}/matches";
  const apiKey = process.env.DOTENV.API_KEY;

  const [competitions, setCompetitions] = useState(events_info);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [date, setDate] = useState(new Date());
  const [id, setCompetitionId] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(getMatches, []);

  function getMatches() {
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

  return (
    <div className="container">
      <h1 className="text-center">React Calendar</h1>
      <div className="teams-calendar">
                {/* <Table competitions={competitions} /> */}
    </div>
    </div>
  );
}
