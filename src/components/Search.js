import React, { useState } from "react";
import searchIcon from "../assets/svg/search.svg";

export default function Search(props) {
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

    // 👇️ access input value
   // console.log(`string + ${searchString}`);

    let searchResults = filterPosts(props.posts);
    let noResultText = " ";
    
    //console.log('searchResults' + searchResults);

    if (searchString) {
      if (!searchResults.length) {
        noResultText = "No posts found";
      }
     // console.log(searchPosts);
    } else {
      searchResults = props.posts.filter((el)=> el.id ).map((el)=> parseInt(el.slice(0,1)));
    }

    searchResults = searchResults.map((el)=> parseInt(el.slice(0,1)));

    let postObj = {
      result_posts: searchResults,
      no_results_text: noResultText,
    };

  console.log(props.posts.filter((el)=> el.id ).map((el)=> parseInt(el.slice(0,1))));
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
          placeholder="Search..."
          onChange={(e) =>  setSearchString(e.target.value)}
        />
        <button type="submit" className="site-search__btn" value="Submit">
          <img src={searchIcon} className="site-search__icon" />
        </button>
      </form>
    </div>
  );
}
