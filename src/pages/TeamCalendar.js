import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "../components/tables/MatchesTable";
import Breadcrumbs from "../components/Breadcrumbs";
import DateFilter from "../components/DateFilter";
import Pagination from "../components/Pagination";
import Preloader from "../components/PreLoader";

const TeamCalendar = (props) => {
  const { id } = useParams();
  const perPage = 10;
  const defaultPage = { pageNumber: 1, isActive: true };
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [matches, setMatches] = useState([]);
  const [displayedMatches, setDisplayedMatches] = useState([]);
  const [error, setError] = useState("");
  const [totalRecords, setTotalRecords] = useState(matches.length);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dates, setDates] = useState([]);

  //Matches
  useEffect(getMatches, [id]);

  function getMatches() {
    axios({
      method: "get",
      url:
        "https://api.football-data.org/v2/teams/" + parseInt(id) + "/matches",
      headers: { "X-Auth-Token": "1e76ed510bd246519dedbf03833e5322" },
    })
      .then((response) => {
        setMatches(response.data.matches);
        setDisplayedMatches(response.data.matches.slice(0, perPage));
        setTotalRecords(response.data.matches.length);
        setDates([
          response.data.matches[0].utcDate,
          response.data.matches[response.data.matches.length - 1].utcDate,
        ]);
      })
      .catch((error) => {
        setError("Error Occured");
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }

  // useEffect(() => {
  //   if (matches.length > 0) {
  //     setDates([matches[0].utcDate, matches[matches.length - 1].utcDate]);
  //     console.log(matches[0].utcDate)
  //   }
  // }, [matches]);

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
        setBreadCrumbs([
          { name: "Teams", id: "id" },
          { name: response.data.name, id: id },
        ]);
      })
      .catch(() => {
        console.log(error);
      });
  }

  //Date Filter Handler
  const handleDateFilterSubmit = (date) => {
    setDateFrom(date.dateFrom);
    setDateTo(date.dateTo);
  };

  useEffect(handleDateFilter, [dateFrom, dateTo]);

  function handleDateFilter() {
    if (dateFrom && dateTo) {
      axios({
        method: "get",
        url:
          "https://api.football-data.org/v2/teams/" +
          parseInt(id) +
          "/matches?dateFrom=" +
          dateFrom +
          "&dateTo=" +
          dateTo,
        headers: { "X-Auth-Token": "1e76ed510bd246519dedbf03833e5322" },
      })
        .then((response) => {
          setDisplayedMatches(response.data?.matches.slice(0, perPage));
          setTotalRecords(response.data?.matches.length);
        })
        .catch((err) => {
          console.log(err.response);
        })
        .finally(() => {
          setIsLoaded(true);
        });
    }
  }

  if (error) {
    return (
      <div className="container text-center">
        <h4> Error: {error} </h4>{" "}
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
        <DateFilter onDateFilterSubmit={handleDateFilterSubmit} dates={dates} />
        <Breadcrumbs breadCrumbs={breadCrumbs} />
        <h1>Team Calendar</h1>
        {displayedMatches.length > 0 ? (
          <Table matches={displayedMatches} />
        ) : (
          <div className="container text-center">No matches found</div>
        )}
        <Pagination
          paginationObject={paginationObject}
          onPageClicked={pageClickHandler}
        />
      </div>
    );
  }
};

export default TeamCalendar;
