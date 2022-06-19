import React from "react";

export default function Pagination(props) {
  const { currentPage, totalRecords, perPage, posts } = props.paginationObject;
  let ButtonCount = Math.ceil(totalRecords / perPage);

  const getButtonsCount = (ButtonCount) => {
    let content = [];
    for (let i = 1; i < ButtonCount; i++) {
      content.push(i);
    }
    return content;
  };

function paginate(posts, page, perPage) {
    let from = page * perPage - perPage;
    let to = page * perPage;
    return posts.slice(from, to);
  };

 function onPageClick(event) {
  currentPage = event;
  };

  console.log(getButtonsCount(ButtonCount));

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
                <button type="button">{num}</button>
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
