import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/Main";
import CreateMenu from './pages/NewMenu';
import MyMenus from './pages/MyMenus';
import NotFound from './pages/NotFound';
//privateroute
import data from './data';

export default function App() {
  let jsonData = data;

  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/create_new_menu" component={CreateMenu} />
        <Route path="/mymenus"><MyMenus jsonData={jsonData}/></Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
