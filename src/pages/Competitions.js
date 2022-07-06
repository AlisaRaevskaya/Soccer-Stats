// Список лиг/соревнований

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Preloader from "../components/PreLoader";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

export default function Competitions() {
  const competitionUrl = "http://api.football-data.org/v2/competitions";
  const apiKey = process.env.DOTENV.API_KEY;

  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedCompetitions, setDisplayedCompetitions] = useState([]);
  const perPage = 9;

  const pageClickHandler = (posts) => {
    setDisplayedCompetitions(posts);
  };

  const searchSubmitHandler = (postObj) => {
    let search_results = [];

    postObj.result_posts.forEach((el, index, arr) => {
      search_results[index] = {
        id: arr[index][0],
        name: arr[index][1],
        area: arr[index][2],
      };
    });

    setDisplayedCompetitions(search_results);

  };

  const paginationObject = { perPage: perPage, posts: displayedCompetitions };

  useEffect(getCompetitions, []);

  function getCompetitions() {
    axios({
      method: "get",
      url: `${competitionUrl}`,
      headers: { "X-Auth-Token": `${apiKey}` },
      responseType: "json",
    })
      .then((response) => {
        let competitionsPosts = response.data?.competitions.map((item) => {
          const { id, name, area } = item;
          return (item = { id: id, name: name, area: area.name });
        });
        setCompetitions(competitionsPosts);
        setDisplayedCompetitions(competitionsPosts.slice(0, perPage));
      })
      .catch((error) => {
        setError(error);
        console.log(error);
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
        <h1>Competitions</h1>
        <Search posts={competitions} handleSearchSubmit={searchSubmitHandler} />
        <div className="competition-cards">
          {displayedCompetitions &&
            displayedCompetitions.map((competition) => (
              <div className="card" key={competition.id}>
                <Link to={`/competitions/${competition.id}`}>
                  <div className="card-content">
                    <p className="card-title">League: {competition.name}</p>
                    <p className="card-subtitle">
                      Country: {competition.area}
                    </p>
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
