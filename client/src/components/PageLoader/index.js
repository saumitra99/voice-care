import React from "react";
import { Spin } from "antd";
import loaderIcon from "./loaderIcon.svg";
import "./styles.scss";

function PageLoader() {
  return (
    <div className="progress-wrapper">
      {Spin && (
        <div className="logo">
          <img src={loaderIcon} />
        </div>
      )}
      <br />
      <Spin />
    </div>
  );
}

export default PageLoader;
