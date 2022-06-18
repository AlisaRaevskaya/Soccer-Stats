// Список лиг/соревнований

import React from "react";

export default function CompetitionTable(props) {
  return (
    <div className="tab-wrapper">
      <table className="resp-tab">
        <caption>Competitions table</caption>
        <thead>
          <tr>
            <th scope="col">Competition</th>
            <th scope="col">Country</th>
            <th scope="col">Area Name</th>
          </tr>
        </thead>
        <tbody>
          {props.competitions &&
            props.competitions.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.name}</th>
                <td>{item.area.name}</td>
                <td>{item.plan}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
