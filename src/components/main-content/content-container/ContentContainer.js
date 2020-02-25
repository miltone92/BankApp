import React from "react";

import "./ContentContainer.scss"



export const ContentContainer = (props) =>{

    const {className, style} = props;
    return(
        <div className={`content-container ${className}`} style={style}>
            {props.children}
        </div>
    )
}

export default ContentContainer;