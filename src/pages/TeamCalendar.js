import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "../components/tables/MatchesTable";
import Breadcrumbs from "../components/Breadcrumbs";
import DateFilter from "../components/DateFilter";

const TeamCalendar = (props) => {
  const { id } = useParams();
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [matches, setMatches] = useState([]);
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

  useEffect(getBreadCrumbs, [id]);

  function getBreadCrumbs() {
  axios({
    method: "get",
    url: "http://api.football-data.org/v2/teams/" + parseInt(id),
    headers: { "X-Auth-Token": "1e76ed510bd246519dedbf03833e5322" },
  })
    .then((response) => {
      setBreadCrumbs([{ name: "Команды" }, { name: response.data.name }]);
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
      <Table matches={matches} />
    </div>
  );
};
export default TeamCalendar;


