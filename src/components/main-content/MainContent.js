import React, { Component } from "react";
import "./MainContent.scss";

export class MainContent extends Component {
  render() {
    return (
      <div className="main-content" id="mainContent">
        {this.props.children}
      </div>
    );
  }
}

export default MainContent;
