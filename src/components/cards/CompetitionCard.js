import React from "react";
import { Link } from "react-router-dom";

const CompetitionCard = (props) => {
  const competition = props.competition;
  
  return (
    <div className="card" key={competition.id}>
      <Link to={`/competitions/${competition.id}`}>
        <div className="card-content">
          <p className="card-title">Лига: {competition.name}</p>
          <p className="card-subtitle">Страна: {competition.area}</p>
          <p>{competition.id}</p>
        </div>
      </Link>
    </div>
  );
};

export default CompetitionCard;
