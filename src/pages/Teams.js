// - Список команд
import React, { useEffect, useState, useMemo } from "react";
import Preloader from "../components/PreLoader";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import ApiFootballData from "../utils/ApiFootballData";
import { TeamCard } from "../components/cards/TeamCard";
import { paginate, filterPosts } from "../utils/functions";
import { defaultPage } from "../utils/variables";

const perPage = 10;

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [displayedTeams, setDisplayedTeams] = useState([]);
  const [resultTeams, setResultTeams] = useState([]);
  const [totalRecords, setTotalRecords] = useState(teams.length);

  const pages = useMemo(() => {
    return paginate(resultTeams, currentPage, perPage);
  }, [resultTeams, currentPage, perPage]);

  useEffect(getTeams, []);

  function getTeams() {
    ApiFootballData.teams("list")
      .then((response) => {
        let teamsPosts = response?.teams.map((item) => {
          const { id, name, crestUrl } = item;
          return (item = { id, name, crestUrl});
        });

        setTeams(teamsPosts);
        setResultTeams(teamsPosts);
        setDisplayedTeams(resultTeams.slice(0, perPage));
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
      setError("No teams found");
    }

    const resultItems = searchResults.map((item) => ({
      id: item[0],
      name: item[1],
      crestUrl: item[2],
    }));

    setResultTeams(resultItems);
    setDisplayedTeams(paginate(resultItems, defaultPage, perPage));
    setTotalRecords(resultItems.length);
  };

  /* Pagination Logic */

  const pageClickHandler = (page) => {
    setCurrentPage(page);
    setDisplayedTeams(pages);
  };

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
           perPage={perPage}
           currentPage={currentPage}
           totalRecords= {totalRecords}
          onPageClicked={pageClickHandler}
        />
      </div>
    );
  }
};

export default Teams;
