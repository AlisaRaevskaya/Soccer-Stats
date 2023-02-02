import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BreadcrumbsInner = ({ breadCrumbs }) => {
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

BreadcrumbsInner.propTypes = {
  breadCrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

export const Breadcrumbs = memo(BreadcrumbsInner);
