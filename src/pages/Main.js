import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../images/logo.png'; 

export default function Main() {
    return (
        <div className="container">
            <h1>Soccer Stats</h1>
            <div className="main-background">
                <div className="main-box">
                    <div className="main-logo"><img src={logo}/></div>

                    <div className ="main-box">
                            <div>
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
                </div>
            </div>
        </div>
    );
}
