import React, { useState, useEffect, useContext } from "react";


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  

  //Context
import {UserProvider, UserContext} from  "../../contexts/UserContext";
// import UserContext from "./contexts/UserContext"



//Componets
import Dashboard from "../../components/dashboard/Dashboard";

//Pages
import Login from "../../pages/login/Login";


/**********************************
 * Security Router
 * 
/**********************************/


export const SecurityRouter = () =>{
    const [logged, setLog] = useState(false);
    const [context] = useContext(UserContext);

    useEffect(() => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!");
        console.log(context)

            setLog(context.user !== null)
       
    });
      

    return(
        
            <Switch>
                <Route path="/login" render={props => <Login {...props}/>}/>
                <Route
                path="/"
                render={props => (logged ? <Dashboard /> : <Redirect to="login"/>)}
                />
            </Switch>
    )
}

export default SecurityRouter;