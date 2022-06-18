// - Список команд

import React, { useEffect, useState } from "react";
import axios from "axios";
import Preloader from "../components/PreLoader";
import { Link } from "react-router-dom";

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
      .then((response) => {
        setTeams(response.data.teams);
        console.log(teams);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }


  if (error) {
    return <div className="container">Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="container spinner-container">
        <Preloader />
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Teams</h1>

        <div class="team-cards">
          {teams &&
            teams.map((team) => (
              <div class="card" key={team.id}>
                <Link to={`/team/${team.id}/matches`}>
                  <div class="card-content">
                    <p class="card-title">League: {team.name}</p>
                    <figure class="card-image">
                      <img
                        src={team.crestUrl}
                        alt={team.name}
                        width="96"
                        height="96"
                      />
                    </figure>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
