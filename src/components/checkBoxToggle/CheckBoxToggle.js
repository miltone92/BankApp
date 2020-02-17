import React, { Component } from "react";
import "./CheckBoxToggle.scss";

export class CheckBoxToggle extends Component {
  render() {
    const { label } = this.props;
    return (
      <div>
        <label class="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <h4 className="checkbox-label">{label}</h4>
      </div>
    );
  }
}

export default CheckBoxToggle;
