import React,  { useEffect, useState, useMemo} from "react";

export default function Pagination(props) {
  const { perPage, posts } = props.paginationObject;

  let totalRecords = posts.length;
  let ButtonCount = Math.floor(Math.ceil(totalRecords / perPage));
  console.log(ButtonCount);

  const [currentPage, setCurrentPage] = useState(1);

  const getButtonsCount = (ButtonCount) => {
    let content = [];
    for (let i = 1; i <= ButtonCount; i++) {
      content.push(i);
    }
    return content;
  };

  function onPageClick(num){
    setCurrentPage(num);
  }

  function paginate(posts, page, perPage) {
    let from = page * perPage - perPage;
    let to = page * perPage;
    return posts.slice(from, to);
  };
  function setPrevious(){
    if (currentPage != 1){
      setCurrentPage(currentPage - 1);
    }
  }

  function setNext(){
    if (currentPage != ButtonCount){
      setCurrentPage(currentPage + 1);
    }
  
  }
  const pages = useMemo(() => {
    return paginate(posts, currentPage, perPage);
  }, [posts, currentPage, perPage]);

  props.onPageClicked(pages);

//   console.log(getButtonsCount(ButtonCount));

  return (
    <div class="pagination">
      <ul class="pagination-list row">
        <li>
          <span class="pagination-button">
            <button type="button" onClick={setPrevious}>Previous</button>
          </span>
        </li>
        <li>
          <ul>
            {getButtonsCount(ButtonCount).map((num) => (
              <li class="pagination-item" key={num}>
                <button type="button" onClick={() => onPageClick(num)}>{num}</button>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <span class="pagination-button">
            <button type="button" onClick={setNext}>Next</button>
          </span>
        </li>
      </ul>
    </div>
  );
}
