import React, { Component } from "react";
import "./TextInputBorder.scss";

export class TextInputBorder extends Component {
  render() {
    const { placeholder, type, id, name, defaultValue, refInput, style, className } = this.props;
    return (
   
        <input
          type={type}
          placeholder={placeholder}
          className={ className ? className : "input-gray"}
          id={id}
          name={name}
          defaultValue = {defaultValue}
          ref = {refInput}
          style = {style}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
        ></input>
     
    );
  }
}

export default TextInputBorder;
