import React from "react";
import { Route, Routes } from "react-router-dom";

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
    <div className="App">
      <Header />
      <main className="page-main">
        <Routes>
          <Route path="/" exact={true} element={<HomePage />} />
          <Route path="teams" element={<Teams />}>
            <Route path=":id" element={<TeamCalendar />} />
          </Route>
          <Route path="competitions" element={<Competitions />}>
            <Route path=":id" element={<CompetitionCalendar />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
