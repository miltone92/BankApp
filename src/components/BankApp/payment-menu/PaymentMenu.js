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

    const [view, setView] = useState("Water");
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
                currency : "USD",

        })
    }
   }

    let getWaterServiceForm = (data) =>{
        setView("Water")
        defineMovementSchema(data)
        console.log(data)
    }

    let getElectricServiceForm = (data) =>{
        setView("Electric")
        defineMovementSchema(data)
        console.log(data)
    }

    let getPhoneServiceForm = (data) =>{
        setView("Phone")
        defineMovementSchema(data)
        console.log(data)
    }

    let getTvServiceForm = (data) =>{
        setView("Tv")
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

            props.account.balance - movement.amount  >= 0
                ? postMovement()
                : setAlert({
                    show: true,
                    type: "Error",
                    title: "Error",
                    message: `You don't have enough money in your balance`,
                    buttonLabel: "OK",
                  });
        
        }

    },[movement])
    
    return (
        <ContentContainer className="simple-container" style={{minHeight: "285px"}}>

            <div style={{display: "flex", justifyContent: "space-between"}}>
    <h1 className="simple-container__title">{`${view} Service`}</h1>

                {!alert.show &&
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "Center", alignItems: 'center'}}>
                        <Button callback={getWaterServiceForm} className={ view === "Water" ? "circular-button  circular-button--active" : "circular-button"}><i class="fas fa-tint"></i></Button>
                        <Button callback={getElectricServiceForm} className={ view === "Electric" ? "circular-button  circular-button--active" : "circular-button"}><i class="fas fa-bolt"></i></Button>
                        <Button callback={getPhoneServiceForm} className={ view === "Phone" ? "circular-button  circular-button--active" : "circular-button"}><i class="fas fa-phone"></i></Button>
                        <Button callback={getTvServiceForm} className={ view === "Tv" ? "circular-button  circular-button--active" : "circular-button"}><i class="fas fa-tv"></i></Button>
                    </div>
        
            }
            </div>
            {/* water  */}
            {view === "Water" && !alert.show
                &&<Form
                    title = {""}
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
            {view === "Electric" && !alert.show
                && <Form
                    title = {""}
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
            {   view === "Phone" && !alert.show
                &&<Form
                    title = {""}
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
            {   view === "Tv" && !alert.show
                &&<Form
                    title = {""}
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