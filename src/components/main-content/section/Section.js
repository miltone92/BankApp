
import React, { Component } from 'react'
import "./Section.scss"

export class Section extends Component {
    render() {
        return (
            <div className="section">
                {this.props.children}
            </div>
        )
    }
}

export default Section

