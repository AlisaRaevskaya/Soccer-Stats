import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>
      <div className="menu">
        <nav>
          <ul>
            <li>
              <NavLink
                activeClassName="active"
                style={{ listStyle: "none" }}
                to="/create_new_menu"
              >
                Create Menu
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/mymenus">
                My Menus
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/myinfo">
                My info
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/logout">
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
