import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Menu() {
  return (
    <nav className="navbar bg-secondary">
      <div>
        <div className="site-nav container-fluid">
          <div className="site-nav__logo">
            <NavLink exact to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <ul className="site-nav__list row">
            <li className="ml-1 text-hover-blue display-block">
              <NavLink activeclassNameName="active-nav-link" to="/teams">
                Teams
              </NavLink>
            </li>
            <li className="ml-1 text-hover-blue display-block">
              <NavLink activeclassNameName="active-nav-link" to="/team_calendar">
              Team Calendar
              </NavLink>
            </li>
            <li className="ml-1 text-hover-blue display-block">
              <NavLink activeclassNameName="active-nav-link" to="/competitions">
                Competitions
              </NavLink>
            </li>
            <li>
              <NavLink activeclassNameName="active-nav-link" to="/matches">
               Competition Calendar
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
