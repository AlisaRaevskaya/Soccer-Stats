// Список лиг/соревнований

import React from "react";

export default function CompetitionTable(props) {

  props.competitions.map((competition) => (
  console.log(competition.area.name)
  ));

  return (
    <div className="tab-wrapper">
      <table className="resp-tab">
        <caption className="py-1">Competitions table</caption>
        <thead>
          <tr>
            <th scope="col">Competition</th>
            <th scope="col">Country</th>
            <th scope="col">Area Name</th>
          </tr>
        </thead>
        <tbody>
          {props.competitions &&
            props.competitions.map((competition) => (
              <tr key={competition.id}>
                <td scope="row">{competition.name}</td>
                <td>{competition.area.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
