import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/images/logo.png";
const setActive = ({isActive}) => isActive ? 'active-site-nav__link' : '';

const Menu = () => {
  return (
    <nav className="navbar bg-secondary">
      <div>
        <div className="site-nav container-fluid">
          <div className="site-nav__logo">
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <ul className="site-nav__list row">
          <li className="ml-1 text-hover-blue display-block">
              <NavLink className={setActive} to="/competitions">
                Competitions
              </NavLink>
            </li>
            <li className="ml-1 text-hover-blue display-block">
              <NavLink className={setActive} to="/teams">
                Teams
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
 export default Menu ;