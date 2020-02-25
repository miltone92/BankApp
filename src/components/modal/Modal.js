
import React, { useEffect } from "react";

//Style
import "./Modal.scss"

export const  Modal = (props) =>{
    
    let {style} = props

  

    return (
        <div className={`modal`} style={style} id="modal">
            {props.children}
        </div>
    )
}

export default  Modal;
