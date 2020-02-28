import React, { useState, useEffect } from "react";

//Dependencies
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import emailjs from 'emailjs-com';
//Componets
import AppContainer from "../app-container/AppContainer";
import MainContent from "../main-content/MainContent";
import SideNav from "../side-nav/SideNav";
import NavLink from "../side-nav/nav-link/NavLink";
import NavLogo from "../side-nav/nav-logo/NavLogo";
import UserImage from "../user/userImage/UserImage";
import PopOver from "../../components/buttons/PopOver/PopOver"
//Pages
import Accounts from "../../pages/accounts/Accounts"
import AccountDetails from "../../pages/account-details/AccountDetails";
import Statistics from "../../pages/statistics/Statistics"
import Landing from "../../pages/landing/Landing"
//api
import currencyLayer from "../../api/currencyLayer"




export const Dashboard = () => {

  const log = JSON.parse(sessionStorage.getItem("log"));
  const [exchangeRate, setExchangeRate] = useState(null)


  let redirectToProfile = () => {
    //window.location.href = "/UserProfile";
    sessionStorage.removeItem("user");
    window.location.reload();
  }


    let getCurrencyExchangeRate = async () =>{
      let response = await currencyLayer.get();
      setExchangeRate(Math.round(response.data.quotes.USDCRC))
  }

    useEffect(() =>{
     // getCurrencyExchangeRate();
  }, [])

  
    return (
      <AppContainer>
        <UserImage callback={redirectToProfile} />
        {/* <Log/> */}
        <PopOver 
        title="Last Sign-In" 
        list={[
            `OS: ${log.os} `,
            `OS Version: ${log.osVersion} `,
            `Browser: ${log.browser} `,
            `Browser Version: ${log.browserVersion}`, 
            `Date: ${log.date} `,
        ]}><i className="fas fa-broadcast-tower"></i></PopOver>

        <SideNav>
          <NavLogo href="/">
            growBank <i className="fas fa-seedling"></i>
          </NavLogo>
          <NavLink href="/AccountsDebit">
            <i className="fas fa-piggy-bank side-nav__icon"></i> Accounts
          </NavLink>
          <NavLink href="/AccountsCredit">
            <i className="fas fa-credit-card side-nav__icon"></i> Cedit Cards
          </NavLink>
          <NavLink href="/Statistics">
            <i className="fas fa-chart-pie side-nav__icon"></i> Statistics
          </NavLink>
        
         
          <NavLink href="#" style={{marginTop: "20px"}} className={""}>
            <i class="fas fa-exchange-alt side-nav__icon"></i> {` 1 USD : 568 CRC`}
          </NavLink>
        </SideNav>

        <MainContent>
          <Switch>
            <Route exact path="/">
              <Landing></Landing>
            </Route>
            <Route exact path="/AccountsDebit">
              <Accounts accountType="debit"></Accounts>
            </Route>
            <Route exact path="/AccountsCredit">
              <Accounts accountType="credit"></Accounts>
            </Route>
            <Route exact path="/UserProfile">
              <h1>Profile</h1>
            </Route>
            <Route exact path="/AccountDetails">
              <AccountDetails></AccountDetails>
            </Route>
            <Route exact path="/Statistics">
              <Statistics></Statistics>
            </Route>
          </Switch>
        </MainContent>
        
      </AppContainer>
    );
  
}

export default Dashboard;
