import React from "react";

import "./ContentContainer.scss"



export const ContentContainer = (props) =>{

    return(
        <div className={`content-container ${props.className}`}>
            {props.children}
        </div>
    )
}

export default ContentContainer;