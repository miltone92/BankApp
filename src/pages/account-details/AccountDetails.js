import React, { useState, useEffect, } from "react";
import {UserContext} from "../../contexts/UserContext";



//API
import movementDB from "../../api/movements";
import accountsDB from "../../api/accounts";


//Components
import ContentContainer from "../../components/main-content/content-container/ContentContainer"
import SectionHeader from "../../components/main-content/header-text/HeaderText";
import AccountContainer from "../../components/BankApp/account-container/AccountContainer";
import MovemetsContainer from "../../components/BankApp/movements-container/MovementsContainer"
import MovementForm from "../../components/BankApp/movement-form/MovementForm"
import ActionNav from "../../components/BankApp/account-action-menu/AccountActionMenu"
import PaymentsMenu from "../../components/BankApp/payment-menu/PaymentMenu"
import StaticsMenu from "../../components/BankApp/statistics-menu/StatisticsMenu";


export const AccountDetails = () => {

    const [movements, setMovements] = useState(null);
    const [account, setAccount] = useState(null);
    const [view, setView] = useState("movements");

    let getUrlParam = (query) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(query)
    }

    let getAccountDetails = async () =>{
        let accountNumber = getUrlParam("account")
        let movements = await movementDB.get(`?destination=${accountNumber}`);
        movements = movements.data;
        setMovements(movements);

        let account = await accountsDB.get(`?number=${accountNumber}`);
        account = account.data[0];
        setAccount(account)
        console.log(account)
    }

    let toggleView = (view) =>{
        setView(view);
    }


    useEffect(()=>{
        getAccountDetails();
    }, [])

    return (
    
        <ContentContainer>
            <SectionHeader> Account Details</SectionHeader>
            {account !== null &&
            <AccountContainer
                title={account.type.toUpperCase()}
                currency={account.currency}
                number={account.accountNumber}
                iban={account.iban}
                balance={account.balance}
                buttonLabel = {"Actions"}
                showButton = {false}
            ></AccountContainer> 
            } 
            <ActionNav
                callback={toggleView}
                redirects={[
                    {
                        title: "Movements",
                        value: "movements",
                    },
                    {
                        title: "Statistics",
                        value: "statistics",
                    },
                    {
                        title: "Transfers",
                        value: "movementForm",
                    },
                    {
                        title: "Payments",
                        value: "payments",
                    },

                ]}
                view = {view}
            >
            </ActionNav>

            {/* Movements */}
            {movements !== null && view === "movements"
                &&<MovemetsContainer
                    movements={movements}
                    account={account}
                ></MovemetsContainer> 
            }  

            {/* Transfers */}
            {view === "movementForm" 
                && <MovementForm
                account = {account}
                callback = {getAccountDetails}
                ></MovementForm> 
            } 

            {/* Payments */}
            {   view === "payments"
                &&<PaymentsMenu
                    account={account}
                    callback={getAccountDetails}
                ></PaymentsMenu> 
            } 

            {/* Statistics */}
            {   view === "statistics"
                &&<StaticsMenu
                    movements={movements}
                    account={account}
                ></StaticsMenu> 
            }   
            
       

          <br></br>
          <br></br>
        </ContentContainer>
    )

}

export default AccountDetails;
