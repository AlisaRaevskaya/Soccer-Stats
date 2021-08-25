import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <div>
            <div className="logo">
                <NavLink exact to="/"activeStyle={{
background:'red',
color:'white'
}}>
                    Home</NavLink>
            </div>
            <div className="menu">
                <nav>
                    <ul>
                        <li><NavLink activeClassName="active" to="/create_new_menu">Create Menu</NavLink></li>
                        <li><NavLink to="/mymenus">My Menus</NavLink></li>
                        <li><NavLink to="/myinfo">My info</NavLink></li>
                        <li><NavLink to="/logout">Logout</NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
