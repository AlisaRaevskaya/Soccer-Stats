import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import Teams from "./pages/Teams";
import TeamCalendar from "./pages/TeamCalendar";
import CompetitionCalendar from "./pages/CompetitionCalendar";
import Competitions from "./pages/Competitions";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Header />
      <main className="page-main">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/teams" component={Teams} />
          <Route path="/team/:id/matches/" component={TeamCalendar} />
          <Route path="competition/:id/matches" component={CompetitionCalendar} />
          <Route path="/competitions" component={Competitions} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}
