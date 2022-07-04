import React, { useState, useRef, useEffect } from "react";
import searchIcon from "../assets/svg/search.svg";

export default function Search(props) {
  const [searchString, setSearchString] = React.useState("");
  const [searchPosts, setSearchPosts] = useState([]);
  const [noResultText, setNoResultText] = useState("");
  const inputRef = useRef(null);

  function createObjectForFilter(arr) {
    let result_array = arr.map((item) => (item = Object.values(item)));
    result_array = result_array.map((item) => (item = String(item)));
    return result_array;
  }

  function splitArr(arr) {
    return arr.map((element) => element.split(","));
  }

  function filterPosts(arr) {
    let strLowCase = searchString.toLowerCase();

    let result_array = createObjectForFilter(arr);

    let results = result_array.filter((post) => {
      return post.toLowerCase().includes(strLowCase);
    });
    //  console.log(`filter ${splitArr(results)}`);
    return splitArr(results);
  }

  function handleClearInput(value) {
    setSearchString(value);
    //console.log(value);

    if (!value) {
      return {
        result_posts: props.posts,
        no_results_text: " ",
      };
    }
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    setSearchString(inputRef.current.value);
    //nputRef.current.value = 'New value';

    // 👇️ access input value
    console.log('string' + searchString);

    let searchResults = filterPosts(props.posts);
    console.log(searchResults);

    if (searchString) {
      setSearchPosts(searchResults);

      // if (!searchPosts.length) {
      //   setNoResultText("No posts found");
      // }
      console.log(searchPosts);
    } else {
      setSearchPosts(splitArr(createObjectForFilter(props.posts)));
      setNoResultText(" ");
    }

    let nn = {
      result_posts: searchPosts,
      no_results_text: noResultText,
    };

    console.log(nn);

    return {
      result_posts: searchPosts,
      no_results_text: noResultText,
    };
  }

  return (
    <div className="site-search">
      <form
        className="site-search__form"
        onSubmit={(e) => {
          handleSearchSubmit(e);
        }}
      >
        <input
          type="text"
          className="site-search__input"
          value={searchString}
          ref={inputRef}
          name="searchString"
          placeholder="Search..."
          onChange={(e) => handleClearInput(e.target.value)}
        />
        <button type="submit" className="site-search__btn" value="Submit">
          <img src={searchIcon} className="site-search__icon" />
        </button>
      </form>
    </div>
  );
}
