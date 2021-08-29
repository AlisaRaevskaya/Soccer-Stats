// - Календарь лиги - список матчей лиги/соревнования
//	List matches across (a set of) competitions.

import axios from "axios";
import React, { useEffect, useState } from "react";
import List from '../components/List';

export default function Matches() {
     const matchesUrl ="https://api.football-data.org/v2/competitions";
     const apiKey = process.env.DOTENV.API_KEY;

    const[match, setMatch ]= React.useState();
    React.useEffect(getMatches);

    function getMatches(){
        axios({
            method: 'get',
            url: `${matchesUrl}`,
            headers:{'X-Auth-Token': `${apiKey}` },
          }).then(function (response) {
            setMatch(response.count)
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <div className="container">
            <h1>Matches</h1>
       <h3>Count = </h3>  
        <List/>
        </div>
    )
}
