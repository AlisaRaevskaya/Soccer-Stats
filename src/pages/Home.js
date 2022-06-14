import React from "react";

import logo from "../assets/images/logo.png";

export default function Home() {
  return (
    <div className="container mx-auto max-w-screen-xl px-3 box-border">
      <h2 className="my-3">
        «Приложение для просмотра спортивной статистики «SoccerSTATs»»
      </h2>

      <img
        src="../assets/images/logo.png"
        alt="SoccerStats"
        className="max-w-full h-auto block mx-auto"
      />
    </div>
  );
}
