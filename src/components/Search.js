import React, { useState } from "react";
import searchIcon from "../assets/svg/search.svg";

const Search = ({ onSearchSubmit }) => {
  const [searchString, setSearchString] = useState("");

  function submitHandler(event) {
    event.preventDefault();
    onSearchSubmit(searchString);
  }

  return (
    <div className="site-search">
      <form
        className="site-search__form"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          type="text"
          className="site-search__input"
          value={searchString}
          name="searchString"
          placeholder="Поиск.."
          onChange={(e) => setSearchString(e.target.value)}
        />
        <button type="submit" className="site-search__btn btn" value="Submit">
          <img src={searchIcon} className="site-search__icon" />
        </button>
      </form>
    </div>
  );
};
export default Search;
