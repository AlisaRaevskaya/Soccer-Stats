// Список лиг/соревнований

import React from "react";

export default function MatchesTable(props) {
  return (
    <table >
      <caption>Matches table</caption>
      <thead>
        <tr>
          <th>Competition</th>
          <th>Status</th>
          <th> AwayTeam - homeTeam</th>
          <th colSpan="3">Score</th>
        </tr>
        <tr>
          <th scope="col">FullTime Score </th>
          <th scope="col">ExtraTime Score </th>
          <th scope="col">Penalties Score </th>
        </tr>
      </thead>
      <tbody>
        {props.matches.map((item) => (
          <tr key={item.id}>
            <td scope="row">{item.competition.name}</td>
            <td>{item.status}</td>
            <td>
              {item.awayTeam.name} - {item.homeTeam.name}
            </td>
            <td>
              {item.score.fullTime.homeTeam} : {item.score.fullTime.awayTeam}
            </td>
            <td>
              {item.score.extraTime.homeTeam} : {item.score.extraTime.awayTeam}
            </td>
            <td>
              {item.score.penalties.homeTeam} : {item.score.penalties.awayTeam}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
}
