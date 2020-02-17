import React, { Component } from "react";
import "./Button.scss";

let onClick = (event, callBack) => {
  if (callBack) {
    callBack();
  }
};

export default class Button extends Component {
  render() {
    const { callback, type, width, children } = this.props;
    return (
      <div
        style={{ width: width + "px" }}
        onClick={event => onClick(event, callback)}
        className={`${type} button-shape`}
      >
        {children}
      </div>
    );
  }
}
