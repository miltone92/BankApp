import React, {useState, useEffect} from "react"

//API
import accountsAPI from "../../../api/accounts";
import movementAPI from "../../../api/movements";
//Style
import "./MovementForm.scss";
//Components
import ContentContainer from "../../main-content/content-container/ContentContainer";
import TextInputBorder from "../../inputs/TextInputBorder";
import SubHeading from "../../main-content/sub-header/SubHeading"

//Hooks
import {useForm} from 'react-hook-form'
//Custom libs
import benri from "../../../libs/benri"

/********************
 * Component
 * 
 ********************/
export const MovementForm = (props) => {
   
    //State
    const [destination, setDestination] = useState(null);
    const [movement, setMovement] = useState(null)
    //Hook Formz`
    const { register, handleSubmit, watch, errors } = useForm();

    let getDestination = async (data) => {
        let response = await accountsAPI.get(`?number=${data.account}`);
        response = response.data[0];
        console.log(response);
        setDestination(response)   
    }

    let onDestinationSubmit = (accountNumber) => {
        getDestination(accountNumber);
   }

   let defineMovementSchema = (data) =>{
        let now = new Date();
        now = now.toLocaleString();
        setMovement({
            name : "Transfer",
            date : now,
            type : "Transfer",
            detail : data.detail,
            origin : props.account.accountNumber,
            destination : destination.accountNumber,
            amount : data.amount, 
            currency : "USD"
    })
   }

   let onAmountSubmit = (data) => {
       defineMovementSchema(data);
   }

   let postMovement = async () =>{
   let response = await movementAPI.post(`?destination=${destination.accountNumber}`, movement);
   console.log(response)
   

   }

   useEffect(()=>{

    movement !== null &&
        postMovement();

    }, [movement])
    
    return (


        <ContentContainer className="simple-container">
             <h1 className="simple-container__title">{"Transfer"}</h1>
            {destination === null
            ? (
                <form onSubmit={handleSubmit(onDestinationSubmit)}>
                    <div className="flex-col">
                        <TextInputBorder 
                            style={{maxWidth: "200px", borderTop: "none", borderRight: "none", borderLeft: "none", borderWidth: "1px"}}
                            placeholder="Enter account number" 
                            name="account"
                            defaultValue="" 
                            refInput={register({ required: true })}
                            >
                        </TextInputBorder>
                        <input className={"filled-button"} style={{width: "auto", borderRadius: "4px", minWidth: "100px", maxWidth: "200px"}} type="submit" />
                    </div>
                </form>
                )
            : (
                <form onSubmit={handleSubmit(onAmountSubmit)}>
                    <h2 style={{fontSize : "16px"}}>{`To: ${destination.owner}`}</h2>
                    <h2 style={{fontSize : "14px"}}>{`${props.account.currency}`}</h2>
                    <div className="flex-col">
                        <TextInputBorder 
                            style={{maxWidth: "200px", borderTop: "none", borderRight: "none", borderLeft: "none", borderWidth: "1px"}}
                            placeholder={`Enter amount (${props.account.currency})`} 
                            name="amount"
                            defaultValue="" 
                            refInput={register({ required: true })}
                            >
                        </TextInputBorder>
                        <TextInputBorder 
                            style={{maxWidth: "200px", borderTop: "none", borderRight: "none", borderLeft: "none", borderWidth: "1px"}}
                            placeholder={`Enter detail (Optional)`} 
                            name="detail"
                            defaultValue="" 
                            refInput={register}
                            >
                        </TextInputBorder>
                        <input className={"filled-button"} style={{width: "auto", borderRadius: "4px", minWidth: "100px", maxWidth: "200px"}} type="submit" />
                    </div>
                </form>
            )
            }


            
        </ContentContainer>
        )

}

export default MovementForm;

