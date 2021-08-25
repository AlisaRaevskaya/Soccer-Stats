import React from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/Main";
import CreateMenu from './pages/NewMenu';
import MyMenus from './pages/MyMenus';
import NotFound from './pages/NotFound';
//privateroute
import data from './data';

export default function App() {
  const jsonData =  data;

  return (
    <Router>
        <Header />
        <Switch>
        <Link to="/">{MainPage}</Link>
        <Link to="/create_new_menu">{CreateMenu}</Link>
        <Link to="/mymenus">{MainPage}</Link>
        <Route exact path="/"><MyMenus/></Route>
        <Route path="/create_new_menu" component={ CreateMenu } />
        <Route path="/mymenus"><MyMenus jsonData ={jsonData}></MyMenus></Route>
        <Route path="*" component={ NotFound}  />
        </Switch>
    </Router>
  );
}
