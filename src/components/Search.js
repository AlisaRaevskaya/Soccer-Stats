import React from "react";
import searchIcon from "../assets/svg/search.svg";

export default function Search() {
  return (
    <div className="site-search">
      <form className="site-search__form">
          <input
            type="text"
            className="site-search__input"
            placeholder="Search..."
          />
        <button type="submit" className="site-search__btn" value="Submit">
          <img src={searchIcon} alt="React Logo" className="site-search__icon"/>
        </button>
      </form>
    </div>
  );
}
