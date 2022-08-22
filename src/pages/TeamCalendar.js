import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Table from "../components/tables/MatchesTable";
import Breadcrumbs from "../components/Breadcrumbs";
import DateFilter from "../components/DateFilter";
import Pagination from "../components/Pagination";
import Preloader from "../components/PreLoader";
import ApiFootballData from "../utils/ApiFootballData";
import DateHandler from "../utils/DateHandler";
import error_image from "../assets/images/error.png";

const TeamCalendar = (props) => {
  const { id } = useParams();
  const perPage = 10;
  const defaultPage = { pageNumber: 1, isActive: true };
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [matches, setMatches] = useState([]);
  const [displayedMatches, setDisplayedMatches] = useState([]);
  const [resultMatches, setResultMatches]= useState([]);
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
    ApiFootballData.teams("matches", { team_id: id })
      .then((response) => {
        setMatches(response.matches);
        setResultMatches(response.matches);
        setDisplayedMatches(response.matches.slice(0, perPage));
        setTotalRecords(response.matches.length);
        setDates([
          response?.matches[0].utcDate,
          response?.matches[response.matches.length - 1].utcDate,
        ]);
      })
      .catch((error) => {
        setError("Повторите попытку позже.");
        console.log(error);
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
    return paginate(resultMatches, currentPage, perPage);
  }, [resultMatches, currentPage, perPage]);

  //Breadcrumbs
  useEffect(getBreadCrumbs, [id]);

  function getBreadCrumbs() {
    ApiFootballData.teams("breadcrumbs", { id: id })
      .then((response) => {
        setBreadCrumbs([
          { name: "Команды", id: new Date().toISOString(), url: "/teams" },
          { name: response.name, id: id, url: false },
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
    if (dateFrom && !dateTo) {
      setDateTo(
        DateHandler.convertToUTCdate(dates[1])
      );
    }

    if (dateTo && dateFrom) {
      ApiFootballData.teams("dates", {
        team_id: id,
        dateFrom: dateFrom,
        dateTo: dateTo,
      })
        .then((response) => {
          setResultMatches(response.matches);
          setDisplayedMatches(response?.matches.slice(0, perPage));
          setTotalRecords(response?.matches.length);
        })
        .catch((error) => {
          setError("Повторите попытку позже.");
          console.log(error);
        });
    }
  }

  if (error) {
    return (
      <div className="error text-center">
        <img src={error_image} alt="error" className="responsive error-image" />
        <div className="error-message">
          <h3>Упсс..ошибка</h3>
          <h4> {error} </h4>
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
        <DateFilter onDateFilterSubmit={handleDateFilterSubmit} dates={dates} />
        <Breadcrumbs breadCrumbs={breadCrumbs} />
        <h1>Календарь Команды</h1>
        {displayedMatches.length > 0 ? (
          <Table matches={displayedMatches} />
        ) : (
          <div className="text-center">
            Матчей на заданные даты не найдено.{" "}
          </div>
        )}

        {displayedMatches.length > 0 && (
          <Pagination
            paginationObject={paginationObject}
            onPageClicked={pageClickHandler}
          />
        )}
      </div>
    );
  }
};

export default TeamCalendar;
