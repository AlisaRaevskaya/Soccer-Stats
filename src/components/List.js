import React, { useState } from "react";

const List = (props) => {
  return (
    <ul>
      {props.events.map((item) => (
        <li key={item.id}>League: {item.name}</li>
      ))}
    </ul>
  );
};
 export default List;