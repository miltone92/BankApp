import React from "react";

//Style
import "./MovementsContainer.scss"
//Components
import ContentContainer from "../../main-content/content-container/ContentContainer"
import MovementDetail from "../../BankApp/movement-detail/MovementDetail"

/********************
 * Component
 * 
 ********************/
export const MovementsContainer = (props) =>{

    console.log(props.movements)
    return(
        <ContentContainer className="simple-container">
            <h1 className="simple-container__title">{"Movements"}</h1>
            <div className="movements-container">
                {props.movements.map((movement, i) => (
                    <MovementDetail
                    movement={movement}
                    account={props.account}
                    />
                ))}
            </div>
        </ContentContainer>
    )
}




export default MovementsContainer;