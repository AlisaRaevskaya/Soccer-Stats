import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = (props) => {
  return (
    <div className="breadcrumbs">
      <ul className="breadcrumbs__list">
        {props.breadCrumbs &&
          props.breadCrumbs.map((breadcrumb) => (
            <li key={breadcrumb.id}>
              {breadcrumb.url ? (
                <Link to={breadcrumb.url} className="breadcrumbs-link">
                  <span>{breadcrumb.name}</span>
                </Link>
              ) : (
                <span> {breadcrumb.name} </span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Breadcrumbs;
