import React, { Component } from "react";
import "./Button.scss";

export class Button extends Component {
  render() {
    const { children, callback, style, className } = this.props;
    return (
        <button style ={style} className={className !== undefined ? className : "filled-button" } type="button" onClick={callback}>
          {children}
        </button>
    );
  }
}

export default Button;
