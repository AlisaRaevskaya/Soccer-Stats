import React, { useEffect, useState } from "react";
import { Route, Link, Routes, useParams } from "react-router-dom";
import axios from "axios";
import Table from "../components/tables/MatchesTable";
import BreadCrumbs from "../components/Breadcrumbs";
import DateFilter from "../components/DateFilter";

export default function TeamCalendar(props) {
  let { id } = useParams();
  const defaultMatches = localStorage.getItem('savedMatches')? localStorage.getItem('savedMatches'): [];
  const [team, setTeam] = useState("");
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [matches, setMatches] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(getMatches, []);
  // useEffect(getTeamName, []);
  
console.log(defaultMatches);

  function getMatches() {
    axios({
      method: "get",
      url:
        "https://api.football-data.org/v2/teams/" + parseInt(id) + "/matches",
      headers: { "X-Auth-Token": "1e76ed510bd246519dedbf03833e5322" },
    })
      .then((response) => {
        localStorage.setItem('savedMatches', ...response.data.matches )
        console.log(localStorage.getItem('savedMatches'));
        setMatches(response.data.matches);
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

  // function getTeamName() {
  //   axios({
  //     method: "get",
  //     url: "http://api.football-data.org/v2/teams/" + parseInt(id),
  //     headers: { "X-Auth-Token": "1e76ed510bd246519dedbf03833e5322" },
  //   })
  //     .then((response) => {
  //       setTeam(response.data.name);
  //       // setBreadCrumbs([{ name: "Команды" }, { name: team }]);
  //       // console.log(breadCrumbs);
  //     })
  //     .catch(() => {
  //       // console.log(error);
  //     });
  // }

  // function getOriginalMatches() {
  //   axios({
  //     method: "get",
  //     url:
  //       "https://api.football-data.org/v2/teams/" + parseInt(id) + "/matches",
  //     headers: { "X-Auth-Token": "1e76ed510bd246519dedbf03833e5322" },
  //   })
  //     .then((response) => {
  //       return response.data.matches;
  //     })
  //     .catch((err) => {
  //       if (err.response) {
  //         let errorMessage = "Не удалось загрузить данные из-за ошибки доступа";
  //         // client received an error response (5xx, 4xx)
  //         console.log(err.response);
  //       } else if (err.request) {
  //         // client never received a response, or request never left
  //         //let errorMessage = "Ошибка сети";
  //         console.log(err.request);
  //       } else {
  //         console.log("app mistake");
  //         // anything else
  //       }
  //     });
  // }

  return (
    <div className="container">
      <DateFilter />
      {/* <BreadCrumbs breadCrumbs="breadCrumbs"/> */}
      <h1>Team Calendar</h1>
      <Table matches={matches} />
    </div>
  );
}
