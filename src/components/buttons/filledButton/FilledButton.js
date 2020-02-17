import React, { Component } from "react";
import "./FilledButton.scss";

export class FilledButton extends Component {
  render() {
    const { children, callback } = this.props;
    return (
      <div>
        <button className="filled-button" type="button" onClick={callback}>
          {children}
        </button>
      </div>
    );
  }
}

export default FilledButton;
