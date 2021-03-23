import React from "react";
import "./style.css";

function AppButton(props) {
  return (
    <button
      className="btn appBtn "
      onClick={props.handleSubmit}
      type={props.btnType}
    >
      {props.label}
    </button>
  );
}
export default AppButton;
