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



export const Accounts = (props) =>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    const {accountType} = props; 

    //state
    const [accounts, setAccounts] = useState({
        accounts: []
    })
    const [modal, setModal] = useState("none")
    const [alert, setAlert] = useState({showAlert: false});

    let getAccountsData = async () =>{
      
        let jws = user.jwt;
        let response = await accountsDB.get(`?owner=${user.email}`, {
          headers: {
            jws: jws
          }
        });
        response = response.data;

        //We must filter the response
        //Depending on whether we need credit or debit
        let accountsToUse = [];
        for (const a of response) {
            a.type === accountType && accountsToUse.push(a)
        }

        

        let accountNames = [];
        let accountBalances = [];
        for (const a of accountsToUse) {
            accountNames.push(a.name);
            accountBalances.push(a.balance)
        }
        setAccounts({
            accounts: accountsToUse,
            accountNames: accountNames,
            accountBalances: accountBalances
        })
    }

    //callbacks to send
    let viewDetails = (accountNumber) =>{
        window.location.href = `/AccountDetails?account=${accountNumber}`;
     }

    let createAccount = async (data) =>{
       //Api call

        let cardNumber = benri.getRandomNumberFromLimit(9999999999999999);
        let iban =  benri.getRandomNumberFromLimit(9999999999999999999);
        iban = `CR${iban}`
        let accountNumber = benri.getLastCharactersFromString(iban, 10)
        
        let newAccount = {}

            accountType === "debit"
            ?   newAccount = {
                balace: 0,
                name: data.name,
                type: "debit",
                accountNumber: accountNumber,
                iban: iban,
                currency: data.currency,
                owner: user.email,
                ownerName: user.username,
                creditLimit: 0,
            }
            :   newAccount = {
                balance: 5000,
                name: data.cardType,
                type: "credit",
                accountNumber: cardNumber,
                iban: cardNumber,
                currency: "USD",
                owner: user.email,
                ownerName: user.username,
                creditLimit: 5000,
            }
        
        try{
            let response = await accountsDB.post("", newAccount);
            response.status === 200 &&
                setAlert({
                    showAlert: true,
                    alertText: `Success`,
                    alertType: "success",
                    callback: removeAlert
                });

            setModal("none");
            getAccountsData();
        }
        catch(e){
            setAlert({
              showAlert: true,
              alertText: "Oops: Something went wrong!",
              alertType: "error",
              callback: removeAlert
            });
            setModal("none");  
            console.error(e);
        }
       
    }
     
    let useModal = () =>{
        setModal("block");
        let modal = document.getElementById("modal")
        window.onclick = function(event) {
            if (event.target === modal) {
              setModal("none")
            }
          }
    }

    let getModalContent = () =>{
        //Modal will hold a container with a form
        
        if(accountType === "debit"){
            return (
                <ContentContainer className="simple-container" style={{maxWidth: "250px", padding:"30px 5px"}}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Form
                            title = {"Create New Account"}
                            inputs = {[
                                {
                                    name: "name",
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

        if(accountType === "credit"){
            return (
                <ContentContainer className="simple-container" style={{maxWidth: "250px", padding:"30px 5px"}}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Form
                            title = {"Create New Card"}
                            selects = {[
                                {
                                    name: "cardType",
                                    options: ["VISA", "Mastercard", "AMEX"]
                                    
                                }
                            ]}
                            callback = {createAccount}
                            buttonTitle = "Create card"
                                >
                        </Form> 
                    </div>

                </ContentContainer>
            )
        }
    }

    let removeAlert = () =>{
        setAlert({showAlert: false});
      }

    //Did mount
    useEffect(() =>{
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
                {
                    accountType === "debit"
                    ?    <SectionHeader>Accounts</SectionHeader>
                    :   <SectionHeader>Credit Cards</SectionHeader>
                }
              
                <Button style={{margin: "0"}} className="circular-button" callback={useModal}><i class="fas fa-plus"></i></Button>
            </div>
                <div >
                    {accounts.accounts.map(a => (
                        <AccountContainer
                        account={a}
                        title={a.name}
                        currency={a.currency}
                        number={a.accountNumber}
                        iban={a.iban}
                        balance={a.balance}
                        buttonLabel="Details"
                        callback={viewDetails}
                        callbackParams={a.accountNumber}
                        type={a.type}
                        creditLimit={a.creditLimit}
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