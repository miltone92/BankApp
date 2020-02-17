import React, { Component } from "react";
import "./TextInputBorder.scss";

export class TextInputBorder extends Component {
  render() {
    const { placeholder, type, id } = this.props;
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          className="input-border"
          id={id}
        ></input>
      </div>
    );
  }
}

export default TextInputBorder;
