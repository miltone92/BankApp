import React, { Component } from "react";

//Dependencies
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

//Componets
import AppContainer from "../app-container/AppContainer";
import MainContent from "../main-content/MainContent";
import SideNav from "../side-nav/SideNav";
import NavLink from "../side-nav/nav-link/NavLink";
import NavLogo from "../side-nav/nav-logo/NavLogo"
import UserImage from "../user/userImage/UserImage"

//Pages
import UserList from "../../pages/UserList/UserList"
import Accounts from "../../pages/accounts/Accounts"
import AccountDetails from "../../pages/account-details/AccountDetails";

export class Dashboard extends Component {

  redirectToProfile = () => {
    window.location.href = "/UserProfile";
  }

  render() {
    return (
      <AppContainer>
        <UserImage callback={this.redirectToProfile} />
        <SideNav>
          <NavLogo href="/">
            BabeSafe
          </NavLogo>
          <NavLink href="/Accounts">
          <i class="fas fa-piggy-bank"></i> Accounts
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
            {/* <Route exact path="/VideoSearch">
            <h1>Video</h1>
            </Route>
            <Route exact path="/KanjiStudy">
            <h1>study</h1>
            </Route>
             */}



          </Switch>
        </MainContent>
      </AppContainer>
    );
  }
}

export default Dashboard;
