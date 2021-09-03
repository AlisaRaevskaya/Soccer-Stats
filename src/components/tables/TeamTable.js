// Список лиг/соревнований

import React from "react";

export default function TeamTable(props) {
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
        {props.teams.map((item) => (
          <tr key={item.id}>
            <td scope="row">Competition Name -{item.name}</td>
            <td>AwayTeam Name - {item.shortName}</td>
            <td>homeTeam- {item.clubColors}</td>
            <td>Score Winner - {item.founded}</td>
            <td>Score Duration - {item.tla}</td>
            <td>Season startdate - {item.area.name}</td>
            <td>Season endDate - {item.email}</td>
            <td>Stage-{item.phone}</td>
            <td>Status - {item.website}</td>
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
