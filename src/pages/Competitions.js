// Список лиг/соревнований

import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/CompetitionTable";

export default function Competitions() {
    const competitionUrl ='http://api.football-data.org/v2/competitions';
    const apiKey = process.env.DOTENV.API_KEY;

    const [competitions, setCompetitions] = React.useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(getCompetitions, []);

    function getCompetitions(){
        axios({
          method: "get",
          url: `${competitionUrl}`,
          headers: { "X-Auth-Token": `${apiKey}` },
          responseType: 'json',
        })
          .then(function (response) {
            setIsLoaded(true);
            setCompetitions(response.data.competitions);
            // console.log(competitions);
          })
          .catch(function (error) {
              setIsLoaded(true);
              setError(error);
            console.log(error);
          });
      }
      
      if (!competitions) return null;
       console.log(competitions);

      if (error) {
        return <div>Ошибка</div>;
      } else if (!isLoaded) {
        return <div>Загрузка...</div>;
      } else {
        return (
        <div className="container">
        <h1>Competitions</h1>
     <Table competitions={competitions}/>
      </div>
    );
        }
}
