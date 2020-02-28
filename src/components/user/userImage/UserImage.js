import React, { Component } from 'react'

//style
import "./UserImage.scss"


export class UserImage extends Component {
    render() {
        const { callback } = this.props;
        return (
            <div className={`userImage`} onClick={callback}>
               <i className="fas fa-running"></i>
            </div>
        );
    }
}

export default UserImage
