import React from "react";

const Breadcrumbs = (props) => {
  return (
    <div className="breadcrumbs">
      <ul className="breadcrumbs__list">
        {props.breadCrumbs &&
          props.breadCrumbs.map((breadcrumb) => (
            <li key={breadcrumb.id}>
              <span>{breadcrumb.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Breadcrumbs;
