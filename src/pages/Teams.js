// - Список команд

import React, { useEffect, useState, useMemo } from "react";
import Preloader from "../components/PreLoader";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import ApiFootballData from "../utils/ApiFootballData";
import TeamCard from "../components/cards/TeamCard";

const Teams = () => {
  const perPage = 10;
  const defaultPage = { pageNumber: 1, isActive: true };

  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [displayedTeams, setDisplayedTeams] = useState(teams.slice(0, perPage));
  const [totalRecords, setTotalRecords] = useState(teams.length);

  useEffect(getTeams, []);

  function getTeams() {
    ApiFootballData.teams("list")
      .then((response) => {
        let teamsPosts = response?.teams.map((item) => {
          const { id, name, crestUrl } = item;
          return (item = { id: id, name: name, crestUrl: crestUrl });
        });

        setTeams(teamsPosts);
        setDisplayedTeams(teamsPosts.slice(0, perPage));
        setTotalRecords(teamsPosts.length);
      })
      .catch((error) => {
        setError("Error Occured");
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }

  // Search
  const searchSubmitHandler = (postObj) => {
    let search_results = [];

    setError(null);

    postObj.result_posts.forEach((item_id, index) => {
      teams.forEach((item) => {
        if (item.id == item_id) {
          search_results.push(item);
        }
      });
    });

    if (postObj.no_results_text) {
      setError(postObj.no_results_text);
    }

    setDisplayedTeams(search_results.slice(0, perPage));
    setTotalRecords(search_results.length);
  };

  // Pagination
  const pageClickHandler = (page) => {
    setDisplayedTeams(pages);
    setCurrentPage(page);
  };

  const paginationObject = {
    perPage: perPage,
    currentPage: currentPage,
    totalRecords: totalRecords,
  };

  const paginate = (teams, currentPage, perPage) => {
    let from = currentPage.pageNumber * perPage - perPage;
    let to = currentPage.pageNumber * perPage;
    return teams.slice(from, to);
  };

  const pages = useMemo(() => {
    return paginate(teams, currentPage, perPage);
  }, [teams, currentPage, perPage]);

  if (error) {
    return (
      <div>
        <h1>Teams</h1>
        <Search posts={teams} handleSearchSubmit={searchSubmitHandler} />
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
        <h1>Teams</h1>
        <Search posts={teams} handleSearchSubmit={searchSubmitHandler} />

        <div className="team-cards">
          {displayedTeams &&
            displayedTeams.map((team) => (<TeamCard team={team} />))}
        </div>
        <Pagination
          paginationObject={paginationObject}
          onPageClicked={pageClickHandler}
        />
      </div>
    );
  }
};

export default Teams;
