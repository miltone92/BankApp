import React,{useState, useEffect} from "react";

//Api
import movementAPI from "../../../api/movements";
//Components
import ContentContainer from "../../main-content/content-container/ContentContainer"
import Button from "../../buttons/Button/Button";
import Form from "../../form/Form";
import Alert from "../../alert/box/AlertBox"
//Libs
import benri from "../../../libs/benri"


/********************
 * Component
 * 
 ********************/

export const PaymentMenu = (props) =>{

    const [view, setView] = useState();
    const [movement, setMovement] = useState(null);
    const [alert, setAlert] = useState({
        show: false,
        type: "",
        title: "",
        message: "",
        buttonLabel: "",
    });

    let defineMovementSchema = (data) =>{

        if (data.amount !== undefined){
        let now = new Date();
        now = now.toLocaleString('en-GB');
        let service = benri.capitalizeFirstLetter(view)
            setMovement({
                name : `${service} payment`,
                date : now,
                type : "Payment",
                detail : `${service} payment to: ${data.detail}`,
                origin : props.account.accountNumber,
                destination : "payment",
                amount : data.amount, 
                currency : "USD"
        })
    }
   }

    let getWaterServiceForm = (data) =>{
        setView("water")
        defineMovementSchema(data)
        console.log(data)
    }

    let getElectricServiceForm = (data) =>{
        setView("electric")
        defineMovementSchema(data)
        console.log(data)
    }

    let getPhoneServiceForm = (data) =>{
        setView("phone")
        defineMovementSchema(data)
        console.log(data)
    }

    let getTvServiceForm = (data) =>{
        setView("tv")
        defineMovementSchema(data)
        console.log(data)
    }


    
   let postMovement = async () =>{
       console.log("in post")
        await movementAPI.post(`?destination=${movement.origin}`, movement);


        setAlert({
            show: true,
            type: "success",
            title: "Success",
            message: `The amount of ${movement.currency} ${movement.amount} has been payed. ${movement.detail}`,
            buttonLabel: "OK",
          });

        props.callback();
   }

   let resetForm = () =>{
        setMovement(false)
        setAlert({
            show: false
        })
    }

    useEffect(()=>{
        console.log("in use effect")

        if(movement !== null && movement.amount !== undefined){
            postMovement();
        }

    },[movement])
    
    return (
        <ContentContainer className="simple-container">

            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1 className="simple-container__title">Payments</h1>

                {!alert.show &&
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: 'center'}}>
                        <Button callback={getWaterServiceForm} className={ view === "water" ? "circular-button  circular-button--active" : "circular-button"}><i class="fas fa-tint"></i></Button>
                        <Button callback={getElectricServiceForm} className={ view === "electric" ? "circular-button  circular-button--active" : "circular-button"}><i class="fas fa-bolt"></i></Button>
                        <Button callback={getPhoneServiceForm} className={ view === "phone" ? "circular-button  circular-button--active" : "circular-button"}><i class="fas fa-phone"></i></Button>
                        <Button callback={getTvServiceForm} className={ view === "tv" ? "circular-button  circular-button--active" : "circular-button"}><i class="fas fa-tv"></i></Button>
                    </div>
        
            }
            </div>
            {/* water  */}
            {view === "water" && !alert.show
                &&<Form
                    title = {"Pay Water Service"}
                    inputs = {[
                        {
                            name: "detail",
                            placeholder: "Enter client code"
                        },
                        {
                            name: "amount",
                            placeholder: "Enter amount"
                        }]}
                    callback = {getWaterServiceForm}
                ></Form> 
            }  

            {/* electricity */}
            {view === "electric" && !alert.show
                && <Form
                    title = {"Pay Electric Service"}
                    inputs = {[
                        {
                            name: "detail",
                            placeholder: "Enter client code"
                        },
                        {
                            name: "amount",
                            placeholder: "Enter amount"
                        }]}
                    callback = {getElectricServiceForm}
                ></Form> 
            } 

            {/* phone */}
            {   view === "phone" && !alert.show
                &&<Form
                    title = {"Pay Phone Service"}
                    inputs = {[
                        {
                            name: "detail",
                            placeholder: "Enter phone number"
                        },
                        {
                            name: "amount",
                            placeholder: "Enter amount"
                        },
                    ]}
                    callback = {getPhoneServiceForm}
                ></Form> 
            }  
            {/* tv */}
            {   view === "tv" && !alert.show
                &&<Form
                    title = {"Pay Television Service"}
                    inputs = {[
                        {
                            name: "detail",
                            placeholder: "Enter client code"
                        },
                        {
                            name: "amount",
                            placeholder: "Enter amount"
                        }]}
                    callback = {getTvServiceForm}
                ></Form> 
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

export default PaymentMenu;