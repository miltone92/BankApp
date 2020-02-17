import React, { Component } from "react";
import "./HeaderText.scss";

export class HeaderText extends Component {
  render() {
    const { children, customMaxWidth } = this.props;
    return (

      <label style={{ maxWidth: customMaxWidth }} className="header-text">{children}</label>

    );
  }
}

export default HeaderText;
