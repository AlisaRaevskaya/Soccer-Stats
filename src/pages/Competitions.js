// Список лиг/соревнований

import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Preloader from "../components/PreLoader";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

export default function Competitions() {
  const competitionUrl = "http://api.football-data.org/v2/competitions";
  const apiKey = process.env.DOTENV.API_KEY;
  const defaultPage = { pageNumber: 1, isActive: true };
  const perPage = 9;

  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [displayedCompetitions, setDisplayedCompetitions] = useState([]);
  const [totalRecords, setTotalRecords] = useState(competitions.length);

  const paginationObject = {
    perPage: perPage,
    currentPage: currentPage,
    totalRecords: totalRecords,
  };
  

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
        setTotalRecords(competitionsPosts.length);
      })
      .catch((error) => {
        setError("Error Occured");
        //console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }

  //  Pagination

  const pageClickHandler = (page) => {
    setCurrentPage(page);
    setDisplayedCompetitions(pages);
  };

  const paginate = (competitions, currentPage, perPage) => {
    let from = currentPage.pageNumber * perPage - perPage;
    let to = currentPage.pageNumber * perPage;
    return competitions.slice(from, to);
  };

  const pages = useMemo(() => {
    return paginate(competitions, currentPage, perPage);
  }, [competitions, currentPage, perPage]);

  // Search
  const searchSubmitHandler = (postObj) => {

    let search_results = [];

    setError(null);

    postObj.result_posts.forEach((item_id, index) => {
      competitions.forEach((item) => {
        if (item.id == item_id) {
          search_results.push(item);
        }
      });
    });

    if (postObj.no_results_text) {
      setError(postObj.no_results_text);
    }

    setDisplayedCompetitions(search_results.slice(0, perPage));
    setTotalRecords(search_results.length);
  };


  if (error) {
    return (
      <div className="container">
        <h1>Competitions</h1>
        <Search posts={competitions} handleSearchSubmit={searchSubmitHandler} />
        <div className="container text-center">
          <h4> Error: {error} </h4>{" "}
        </div>
      </div>
    );
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
                    <p className="card-subtitle">Country: {competition.area}</p>
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
