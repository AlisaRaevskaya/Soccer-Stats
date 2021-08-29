import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <NavLink exact to="/">
        HOME
      </NavLink>
      <div className="menu">
        <nav>
          <ul>
            <li>
              <NavLink activeClassName="active" to="/teams">
                TEAMS
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/team_calendar">
                My Calendar
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/competitions">
                Competitions
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/matches">
                Matches
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
