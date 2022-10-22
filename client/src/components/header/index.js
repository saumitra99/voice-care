import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import capitalizeFirstLetter from "../../helpers/common";
import loaderIcon from "../PageLoader/loaderIcon.svg";

function header({ children }) {
  return (
    <div className="Header">
      <div className="Header-top">
        <div className="Header-top-left">
          <a href="/">
            <div className="Header-top-left-logo" aria-hidden="true">
              <img src={loaderIcon} />
            </div>
          </a>
          <h1 className="Header-top-left-pagename">
            {capitalizeFirstLetter(
              window?.location?.pathname.split("/")[1]?.replace(/-/g, " ")
            ) || "Home"}
          </h1>
        </div>
      </div>
      {children && children}
    </div>
  );
}

header.propType = {
  children: PropTypes.instanceOf(Element).isRequired,
};
export default header;
