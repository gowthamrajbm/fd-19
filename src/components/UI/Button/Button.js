import React from "react";

import "./Button.css";

const button = props => (
  <button
    {...props}
    disabled={props.disabled}
    className={["Button", props.btntype].join(" ")}
    onClick={props.clicked}
    visible={!props.visible}
  >
    {props.children}
  </button>
);

export default button;
