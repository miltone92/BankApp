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

    const {type} = props;

    let useCallback = () =>{
     props.callback(props.callbackParams)
     }

    let getCardIcon = () =>{
        
        switch(true){

            case props.title === "VISA":
                return <i class="fab fa-cc-visa"></i>
            
            case props.title === "Mastercard":
                return <i class="fab fa-cc-mastercard"></i>

            case props.title === "AMEX":
                return <i class="fab fa-cc-amex"></i>

            default:
            break;
        
        }
    }

    return(
        <ContentContainer className="simple-container">
            {
                type === "debit"
                ?    <h1 className="">{props.title}</h1>
                :    <h1 className="" style={{fontSize : "4em", margin : "10px 0px"}}>{
                        getCardIcon()
                        }
                    </h1>
            }
            <div style={{display: "flex", justifyContent: "space-between"}}>
                
                    {
                        type == "debit"
                        ?  <div>
                                <p className="simple-container__detail"><label className="simple-container__attribute">Account: </label> {props.number}</p>
                                <p className="simple-container__detail"><label className="simple-container__attribute">IBAN: </label> {props.iban}</p>
                                <p className="simple-container__detail"><label className="simple-container__attribute">Currency: </label> {props.currency}</p>
                            </div>
                        :   <div>
                                <p className="simple-container__detail"><label className="simple-container__attribute">Number: </label> {props.number}</p>
                                <p className="simple-container__detail"><label className="simple-container__attribute">Limit: </label>  {props.currency}  {props.creditLimit}</p>
                                <p className="simple-container__detail"><label className="simple-container__attribute">Debt: </label>  {props.currency} {parseInt(props.creditLimit) - parseInt(props.balance)}</p>
                                <p className="simple-container__detail"><label className="simple-container__attribute">Currency: </label> {props.currency}</p>
                            </div>
                    }

                {props.showButton === undefined
                    ? <FilledButton callback={useCallback} style={{borderRadius: "10px"}}>{props.buttonLabel}</FilledButton>
                    : <div/>
                }
            </div>
          
               
            {
                type == "debit"
                ?   <p className="simple-container__balance"><label className="simpe-container__attribute"></label> {props.currency} {props.balance}</p>
           
                :    <p className="simple-container__balance"><label className="simpe-container__attribute"></label> Available: {props.currency} {props.balance}</p>       
            }
        </ContentContainer>
    )
}

export default AccountContainer;