import React from "react";
import { NavLink } from "react-router-dom";
import Menu from "../components/Menu";

export default function Header() {
  return (
    <>
      <header className="page-head">
        <Menu />
      </header>
     </>
  );
}
