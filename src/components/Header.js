import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <div>
            <div className="logo">
                <NavLink to="/">
                    Home</NavLink>
            </div>
            <div className="menu">
                <nav>
                    <NavLink activeClassName="active" to="/create_new_menu">Create Menu</NavLink>
                    <NavLink to="/mymenus">My Menus</NavLink>
                    <NavLink to="/myinfo">My info</NavLink>
                    <NavLink to="/logout">Logout</NavLink>
                </nav>
            </div>
        </div>
    );
}
