import React from "react";

//Style
import "./MovementsContainer.scss"
//components
import ContentContainer from "../../main-content/content-container/ContentContainer"
import MovementDetail from "../../BankApp/movement-detail/MovementDetail"

/********************
 * Component
 * 
 ********************/
export const MovementsContainer = (props) =>{

    console.log(props.movements)
    return(
        <ContentContainer className="account-container">
            <h1 className="account-container__title">{"Movements"}</h1>
            <div className="movements-container">
                {props.movements.map((movement, i) => (
                    <MovementDetail
                    movement={movement}
                    />
                ))}
            </div>
        </ContentContainer>
    )
}




export default MovementsContainer;