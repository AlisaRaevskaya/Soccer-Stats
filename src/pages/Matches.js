// - Календарь лиги - список матчей лиги/соревнования
//	List matches across (a set of) competitions.


import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/MatchesTable";

export default function Matches() {
  const matchesUrl = "https://api.football-data.org/v2/matches";
  const apiKey = process.env.DOTENV.API_KEY;

  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

 useEffect(getMatches, []);

  function getMatches(){
    axios({
      method: "get",
      url: `${matchesUrl}`,
      headers: { "X-Auth-Token": `${apiKey}` },
    })
      .then(function (response) {
        setIsLoaded(true);
        setMatches(response.data.matches);
        // console.log(matches);
      })
      .catch(function (error) {
          setIsLoaded(true);
          setError(error);
        // console.log(error);
      });
  }
  if (!matches) return null;

  if (error) {
    return <div>Ошибка</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="container">
    <h1>Matches</h1>
     <Table matches={matches}/>
      </div>
    );
}
}
