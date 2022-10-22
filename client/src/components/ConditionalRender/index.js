import React from "react";
import PropTypes from "prop-types";

function ConditionalRender({ condition, childrenA, childrenB }) {
  if (condition) {
    return <>{childrenA}</>;
  }
  return <>{childrenB}</>;
}

ConditionalRender.propType = {
  condition: PropTypes.bool.isRequired,
  childrenA: PropTypes.instanceOf(Element),
  childrenB: PropTypes.instanceOf(Element),
};

ConditionalRender.defaultRender = {
  childrenA: null,
  childrenB: null,
};

export default ConditionalRender;
