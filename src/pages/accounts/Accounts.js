import React, {useState, useEffect, useContext} from "react";

//API
import accountsDB from "../../api/accounts";

//Context
import {UserContext} from "../../contexts/UserContext"

//Components
import Section from "../../components/main-content/section/Section";
import SectionHeader from "../../components/main-content/header-text/HeaderText";
import ContentContainer from "../../components/main-content/content-container/ContentContainer"
import AccountContainer from "../../components/BankApp/account-container/AccountContainer"

export const Accounts = () =>{
    const user = JSON.parse(sessionStorage.getItem("user"));

    const [accounts, setAccounts] = useState({
        accounts: []
    })

    let getAccountsData = async () =>{
        let response = await accountsDB.get(`?owner=${user.email}`);
        response = response.data;

        setAccounts({
            accounts: response
        })
    }

    //callback to send
    let viewDetails = (accountNumber) =>{
        window.location.href = `/AccountDetails?account=${accountNumber}`;
     }

    useEffect(() =>{
        console.log(user)
        // console.log(user.email)
        getAccountsData();
    }, [])



    return(
        <ContentContainer>
            <SectionHeader>Accounts</SectionHeader>
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
        </ContentContainer>
    )
}

export default Accounts;