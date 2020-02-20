import React from "react";

//Components
import ContentContainer from "../../main-content/content-container/ContentContainer"
//Style
import "./MovementDetail.scss"

/********************
 * Component
 * 
 ********************/

export const MovementDetail = (props) =>{


    return(
        <div className={"movement-detail"}>
            <div>
                <p className="account-container__detail"><label className="account-container__attribute"> {props.movement.name}</label></p>
                <p className="account-container__detail"><label className="account-container__attribute">M# </label> {props.movement.id}</p>
                <p className="account-container__detail"><label className="account-container__attribute">Date </label> {props.movement.date}</p>
            </div>
            <div className={"movement-detail__amount"}>
                {props.movement.type === "addition" 
                    ? <label className={`account-container__attribute movement-detail__amount--addition`}> {props.movement.amount} </label>
                    :  <label className={`account-container__attribute movement-detail__amount--subtraction` }> {props.movement.amount} </label>}
            </div>
        </div>

    )
}

export default MovementDetail;