import React, { useCallback } from 'react';

//Style
import "./AccountContainer.scss"

//Components
import ContentContainer from "../../main-content/content-container/ContentContainer"
import FilledButton from "../../buttons/Button/Button";

/********************
 * Component
 * 
 ********************/
export const AccountContainer = (props) =>{

    let useCallback = () =>{
     props.callback(props.callbackParams)
     }


    return(
        <ContentContainer className="simple-container">
            <h1 className="">{props.title}</h1>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <p className="simple-container__detail"><label className="simple-container__attribute">Account: </label> {props.number}</p>
                    <p className="simple-container__detail"><label className="simple-container__attribute">IBAN: </label> {props.iban}</p>
                    <p className="simple-container__detail"><label className="simple-container__attribute">Currency: </label> {props.currency}</p>
                </div>
                {props.showButton === undefined
                    ? <FilledButton callback={useCallback} style={{borderRadius: "10px"}}>{props.buttonLabel}</FilledButton>
                    : <div/>
                }
            </div>
          
               
           
            <p className="simple-container__balance"><label className="simpe-container__attribute"></label> {props.currency} {props.balance}</p>
           
        </ContentContainer>
    )
}

export default AccountContainer;