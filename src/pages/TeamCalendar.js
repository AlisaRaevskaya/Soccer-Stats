import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "../components/tables/MatchesTable";
import Breadcrumbs from "../components/Breadcrumbs";
import DateFilter from "../components/DateFilter";
import Pagination from "../components/Pagination";

const TeamCalendar = (props) => {
  const { id } = useParams();
  const perPage = 10;
  const defaultPage = { pageNumber: 1, isActive: true };
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [matches, setMatches] = useState([]);
  const[displayedMatches, setDisplayedMatches] = useState();
  const [totalRecords, setTotalRecords] = useState(matches.length);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(getMatches, [id]);

  function getMatches() {
    axios({
      method: "get",
      url:
        "https://api.football-data.org/v2/teams/" + parseInt(id) + "/matches",
      headers: { "X-Auth-Token": "1e76ed510bd246519dedbf03833e5322" },
    })
      .then((response) => {
        localStorage.setItem(
          "savedMatches",
          JSON.stringify(response.data.matches)
        );
        setMatches(response.data.matches);
        setDisplayedMatches(response.data.matches.slice(0, perPage));
        setTotalRecords(response.data.matches.length)
      })
      .catch((err) => {
        if (err.response) {
          let errorMessage = "Не удалось загрузить данные из-за ошибки доступа";
          // client received an error response (5xx, 4xx)
          console.log(err.response);
        } else if (err.request) {
          // client never received a response, or request never left
          //let errorMessage = "Ошибка сети";
          console.log(err.request);
        } else {
          console.log("app mistake");
          // anything else
        }
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }
//Pagination
  const pageClickHandler = (page) => {
    setDisplayedMatches(pages);
    setCurrentPage(page);
  };

  const paginationObject = {
    perPage: perPage,
    currentPage: currentPage,
    totalRecords: totalRecords,
  };

  const paginate = (matches, currentPage, perPage) => {
    let from = currentPage.pageNumber * perPage - perPage;
    let to = currentPage.pageNumber * perPage;
    return matches.slice(from, to);
  };

  const pages = useMemo(() => {
    return paginate(matches, currentPage, perPage);
  }, [matches, currentPage, perPage]);


//Breadcrumbs
  useEffect(getBreadCrumbs, [id]);

  function getBreadCrumbs() {
  axios({
    method: "get",
    url: "http://api.football-data.org/v2/teams/" + parseInt(id),
    headers: { "X-Auth-Token": "1e76ed510bd246519dedbf03833e5322" },
  })
    .then((response) => {
      setBreadCrumbs([{ name: "Teams", id: 'id' }, { name: response.data.name, id: id }]);
    })
    .catch(() => {
      console.log(error);
    });
}

  return (
    <div className="container">
      <DateFilter />
      <Breadcrumbs breadCrumbs = {breadCrumbs} />
      <h1>Team Calendar</h1>
      <Table matches={displayedMatches} />
      <Pagination
          paginationObject={paginationObject}
          onPageClicked={pageClickHandler}
        />
    </div>
  );
};
export default TeamCalendar;


