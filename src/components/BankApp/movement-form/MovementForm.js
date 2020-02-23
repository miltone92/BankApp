import React, {useState, useEffect} from "react"

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
            currency : "USD"
    })
   }

   let onAmountSubmit = (data) => {
       defineMovementSchema(data);
   }

   let postMovement = async () =>{
    await movementAPI.post(`?destination=${destination.accountNumber}`, movement);

    
    setAlert({
        show: true,
        type: "success",
        title: "Success",
        message: `The amount of ${movement.amount} has been transfered to: ${movement.destination}`,
        buttonLabel: "OK",
      });
   
    props.callback();
   }

   useEffect(()=>{
    movement !== null &&
        postMovement();
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
                        <input className={"filled-button"} style={{width: "auto", borderRadius: "4px", minWidth: "100px", maxWidth: "200px"}} type="submit" />
                    </div>
                </form>
                )
             }
            {/** Form: Get amount and detail*/}
            {destination !== null && !alert.show 
            && (
            <form onSubmit={handleSubmit(onAmountSubmit)}>
                <h1 className="simple-container__title">{"Transfer"}</h1>
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

