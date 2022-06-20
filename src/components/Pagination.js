import React from "react";

export default function Pagination(props) {
  const { currentPage, perPage, posts } = props.paginationObject;
  let totalRecords = posts.length;
  let ButtonCount = Math.ceil(totalRecords / perPage);

  const getButtonsCount = (ButtonCount) => {
    let content = [];
    for (let i = 1; i < ButtonCount; i++) {
      content.push(i);
    }
    return content;
  };

  function onPageClick(num){
    console.log(num);
    //currentPage = num;
  }
  
//   currentPage = event.target.value;
//   console.log(getButtonsCount(ButtonCount));

  return (
    <div class="pagination">
      <ul class="pagination-list row">
        <li>
          <span class="pagination-button">
            <button type="button">Previous</button>
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
            <button type="button">Next</button>
          </span>
        </li>
      </ul>
    </div>
  );
}
