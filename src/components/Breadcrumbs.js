import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Breadcrumbs = ({ breadCrumbs }) => {
  console.log(breadCrumbs.map((i) => console.log(typeof i.id)));
  return (
    <div className="breadcrumbs">
      <ul className="breadcrumbs__list">
        {breadCrumbs &&
          breadCrumbs.map((breadcrumb) => (
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

Breadcrumbs.propTypes = {
  breadCrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

export default Breadcrumbs;
