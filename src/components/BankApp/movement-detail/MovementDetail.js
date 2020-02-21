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
console.log(props.movement)
console.log(props.account)

    return(
        <div className={"movement-detail"}>
            <div>
                <p className="simple-container__detail"><label className="simple-container__attribute"> {props.movement.name}</label></p>
                <p className="simple-container__detail"><label className="simple-container__attribute">M# </label> {props.movement.id}</p>
                <p className="simple-container__detail"><label className="simple-container__attribute">Date </label> {props.movement.date}</p>
            </div>
            <div className={"movement-detail__amount"}>
                {props.account && props.movement.destination === props.account.accountNumber
                    ? <label className={`simple-container__attribute movement-detail__amount--addition`}> {props.movement.amount} </label>
                    :  <label className={`simple-container__attribute movement-detail__amount--subtraction` }> {props.movement.amount} </label>}
            </div>
        </div>

    )
}

export default MovementDetail;