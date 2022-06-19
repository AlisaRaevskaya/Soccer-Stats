// Список лиг/соревнований

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Preloader from "../components/PreLoader";

export default function Competitions() {
  const competitionUrl = "http://api.football-data.org/v2/competitions";
  const apiKey = process.env.DOTENV.API_KEY;

  const [competitions, setCompetitions] = React.useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(getCompetitions, []);

  function getCompetitions() {
    axios({
      method: "get",
      url: `${competitionUrl}`,
      headers: { "X-Auth-Token": `${apiKey}` },
      responseType: "json",
    })
      .then((response) => {
        setCompetitions(response.data.competitions);
        // console.log(competitions);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
    // return () => cleanupFunction = true;
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
        <h1>Competitions</h1>
        <div class="competition-cards">
          {competitions &&
            competitions.map((competition) => (
              <div class="card" key={competition.id}>
                <Link to={`/competitions/${competition.id}`}>
                  <div class="card-content">
                    <p class="card-title">League: {competition.name}</p>
                    <p class="card-subtitle">
                      Country: {competition.area.name}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
