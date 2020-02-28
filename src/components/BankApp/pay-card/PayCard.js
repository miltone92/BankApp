import React,{useState, useEffect} from "react";

//Api
import movementAPI from "../../../api/movements";
import accountAPI from  "../../../api/accounts"
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

export const PayCard = (props) =>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [view, setView] = useState("payCard");
    const [movement, setMovement] = useState(null);
    const [alert, setAlert] = useState({
        show: false,
        type: "",
        title: "",
        message: "",
        buttonLabel: "",
    });
    const [accounts, setAccounts] = useState(null)

    let getAccountsData = async () =>{
      
            let jws = user.jwt;
            let response = await accountAPI.get(`?owner=${user.email}`, {
              headers: {
                jws: jws
              }
            });
            response = response.data;
    
            //We must filter the response
            //Depending on whether we need credit or debit
            let accountsToUse = [];
            for (const a of response) {
                a.type === "debit" && accountsToUse.push(a)
            }
           
            let accountNumbers = [];
            for (const a of accountsToUse) {
                accountNumbers.push(`${a.accountNumber}`);
            }
            setAccounts({
                accounts: accountsToUse,
                accountNumbers: accountNumbers,
            })
        
           
        }
    

    let defineMovementSchema = (data) =>{

        
        if (data.amount !== undefined){
        let now = new Date();
        now = now.toLocaleString('en-GB');
            setMovement({
                name : `Card payment`,
                date : now,
                type : "Transfer",
                detail : `Payment of card number: ${data.amount}`,
                origin : data.account,
                destination : props.account.accountNumber,
                amount : data.amount, 
                currency : "USD",

        })
    }
   }

    let getForm = (data) =>{
 
        //find the respective account. 
        let account = accounts.accounts.filter(a => a.accountNumber === data.account)
        account = account[0]
        //Make sure it has enough founds
        account.balance - data.amount >= 0
        ? defineMovementSchema(data)
        : setAlert({
            show: true,
            type: "Error",
            title: "Error",
            message: `You don't have enough money in chosen account.`,
            buttonLabel: "OK",
          });
        
        //defineMovementSchema(data)
    }

    
   let postMovement = async () =>{
  
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

        if(movement !== null && movement.amount !== undefined){
            postMovement()
        }

    },[movement])

    //did mount
    useEffect(() =>{
        getAccountsData();
    }, [])
    
    return (
        <ContentContainer className="simple-container" style={{minHeight: "285px"}}>

            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1 className="simple-container__title">{`Pay Card`}</h1>
            </div>
            {/* payCard  */}
            {view === "payCard" && accounts!== null && !alert.show
                &&<Form
                    title = {""}
                    selects = {[
                        {
                            name: "account",
                            options: accounts.accountNumbers
                        }
                    ]}
                    inputs = {[
                        {
                            name: "amount",
                            placeholder: "Enter amount to debit"
                        }]}
                    callback = {getForm}
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

export default PayCard;