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
  const [resultTeams, setResultTeams] = useState([]);
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
        setResultTeams(teamsPosts);
        setDisplayedTeams(paginate(teamsPosts, currentPage, perPage));
        setTotalRecords(teamsPosts.length);
      })
      .catch((error) => {
        setError("Повторите попытку позже.");
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }

  /* Search Logic */

  function filterPosts(arr, str) {
    let strLowCase = str.toLowerCase();

    let stringArray = arr.map((item) => (item = Object.values(item).join(",")));

    let results = stringArray.filter((post) =>
      post.toLowerCase().includes(strLowCase)
    );

    return results.map((element) => element.split(","));
  }

  const onSearchSubmit = (str) => {
    setError(null);

    let searchResults = filterPosts(teams, str);

    if (!str) {
      searchResults = teams.map((item) =>
        Object.values(item).join(",").split(",")
      );
      setError(null);
    }

    if (!searchResults.length) {
      setError("No posts found");
    }

    let search_results = searchResults.map((item) => ({
      id: item[0],
      name: item[1],
      crestUrl: item[2],
    }));

    setResultTeams(search_results);
    setDisplayedTeams(paginate(search_results, currentPage, perPage));
    setTotalRecords(search_results.length);
  };

  /* Pagination Logic */
  
  const pageClickHandler = (page) => {
    setCurrentPage(page);
    setDisplayedTeams(pages);
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
    return paginate(resultTeams, currentPage, perPage);
  }, [resultTeams, currentPage, perPage]);

  if (error) {
    return (
      <div className="pt-3">
        <h1>Teams</h1>
        <Search onSearchSubmit={onSearchSubmit} />
        <div className="text-center">
          <h4>{error} </h4>
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
      <div className="pt-3">
        <h1>Команды</h1>
        <Search onSearchSubmit={onSearchSubmit} />
        <div className="team-cards">
          {displayedTeams &&
            displayedTeams.map((team) => (
              <TeamCard team={team} key={team.id} />
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

export default Teams;
