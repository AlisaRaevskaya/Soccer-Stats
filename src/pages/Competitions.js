// Список лиг/соревнований

import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Preloader from "../components/PreLoader";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import ApiFootballData from "../utils/ApiFootballData";

const Competitions = () => {
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
    ApiFootballData.competitions("list")
      .then((response) => {
        let competitionsPosts = response?.competitions.map((item) => {
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
      <div>
        <h1>Competitions</h1>
        <Search posts={competitions} handleSearchSubmit={searchSubmitHandler} />
        <div className="container text-center">
          <h4> Error: {error} </h4>{" "}
        </div>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="spinner-container">
        <Preloader />
      </div>
    );
  } else {
    return (
      <div>
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
};
export default Competitions;
