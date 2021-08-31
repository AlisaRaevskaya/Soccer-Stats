// Список лиг/соревнований

import React from "react";

export default function MatchesTable(props) {
  return (
    <table className="styled-table">
      <caption>Matches table</caption>
      <thead>
        <tr>
          <th scope="col">Competition Name</th>
          <th scope="col">AwayTeam Name </th>
          <th scope="col">Area Name</th>
          <th>homeTeam</th>
          <th>Score Winner</th>
          <th>Score Duration </th>
          <th>Season startdate </th>
          <th>Season endDate</th>
          <th>Stage</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.matches.map((item) => (
          <tr key={item.id}>
            <td scope="row">Competition Name -{item.competition.name}</td>
            <td>AwayTeam Name - {item.awayTeam.name}</td>
            <td>homeTeam{-item.homeTeam.name}</td>
            <td>Score Winner - {item.score.winner}</td>
            <td>Score Duration - {item.score.duration}</td>
            <td>Season startdate - {item.season.startDate}</td>
            <td>Season endDate - {item.season.endDate}</td>
            <td>Stage-{item.stage}</td>
            <td>Status - {item.status}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row" colspan="2">
            Total albums
          </th>
          <td colspan="2">77</td>
        </tr>
      </tfoot>
    </table>
  );
}
