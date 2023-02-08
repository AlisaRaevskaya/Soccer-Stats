import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Pagination } from "../components/Pagination";
import { paginate } from "../utils/Helpers";
import DateFilter from "../components/DateFilter";
import Preloader from "../components/PreLoader";
import Table from "../components/tables/MatchesTable";
import ApiFootballData from "../utils/ApiFootballData";
import { convertToUTCdate, convertToOneFormat } from "../utils/datesHandlers";
import errorImage from "../assets/images/error.png";

const defaultPage = 1;
const perPage = 10;

const TeamCalendar = () => {
  const { id } = useParams();
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [paginatedMatches, setPaginatedMatches] = useState([]);
  const [resultMatches, setResultMatches] = useState([]);
  const [error, setError] = useState("");
  const [errorDates, setErrorDates] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dates, setDates] = useState({});

  useEffect(getMatches, [id]);

  function getMatches() {
    ApiFootballData.teams("matches", { team_id: id })
      .then((response) => {
        setResultMatches(response.matches);
        setPaginatedMatches(response.matches.slice(0, perPage));
        setTotalRecords(response.matches.length);
        setDates({
          firstDateFrom: response?.matches[0].utcDate,
          lastDateTo: response?.matches[response.matches.length - 1].utcDate,
        });
      })
      .catch((error) => {
        setError("Повторите попытку позже.");
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }

  /* Pagination Logic */

  const handlePageChange = (page) => {
    setPaginatedMatches(paginate(resultMatches, page, perPage));
    setCurrentPage(page);
  };

  /* Breadcrumbs */

  useEffect(getBreadCrumbs, [id]);

  function getBreadCrumbs() {
    ApiFootballData.teams("breadcrumbs", { id: id })
      .then((response) => {
        setBreadCrumbs([
          { name: "Команды", url: "/teams" },
          { name: response.name, url: false },
        ]);
      })
      .catch(() => {
        console.log(error);
      });
  }

  /* Date Filter Handler */

  const handleDateFilterSubmit = (date) => {
    setErrorDates("");

    if (date.dateFrom && !date.dateTo) {
      setDateTo(convertToUTCdate(dates.lastDateTo));
    } else if (date.dateTo && !date.dateFrom) {
      setDateFrom(convertToUTCdate(dates.firstDateFrom));
    } else {
      const fr = convertToOneFormat(date.dateFrom);
      const to = convertToOneFormat(date.dateTo);
      if (fr < to || fr === to) {
        setDateFrom(date.dateFrom);
        setDateTo(date.dateTo);
      } else {
        setErrorDates("Дата с должна быть раньше даты до");
      }
    }
  };

  useEffect(handleDateFilter, [dateFrom, dateTo]);

  function handleDateFilter() {
    if (dateTo && dateFrom) {
      ApiFootballData.teams("dates", {
        team_id: id,
        dateFrom: dateFrom,
        dateTo: dateTo,
      })
        .then((response) => {
          setCurrentPage(defaultPage);
          const filteredtMatches = response.matches;
          setResultMatches(filteredtMatches);
          setPaginatedMatches(paginate(filteredtMatches, defaultPage, perPage));
          setTotalRecords(filteredtMatches.length);
        })
        .catch((error) => {
          setError("Ошибка.Повторите попытку позже.");
          console.log(error);
        });
    }
  }

  if (error) {
    return (
      <div className="error text-center">
        <img src={errorImage} alt="error" className="responsive error-image" />
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
        <DateFilter
          onDateFilterSubmit={handleDateFilterSubmit}
          dates={dates}
          validationError={errorDates}
        />
        <Breadcrumbs breadCrumbs={breadCrumbs} />
        <h1 className="pt-1 pb-1">Календарь Команды</h1>
        {paginatedMatches.length > 0 ? (
          <Table matches={paginatedMatches} />
        ) : (
          <div className="text-center">Матчей на заданные даты не найдено.</div>
        )}
        {paginatedMatches.length > 0 && (
          <Pagination
            perPage={perPage}
            currentPage={currentPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }
};

export default TeamCalendar;
