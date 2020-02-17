import React, { Component } from 'react'
import "./AppContainer.scss"

export class AppContainer extends Component {
    render() {
        return (
            <div className="flex-grid">
                {this.props.children}
            </div>
        )
    }
}

export default AppContainer
