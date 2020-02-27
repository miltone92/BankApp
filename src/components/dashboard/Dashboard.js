import React, { Component, useEffect } from "react";

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





export const Dashboard = () => {

  const log = JSON.parse(sessionStorage.getItem("log"));

  let redirectToProfile = () => {
    //window.location.href = "/UserProfile";
    sessionStorage.removeItem("user");
    window.location.reload();
  }


  
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
        ]}><i class="fas fa-broadcast-tower"></i></PopOver>

        <SideNav>
          <NavLogo href="/">
            GrowBank
          </NavLogo>
          <NavLink href="/Accounts">
          <i className="fas fa-piggy-bank side-nav__icon"></i> Accounts
          </NavLink>
          <NavLink href="/Statistics">
          <i className="fas fa-chart-pie side-nav__icon"></i> Statistics
          </NavLink>
        </SideNav>

        <MainContent>
          <Switch>
            <Route exact path="/">
              <h1>Landing</h1>
            </Route>
            <Route exact path="/Accounts">
            <Accounts></Accounts>
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
