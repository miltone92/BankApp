import React, {useState, useEffect} from "react"

import "./PopOver.scss"


//Unfinished
export const PopOver = (props) =>{

    const [popOver, setPopOver] = useState(false);
    const {children, title, content, list} = props;


    let togglePopOver = () =>{
        popOver
            ? setPopOver(false)
            : setPopOver(true)
    }

    return(
        <div className={`pop-over`}>

          
            <div className={`pop-over__container`} style={{marginLeft: popOver ? "0px" : "-290px"}}>
                <p className="pop-over__title">{title}</p>
                {list.map((item, i) =>(
                        <p key={`item-${i}`}className="pop-over__content">{item}</p>
                ))}
            </div>
        
           
            <div className="pop-over__button" onClick={togglePopOver}>
                {children ? children : <i className="fas fa-info pop-over__button--child"></i>}
            </div>
        </div>
    )
}

export default PopOver;