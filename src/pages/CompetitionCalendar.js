// - Календарь лиги - список матчей лиги/соревнования
//	List matches across (a set of) competitions.

import React, { useEffect, useState, useParams } from "react";
import axios from "axios";
import Table from "../components/tables/CompetitionTable";
const CompetitionCalendar = () => {
  const baseUrl = "https://api.football-data.org/v2/competitions/{id}/matches";
  const apiKey = process.env.DOTENV.API_KEY;

  return (
    <div>
      <h1 className="text-center">React Calendar</h1>
      <div className="teams-calendar">
        <Table competitions={competitions} />
      </div>
    </div>
  );
};

export default CompetitionCalendar;
