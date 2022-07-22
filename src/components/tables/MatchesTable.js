// Список лиг/соревнований

import React from "react";

const MatchesTable = (props) => {
  const setTime = (dt) => {
    let d = new Date(dt);
    let minutes =
      d.getUTCMinutes() == "0" ? d.getUTCMinutes() + "0" : d.getUTCMinutes();
    return d.getUTCHours() + " : " + minutes;
  };

  const setDate = (dt) => {
    let d = new Date(dt);
    let month = d.getMonth() + 1;
    let date = `${d.getDate()}-${month}-${d.getFullYear()}`;
    return date;
  };

  const outputScoreIfNotNull = (score1, score2) => {
    //Отображаются значения только отличные от null

    if (score1 != null || score2 != null) {
      return (
        <td>
          {score1} : {score2}
        </td>
      );
    }
    return <td> - </td>;
  };

  return (
    <table>
      <caption>Matches table</caption>
      <thead>
        <tr>
          <th className="colored" rowSpan="2">
            Date
          </th>
          <th className="colored" rowSpan="2">
            Time
          </th>
          <th className="colored" rowSpan="2">
            Status
          </th>
          <th className="colored" rowSpan="2">
            Away Team - Home Team
          </th>
          <th colSpan="3" scope="colgroup" className="colored">
            Scores
          </th>
        </tr>
        <tr>
          <th scope="col" className="colored">
            FullTime Score
          </th>
          <th scope="col" className="colored">
            ExtraTime Score
          </th>
          <th scope="col" className="colored">
            Penalties Score
          </th>
        </tr>
      </thead>
      <tbody>
        {props.matches &&
          props.matches.map((item) => (
            <tr key={item.id}>
              <td scope="row">{setDate(item.utcDate)}</td>
              <td scope="row">{setTime(item.utcDate)}</td>
              <td>{item.status}</td>
              <td>
                {item.awayTeam.name} - {item.homeTeam.name}
              </td>

              {outputScoreIfNotNull(
                item.score.fullTime.homeTeam,
                item.score.fullTime.awayTeam
              )}

              {outputScoreIfNotNull(
                item.score.extraTime.homeTeam,
                item.score.extraTime.awayTeam
              )}

              {outputScoreIfNotNull(
                item.score.penalties.homeTeam,
                item.score.penalties.awayTeam
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default MatchesTable;
