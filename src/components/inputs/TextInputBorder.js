import React, { Component } from "react";
import "./TextInputBorder.scss";

export class TextInputBorder extends Component {
  render() {
    const { placeholder, type, id, name, defaultValue, refInput, style } = this.props;
    return (
   
        <input
          type={type}
          placeholder={placeholder}
          className="input-border"
          id={id}
          name={name}
          defaultValue = {defaultValue}
          ref = {refInput}
          style = {style}
          autocomplete="off"
          autocorrect="off"
          autocapitalize="none"
          spellcheck="false"
        ></input>
     
    );
  }
}

export default TextInputBorder;
