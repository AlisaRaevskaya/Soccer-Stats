// Список лиг/соревнований

import React, { useEffect, useState, useMemo } from "react";
import Preloader from "../components/PreLoader";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import ApiFootballData from "../utils/ApiFootballData";
import CompetitionCard from "../components/cards/CompetitionCard";

const Competitions = () => {
  const defaultPage = { pageNumber: 1, isActive: true };
  const perPage = 9;

  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [resultCompetitions, setResultCompetitions]= useState([]);
  const [displayedCompetitions, setDisplayedCompetitions] = useState([]);
  const [totalRecords, setTotalRecords] = useState(competitions.length);
  const [searchString, setSearchString] = useState("");

  const paginationObject = {
    perPage: perPage,
    currentPage: currentPage,
    totalRecords: totalRecords,
  };

  useEffect(getCompetitions, []);

  // useEffect(setDisplayedCompetitions(pages), []);

  console.log(displayedCompetitions);

  function getCompetitions() {
    ApiFootballData.competitions("list")
      .then((response) => {
        let competitionsPosts = response?.competitions.map((item) => {
          const { id, name, area } = item;
          return (item = { id: id, name: name, area: area.name });
        });

        setCompetitions(competitionsPosts);
        setResultCompetitions(competitionsPosts);
        setDisplayedCompetitions(paginate(competitionsPosts, currentPage, perPage));
        setTotalRecords(competitionsPosts.length);
      })
      .catch((error) => {
        setError("Повторите попытку позже.");
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

  const pages = useMemo(() => paginate(resultCompetitions, currentPage, perPage), [resultCompetitions, currentPage, perPage]);

  // Search

  function filterPosts(arr, searchString) {
    let strLowCase = searchString.toLowerCase();

    let stringArray = arr.map((item) => (item = Object.values(item).join(",")));

    let results = stringArray.filter((post) =>
      post.toLowerCase().includes(strLowCase)
    );

    return results.map((element) => element.split(","));
  }

  const onSearchSubmit = (str) => {

    setSearchString(str);
    let searchResults = filterPosts(competitions, str).map((el) =>
      parseInt(el.slice(0, 1))
    );

    if (str) {
      if (!searchResults.length) {
        setError("No posts found");
      }
    } else {
      searchResults = competitions.map((el) => (el = el.id));
      setError(null);
    }

    let search_results = [];

    searchResults.forEach((item_id) => {
      competitions.forEach((item) => {
        if (item.id == item_id) {
          search_results.push(item);
        }
      });
    });

    console.log(search_results);

    setResultCompetitions(search_results);
    setDisplayedCompetitions(paginate(search_results, currentPage, perPage));
    setTotalRecords(search_results.length);
  };

 
  if (error) {
    return (
      <div>
        <h1>Лиги</h1>
        <Search onSearchSubmit={onSearchSubmit} />
        <div className="text-center">
          <h4>{error} </h4>{" "}
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
        <h1>Лиги</h1>
        <Search onSearchSubmit={onSearchSubmit} />
        <div className="competition-cards">
          {displayedCompetitions &&
            displayedCompetitions.map((competition) => (
              <CompetitionCard competition={competition}  key={competition.id}/>
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
