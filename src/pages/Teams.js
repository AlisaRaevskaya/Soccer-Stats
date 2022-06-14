// - Список команд

import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/tables/TeamTable";

export default function Teams() {
  const teamsUrl = "http://api.football-data.org/v2/teams";
  const apiKey = process.env.DOTENV.API_KEY;

  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(getTeams, []);
  function getTeams() {
    axios({
      method: "get",
      url: `${teamsUrl}`,
      headers: { "X-Auth-Token": `${apiKey}` },
    })
      .then(function (response) {
        setIsLoaded(true);
        setTeams(response.data.teams);
        console.log(teams);
      })
      .catch(function (error) {
        setIsLoaded(true);
        setError(error);
        // console.log(error);
      });
  }
  if (!teams) return null;
  
  return (
    <div className="container">
      <h1>Teams</h1>
      <Table teams={teams} />
    </div>
  );
}
