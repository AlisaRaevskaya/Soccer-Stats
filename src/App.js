import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/Main";
import Teams from './pages/Teams';
import TeamCalendar from './pages/TeamCalendar';
import Matches from './pages/Matches';
import Competitions from './pages/Competitions';
import NotFound from './pages/NotFound';


export default function App() {

const competitionUrl ='http://api.football-data.org/v2/competitions';
const teamUrl ='http://api.football-data.org/v2/competitions/{id}/teams'
const matchPerTeamUrl ='http://api.football-data.org/v2/teams/{id}/matches/';
const matchesUrl ="https://api.football-data.org/v2/matches";

  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/teams"component={Teams}/>
        <Route path="/team_calendar"component ={TeamCalendar}/>
        <Route path="/matches"component ={Matches}/>
        <Route path="/competitions"component ={Competitions}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
