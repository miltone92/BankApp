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


export const AccountDetails = () => {

    const [movements, setMovements] = useState(null);
    const [account, setAccount] = useState(null);

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
            ></AccountContainer> 
            } 
            {movements !== null &&
            <MovemetsContainer
            movements={movements}
            ></MovemetsContainer> 
            } 
            
        </ContentContainer>
    )

}

export default AccountDetails;
