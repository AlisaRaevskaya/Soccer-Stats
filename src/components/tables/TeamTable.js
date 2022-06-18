// Список лиг/соревнований

import React from "react";

export default function TeamTable(props) {
  
  function setTime(dt) {
    let d = new Date(dt);
    let minutes =
      d.getUTCMinutes() == "0" ? d.getUTCMinutes() + "0" : d.getUTCMinutes();
    return d.getUTCHours() + " : " + minutes;
  }
  function setDate(dt) {
    //console.log(dt);
    let d = new Date(dt);
    let month = d.getMonth() + 1;
    let date = `${d.getDate()}-${month}-${d.getFullYear()}`;
    return date;
  }

  return (
    <table className="styled-table">
      <caption>Матчи</caption>
      <thead>
        <tr>
          <th scope="col">Дата</th>
          <th scope="col">Время</th>
          <th scope="col">Статус</th>
          <th scope="col">Команды участников</th>
          <th scope="col">Счёт в основное время</th>
          <th scope="col">Cчёт в дополнительное время</th>
          <th scope="col">Пенальти</th>
        </tr>
      </thead>
      <tbody>
        {props.teams &&
          props.teams.map((item) => (
            <tr key={item.id}>
              <td scope="row">Дата -{setDate(match.utcDate)}</td>
              <td>Время - {setTime(match.utcDate)}</td>
              <td>Статус - {item.status}</td>
              <td>
                 Командный счет - {match.homeTeam.name} - {match.awayTeam.name}
              </td>
              <td>
                Счёт в основное время - {match.score.fullTime.homeTeam} :
                {match.score.fullTime.awayTeam}
              </td>
              <td>
                Счет в дополнительное время - {match.score.extraTime.homeTeam} :
                {match.score.extraTime.awayTeam}
              </td>
              <td>
                Пенальти - {match.score.penalties.homeTeam} :
                {match.score.penalties.awayTeam}
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
}
