import React, { useState } from "react";

export default function List(props) {

    return (
        <ul>
             { props.events.map((item) => (
            <li key={item.id}>League: {item.name}</li>
             )) } 
        </ul>
    )
}
