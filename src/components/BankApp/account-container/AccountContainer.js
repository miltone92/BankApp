import React from 'react';

//Style
import "./AccountContainer.scss"

//components
import ContentContainer from "../../main-content/content-container/ContentContainer"

export const AccountContainer = (props) =>{

    return(
        <ContentContainer className="account-container">
            <h1 className="account-container__title">{props.title}</h1>
            <p className="account-container__detail"><label className="account-container__attribute">Account: </label> {props.number}</p>
            <p className="account-container__detail"><label className="account-container__attribute">IBAN: </label> {props.iban}</p>
            <p className="account-container__detail"><label className="account-container__attribute">Currency: </label> {props.currency}</p>
            <p className="account-container__balance"><label className="account-container__attribute">Balance: </label> {props.currency} {props.balance}</p>
           
        </ContentContainer>
    )
}

export default AccountContainer;