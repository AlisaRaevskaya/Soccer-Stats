import React from "react";
import hero_home from "../assets/images/hero-home.jpeg";

const Home = () => {
  return (
    <div className="container text-center">
      <h2 className="mt-3 mb-1">SoccerStats: Football Stats, Tables & Results</h2>
      <p className="mt-1 mb-1">
        «SoccerSTATS.com features football statistics, league tables, standings
        and ladders and results analysis on national and international soccer
        competitions»
      </p>
      <img src={hero_home} alt="SoccerStats" className="responsive" />
    </div>
  );
};
export default Home;
