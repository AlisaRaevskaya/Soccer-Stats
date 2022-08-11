import React, { useState } from "react";
import searchIcon from "../assets/svg/search.svg";

const Search = (props)=> {
  const [searchString, setSearchString] = useState("");

  function createObjectForFilter(arr) {
    let result_array = arr.map((item) => (item = String(Object.values(item))));
    return result_array;
  }

  function splitArr(arr) {

    return arr.map((element) => element.split(","));
  }

  function filterPosts(arr) {
    let strLowCase = searchString.toLowerCase();

    let result_array = createObjectForFilter(arr);

    let results = result_array.filter((post) => (post.toLowerCase().includes(strLowCase)));
 
  return splitArr(results);
  }

  function submitHandler(event) {
    event.preventDefault();
    let noResultText = null;

    let searchResults = filterPosts(props.posts).map((el)=> parseInt(el.slice(0,1)));
    
    if (searchString) {
      if (!searchResults.length) {
        noResultText = "No posts found";
      console.log(noResultText);
      }
    } else {
      searchResults = props.posts.map((el)=> el = el.id);
      noResultText = null;
    }

    let postObj = {
      result_posts: searchResults,
      no_results_text: noResultText,
    };

   props.handleSearchSubmit(postObj);
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
          onChange={(e) =>  setSearchString(e.target.value)}
        />
        <button type="submit" className="site-search__btn" value="Submit">
          <img src={searchIcon} className="site-search__icon" />
        </button>
      </form>
    </div>
  );
}
export default Search;