import React from "react";
import Header from "./components/Header";
import MainPage from "./pages/Main";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CreateMenu from './pages/NewMenu';
import MyMenus from './pages/MyMenus';
import NotFound from './pages/NotFound';
//privateroute

export default function App() {
  return (
    <Router >
        <Header />
        <Switch>
        <Route exact path="/" component={ MainPage} />
        <Route path="/create_new_menu" component={CreateMenu} />
        <Route path="/mymenus" component={ MyMenus } />
        <Route path="*" component={NotFound} />
        </Switch>
    </Router>
  );
}
