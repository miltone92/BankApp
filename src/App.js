import React, { useState, useEffect } from "react";
import './style/App.scss';

//Dependencies
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
//Componets
import Dashboard from "./components/dashboard/Dashboard";
//Pages
import Login from "./pages/login/Login";
//libs
import benri from "./libs/benri"




/**********************************
 * APP
 * 
/**********************************/

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    
 
    console.log("************************")
    console.log(benri.getOSandBrowser())

    
    
    let loggedUser = sessionStorage.getItem("user");
    console.log(loggedUser);
    if (loggedUser !== null) {
      setUser(true);
    }
  });

  console.log(user);

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          render={props => (user ? <Dashboard /> : <Login></Login>)}
        />
      </Switch>
    </Router>
  );
}

export default App;
