import React, {useState, useEffect} from "react"

//Dependencies
import emailjs from 'emailjs-com';
//API
import accountsAPI from "../../../api/accounts";
import movementAPI from "../../../api/movements";
//Style
import "./MovementForm.scss";
//Components
import ContentContainer from "../../main-content/content-container/ContentContainer";
import TextInputBorder from "../../inputs/TextInputBorder";
import Alert from "../../alert/box/AlertBox";

//Hooks
import {useForm} from 'react-hook-form'


/********************
 * Component
 * 
 ********************/
export const MovementForm = (props) => {
   
    //State
    const [destination, setDestination] = useState(null);
    const [movement, setMovement] = useState(null)
    const [alert, setAlert] = useState({
            show: false,
            type: "",
            title: "",
            message: "",
            buttonLabel: "",
        });
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
        now = now.toLocaleString('en-GB');
        setMovement({
            name : "Transfer",
            date : now,
            type : "Transfer",
            detail : data.detail,
            origin : props.account.accountNumber,
            destination : destination.accountNumber,
            amount : data.amount, 
            currency : "USD",
    })
   }

   let onAmountSubmit = (data) => {
       defineMovementSchema(data);
   }

   let postMovement = async () =>{
    let response = await movementAPI.post(`?destination=${destination.accountNumber}`, movement);    
    
    if (response.status == 200){
    setAlert({
        show: true,
        type: "success",
        title: "Success",
        message: `The amount of ${movement.amount} has been transfered to: ${movement.destination}`,
        buttonLabel: "OK",
      });
   
    sendEmail();
    props.callback();
    }else{
        console.log("There was an error posting movement")
    }
   }

   
    let sendEmail = () => {
   
    let template_params = {
      "email": destination.owner,
      "to_name": destination.ownerName,
      "to_account": destination.accountNumber,
      "from_owner": props.account.ownerName,
      "from_account": props.account.accountNumber,
      "amount": `${movement.currency} ${movement.amount}`
     }
    let service_id = "default_service";
    let template_id = "received_transaction";
    let user_id = "user_zUbrAWWFdqgFvebsUEMYw"
 
    emailjs.send(service_id, template_id, template_params, user_id)
    .then((result) => {
         console.log(result.text);
     }, (error) => {
         console.log(error.text);
     });
   }

   useEffect(()=>{
    if(movement !== null){

        props.account.balance - movement.amount >0
            ? postMovement()
            : setAlert({
                show: true,
                type: "Error",
                title: "Error",
                message: `You don't have enough money in your balance`,
                buttonLabel: "OK",
              });

    }

    }, [movement])

    let resetForm = () =>{
        setDestination(null)
        setMovement(null)
        setAlert({
            show: false
        })
    }
    
    return (


        <ContentContainer className="simple-container">

            {/** Form: Get Account*/}
            {destination === null && !alert.show 
                && (
 
                <form onSubmit={handleSubmit(onDestinationSubmit)}>
                    <h1 className="simple-container__title">{"Transfer"}</h1>
                   <div className="flex-col">
                        <TextInputBorder 
                            style={{maxWidth: "200px", borderTop: "none", borderRight: "none", borderLeft: "none", borderWidth: "1px"}}
                            placeholder="Enter account number" 
                            name="account"
                            defaultValue="" 
                            refInput={register({ required: true })}
                            >
                        </TextInputBorder>
                        <br/>
                        <input className={"filled-button"} style={{width: "auto", borderRadius: "4px", minWidth: "100px", maxWidth: "200px"}} type="submit" />
                    </div>
                </form>
                )
             }
            {/** Form: Get amount and detail*/}
            {destination !== null &&!alert.show 
            && (
            <form onSubmit={handleSubmit(onAmountSubmit)}>
                <h1 className="simple-container__title">{"Transfer"}</h1>
                <h2 style={{fontSize : "16px"}}>{`To: ${destination.ownerName}`}</h2>
                <h2 style={{fontSize : "16px"}}>{`Account Number: ${destination.accountNumber}`}</h2>
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
                    <br/>
                    <input className={"filled-button"} style={{width: "auto", borderRadius: "4px", minWidth: "100px", maxWidth: "200px"}} type="submit" />
                </div>
            </form>
            )
            }
            {/** Form: Show success*/}
            {
                alert.show &&
                <Alert
                    callback={resetForm}
                    title={alert.title}
                    message={alert.message}
                    buttonLabel={alert.buttonLabel}
                    type={alert.type}
                />
            }


            
        </ContentContainer>
        )

}

export default MovementForm;

