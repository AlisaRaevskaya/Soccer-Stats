import React, {memo} from "react";
import { Link } from "react-router-dom";

const TeamCardInner = ({ team }) => {
  return (
    <div className="card team-card">
      <Link to={`/teams/${team.id}`}>
        <div className="card-content">
          {team.name && <p className="card-title pb-1">Лига: {team.name}</p>}
          {team.crestUrl && (
            <figure className="card-image">
              <img src={team.crestUrl} alt={team.name} width="96" height="96" />
            </figure>
          )}
        </div>
      </Link>
    </div>
  );
};
export const TeamCard = memo(TeamCardInner);
