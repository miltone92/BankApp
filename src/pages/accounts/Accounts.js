import React, {useState, useEffect} from "react";

//API
import accountsDB from "../../api/accounts";
//Dependencies
import Form from "../../components/form/Form";
//Components
import SectionHeader from "../../components/main-content/header-text/HeaderText";
import ContentContainer from "../../components/main-content/content-container/ContentContainer"
import AccountContainer from "../../components/BankApp/account-container/AccountContainer"
import Button from "../../components/buttons/Button/Button"
import Modal from "../../components/modal/Modal"
import Alert from "../../components/alert/bar/Alert";
//libs
import benri from "../../libs/benri"



export const Accounts = () =>{
    const user = JSON.parse(sessionStorage.getItem("user"));

    //state
    const [accounts, setAccounts] = useState({
        accounts: []
    })
    const [modal, setModal] = useState("none")
    const [alert, setAlert] = useState({showAlert: false});

    let getAccountsData = async () =>{
        let response = await accountsDB.get(`?owner=${user.email}`);
        response = response.data;

        let accountTypes = [];
        let accountBalances = [];
        for (const a of response) {
            accountTypes.push(a.type);
            accountBalances.push(a.balance)
        }
        setAccounts({
            accounts: response,
            accountTypes: accountTypes,
            accountBalances: accountBalances
        })
    }

    //callbacks to send
    let viewDetails = (accountNumber) =>{
        window.location.href = `/AccountDetails?account=${accountNumber}`;
     }

    let createAccount = async (data) =>{
       //Api call

        let iban =  benri.getRandomNumberFromLimit(9999999999999999999);
        iban = `CR${iban}`
        let accountNumber = benri.getLastCharactersFromString(iban, 10)
        let newAccount = {
            balace: 0,
            type: data.type,
            accountNumber: accountNumber,
            iban: iban,
            currency: data.currency,
            owner: user.email,
            ownerName: user.username,
        }
        console.log(newAccount)
        try{
            let response = await accountsDB.post("", newAccount);
            response.status == 200 &&
                setAlert({
                    showAlert: true,
                    alertText: `${data.type} has been resgistered`,
                    alertType: "success",
                    callback: removeAlert
                });

            setModal("none");
            getAccountsData();
        }
        catch(e){
            console.log(e)
            setAlert({
              showAlert: true,
              alertText: "Oops: Something went wrong!",
              alertType: "error",
              callback: removeAlert
            });
            setModal("none");  
        }
       
    }
     
    let useModal = () =>{
        setModal("block");
        let modal = document.getElementById("modal")
        window.onclick = function(event) {
            if (event.target == modal) {
              setModal("none")
            }
          }
    }

    let getModalContent = () =>{
        //Modal will hold a container with a form
        console.log("get modal content")
        return (
            <ContentContainer className="simple-container" style={{maxWidth: "250px", padding:"30px 5px"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Form
                        title = {"Create New Account"}
                        inputs = {[
                            {
                                name: "type",
                                placeholder: "Enter account name"
                            },
                           ]}
                        selects = {[
                            {
                                name: "currency",
                                options: ["USD", "CRC"]
                                
                            }
                        ]}
                        callback = {createAccount}
                        buttonTitle = "Create account"
                            >
                    </Form> 
                </div>

            </ContentContainer>
        )
    }

    let removeAlert = () =>{
        setAlert({showAlert: false});
      }

    //Did mount
    useEffect(() =>{
        console.log(user)
        // console.log(user.email)
        getAccountsData();
    }, [])

    return(
        <ContentContainer>

            <Alert
                show={alert.showAlert}
                text={alert.alertText}
                alertType={alert.alertType}
                callback={removeAlert}
             />
            
            <Modal
                style={{display: modal}}
            >
                {getModalContent()}
            </Modal>

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <SectionHeader>Accounts</SectionHeader>
                <Button style={{margin: "0"}} className="circular-button" callback={useModal}><i class="fas fa-plus"></i></Button>
            </div>
                <div >
                    {accounts.accounts.map(a => (
                        <AccountContainer
                        account={a}
                        title={a.type.toUpperCase()}
                        currency={a.currency}
                        number={a.accountNumber}
                        iban={a.iban}
                        balance={a.balance}
                        buttonLabel="Details"
                        callback={viewDetails}
                        callbackParams={a.accountNumber}
                        />
                        ))}
                </div>
         <br/>
         <br/>
         <br/>
            </ContentContainer>
           
        )
}

export default Accounts;