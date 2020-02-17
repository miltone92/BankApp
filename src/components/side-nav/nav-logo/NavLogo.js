import React, { Component } from "react";
import "./NavLogo.scss"

export class NaveLogo extends Component {
    constructor(props) {
        super(props);
        this.state = { hover: false, label: props.children };
    }

    toggleHover = () => {
        this.setState({ hover: !this.state.hover });
    };

    render() {
        const { href } = this.props;
        //  Spreding: const { href, message } = this.props; in case you send more than one prop
        return (
            <a
                className="nav-logo"
                href={href}
            >
                {this.state.label}
            </a>
        );
    }
}



export default NaveLogo;
