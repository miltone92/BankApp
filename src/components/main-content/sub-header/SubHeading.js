import React, { Component } from "react";
import "./SubHeading.scss";

export class SubHeading extends Component {
    render() {
        const { children, customMaxWidth } = this.props;
        return (

            <label style={{ maxWidth: customMaxWidth }} className="sub-heading">{children}</label>

        );
    }
}

export default SubHeading;
