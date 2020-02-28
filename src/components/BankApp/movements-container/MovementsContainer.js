import React, { useEffect, useState } from "react";

//Style
import "./MovementsContainer.scss"
//Components
import ContentContainer from "../../main-content/content-container/ContentContainer"
import MovementDetail from "../../BankApp/movement-detail/MovementDetail"
//Libs
import benri from "../../../libs/benri"

/********************
 * Component
 * 
 ********************/
export const MovementsContainer = (props) =>{


    useEffect(() =>{

        let testDate = [];
        let sortedMovements = props.movements.sort(function(a,b){
            b = benri.getDateFromLocaleString(b.date)
            a = benri.getDateFromLocaleString(a.date)
    
            return b - a;
          });
      

    }, [])
    
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