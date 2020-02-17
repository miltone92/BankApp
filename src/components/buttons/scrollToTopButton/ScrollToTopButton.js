import React, { Component } from "react";
import "./ScrollToTopButton.scss";

export class ScrollToTopButton extends Component {
  render() {
    const { callback, className } = this.props;
    return (
      <div className={`scroll-to-top-container ${className}`}>
        <button className="scroll-to-top-container__button" onClick={callback}>
          <i class="fas fa-angle-double-up"></i>
        </button>
      </div>
    );
  }
}

export default ScrollToTopButton;
