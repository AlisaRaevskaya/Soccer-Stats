import React,  { useEffect, useState, useMemo} from "react";

export default function Pagination(props) {
  const { perPage, posts } = props.paginationObject;
  const [currentPage, setCurrentPage] = useState({ pageNumber: 1, isActive: false });

  let totalRecords = posts.length;
  let ButtonCount = Math.floor(Math.ceil(totalRecords / perPage));

  const getButtonsCount = (ButtonCount) => {
    let content = [];
    for (let i = 1; i <= ButtonCount; i++) {
      content.push(i);
    }
    return content;
  };

  function onPageClick(num){
    setCurrentPage({ pageNumber: num, isActive: true });
  }

  function paginate(posts, page, perPage) {
    let from = page.pageNumber * perPage - perPage;
    let to = page.pageNumber * perPage;
    return posts.slice(from, to);
  };

  function setPrevious(){
    if (currentPage.pageNumber != 1){
      setCurrentPage(currentPage.pageNumber - 1);
    }
  }

  function setNext(){
    if (currentPage.pageNumber != ButtonCount){
      setCurrentPage(currentPage.pageNumber + 1);
    }
  
  }
  const pages = useMemo(() => {
    return paginate(posts, currentPage, perPage);
  }, [posts, currentPage, perPage]);

  props.onPageClicked(pages);

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
                <button type="button" className={currentPage.pageNumber == num && currentPage.isActive ? "page-active" : ""} onClick={() => onPageClick(num)}>{num}</button>
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
