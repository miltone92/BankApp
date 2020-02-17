import React, { Component } from "react";
import "./HeaderText.scss";

export class HeaderText extends Component {
    render() {
        const { children, customMaxWidth } = this.props;
        return (
            <div>
                <h2 style={{ maxWidth: customMaxWidth }} className="image-header-text ">{children}</h2>
            </div>
        );
    }
}

export default HeaderText;
