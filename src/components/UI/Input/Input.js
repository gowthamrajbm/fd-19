import React from "react";

import "./Input.css";

const input = props => {
  let inputElement = null;
  const inputClasses = ["InputElement"];

  if (!props.valid && props.shouldValidate && props.touched) {
    inputClasses.push("Invalid");
  }
  //console.log(props);
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          valid={props.valid + ""}
          value={props.elementConfig.type !== "file" ? props.value : undefined}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          valid={props.valid + ""}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  const inpuClasses = ["Input"];
  if (props.variant) inpuClasses.push(props.variant);
  return (
    <div className={inpuClasses.join(" ")}>
      <span className="ILabel">{props.elementConfig.label}</span>
      {inputElement}
    </div>
  );
};

export default input;
