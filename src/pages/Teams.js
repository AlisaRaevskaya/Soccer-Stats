// - Список команд

import React, { useEffect, useState } from "react";
import axios from "axios";
import Preloader from "../components/PreLoader";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function Teams() {
  const teamsUrl = "http://api.football-data.org/v2/teams";
  const apiKey = process.env.DOTENV.API_KEY;

  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedTeams, setDisplayedTeams] = useState([]);
  const perPage = 10;

  const pageClickHandler = (posts) => {
    setDisplayedTeams(posts);
  };

  const paginationObject = { perPage: perPage, posts: teams };

  // console.log(displayedTeams);

  useEffect(getTeams, []);

  function getTeams() {
    axios({
      method: "get",
      url: `${teamsUrl}`,
      headers: { "X-Auth-Token": `${apiKey}` },
    })
      .then((response) => {
        let teamsPosts = response.data?.teams.map((item) => {
          const { id, name, crestUrl } = item;
          return (item = { id: id, name: name, crestUrl: crestUrl });
        });
        setTeams(teamsPosts);
        setDisplayedTeams(teamsPosts.slice(0, perPage));
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

        <div className="team-cards">
          {displayedTeams &&
            displayedTeams.map((team) => (
              <div className="card" key={team.id}>
                <Link to={`/teams/${team.id}`}>
                  <div className="card-content">
                    <p className="card-title">League: {team.name}</p>
                    <figure className="card-image">
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
        <Pagination
          paginationObject={paginationObject}
          onPageClicked={pageClickHandler}
        />
      </div>
    );
  }
}
