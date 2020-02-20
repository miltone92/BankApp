import React, { Component } from "react";
import "./FilledButton.scss";

export class FilledButton extends Component {
  render() {
    const { children, callback, style } = this.props;
    return (
      <div>
        <button style ={style} className="filled-button" type="button" onClick={callback}>
          {children}
        </button>
      </div>
    );
  }
}

export default FilledButton;
