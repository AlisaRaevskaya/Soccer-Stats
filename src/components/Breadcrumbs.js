import React from "react";

export default function Breadcrumbs(props) {
  return (
    <div className="breadcrumbs">
      <ul className="breadcrumbs__list">
        {props.breadCrumbs &&
          props.breadCrumbs.map((breadcrumb) => (
            <li
              key={breadcrumb}
              class="after:content-['/'] after:mx-2 last:after:hidden"
            >
              <span>{breadcrumb.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
