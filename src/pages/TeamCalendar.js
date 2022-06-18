import React, { useEffect, useState } from "react";
import {Route, Link, Routes, useParams} from 'react-router-dom';

export default function TeamCalendar(props) {

  let { id } = useParams(); 

  useEffect(() => {
     console.log(`/something/${id}`);
  }, []);

    return (
        <div className="container">
            <h1>Team Calendar</h1>
        </div>
    )

}