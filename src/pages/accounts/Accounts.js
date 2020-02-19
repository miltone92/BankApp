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

    useEffect(() =>{
        
        console.log(user)
        // console.log(user.email)
     
        getAccountsData();
    }, [])

    return(
        <Section>
            <SectionHeader>Accounts</SectionHeader>
            {accounts.accounts.map(a => (
                <AccountContainer
                title={a.type.toUpperCase()}
                currency={a.currency}
                number={a.accountNumber}
                iban={a.iban}
                balance={a.balance}
                />
            ))}
                {/* <AccountContainer
                title={"Account"}
                number={accounts.}
                >
                    <h1>My First Bootstrap Page</h1>
                    <p>This part is inside a .container class.</p> 
                    <p>The .container class provides a responsive fixed width container.</p>
                    <p>Resize the browser window to see that its width (max-width) will change at different breakpoints.</p>
                </AccountContainer> */}
            
        </Section>
    )
}

export default Accounts;