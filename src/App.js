import React, { useState, useEffect } from "react";
import './Style/App.scss';


//Dependencies
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

//Componets
import Dashboard from "./components/dashboard/Dashboard";

//Pages
import Login from "./pages/login/Login";


/**********************************
 * APP
 * 
/**********************************/

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
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
