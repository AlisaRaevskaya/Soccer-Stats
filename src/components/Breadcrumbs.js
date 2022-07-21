import React from "react";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = (props) =>{
  const navigate = useNavigate();
  
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
export default Breadcrumbs;