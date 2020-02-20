import React from 'react';

//Style
import "./AccountContainer.scss"

//Components
import ContentContainer from "../../main-content/content-container/ContentContainer"
import FilledButton from "../../buttons/filledButton/FilledButton";

/********************
 * Component
 * 
 ********************/
export const AccountContainer = (props) =>{

    let viewDetails = () =>{
       window.location.href = `/AccountDetails?account=${props.number}`;
    }

    return(
        <ContentContainer className="account-container">
            <h1 className="account-container__title">{props.title}</h1>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <p className="account-container__detail"><label className="account-container__attribute">Account: </label> {props.number}</p>
                    <p className="account-container__detail"><label className="account-container__attribute">IBAN: </label> {props.iban}</p>
                    <p className="account-container__detail"><label className="account-container__attribute">Currency: </label> {props.currency}</p>
                </div>
    <FilledButton callback={viewDetails} style={{borderRadius: "10px"}}>{props.buttonLabel}</FilledButton>
            </div>
          
               
           
            <p className="account-container__balance"><label className="account-container__attribute">Balance: </label> {props.currency} {props.balance}</p>
           
        </ContentContainer>
    )
}

export default AccountContainer;