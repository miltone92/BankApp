import React from "react";


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
                <p className="simple-container__detail"><label className="simple-container__attribute"> {props.movement.name}</label></p>
                <p className="simple-container__detail"><label className="simple-container__attribute">M# </label> {props.movement.id}</p>
                <p className="simple-container__detail"><label className="simple-container__attribute">Date </label> {props.movement.date}</p>
            </div>
            <div className={"movement-detail__amount"}>
                {props.account && props.movement.destination === props.account.accountNumber
                    ? <label className={`simple-container__attribute movement-detail__amount--addition`}>{props.movement.currency} {props.movement.amount} </label>
                    :  (<div><label className={`simple-container__attribute`}> </label><label className={`simple-container__attribute movement-detail__amount--subtraction` }> {props.movement.currency} {props.movement.amount} </label></div>)
                    }
            </div>
        </div>

    )
}

export default MovementDetail;