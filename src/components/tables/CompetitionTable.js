// Список лиг/соревнований

import React from "react";

export default function CompetitionTable(props) {
    return(
    
    <table className="styled-table">
        <caption>Competitions table</caption>
        <thead>
          <tr>
            <th scope="col">Competition</th>
            <th scope="col">Country</th>
            <th scope="col">Area Name</th>
            {/* <th scope="col">Most famous song</th> */}
          </tr>
        </thead>
        <tbody>
        { props.competitions.map(item => (
              <tr key={item.id}>
              <th scope="row">{item.name}</th>
              <td>{item.area.name}</td>
              {/* <td>{item.name}</td> */}
              <td>{item.plan}</td>
              </tr>
        ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colspan="2">Total albums</th>
            <td colspan="2">77</td>
          </tr>
        </tfoot>
      </table>)

}