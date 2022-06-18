import React from "react";

import hero_home from "../assets/images/hero-home.jpeg";

export default function Home() {
  return (
    <div className="container text-center">
      <h2 className="my-3">
        «Приложение для просмотра спортивной статистики «SoccerSTATs»»
      </h2>
      <img src={hero_home} alt="SoccerStats" className="responsive" />
    </div>
  );
}
