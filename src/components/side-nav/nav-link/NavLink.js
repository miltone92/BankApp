import React, { Component } from "react";
import "./NavLink.scss"

export class NavLink extends Component {
    constructor(props) {
        super(props);
        this.state = { hover: false, label: props.children };
    }

    toggleHover = () => {
        this.setState({ hover: !this.state.hover });
    };

    render() {
        const { href, className, style } = this.props;
        //  Spreding: const { href, message } = this.props; in case you send more than one prop
        return (
            <a
                className={`link ${className}`}
                style={style}
                href={href}
            >
                {this.state.label}
            </a>
        );
    }
}



export default NavLink;
