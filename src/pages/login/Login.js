import React, { useState, useEffect, useContext } from "react";
import {UserContext} from "../../contexts/UserContext";

//Style
import "./Login.scss";

//Components

import CheckBoxToggle from "../../components/checkBoxToggle/CheckBoxToggle";
import TextInputBorder from "../../components/inputs/TextInputBorder";
import SectionHeader from "../../components/main-content/header-text/HeaderText";
import Alert from "../../components/alert/bar/Alert";
import FilledButton from "../../components/buttons/Button/Button";

//Hooks
import setUser from "../../hooks/SetUser";
//API
import usersDB from "../../api/users";


export const Login = () => {

    //state
    const [alert, setAlert] = useState({
      showAlert: false,
      alertText: "",
      alertType: ""
    });

    //Context
    const { user, setNewUser } = setUser();

 
    let onSubmit = async () => {
      let email = document.getElementById("emailInput").value;
      let password = document.getElementById("passwordInput").value;
      let logged = false;

    try{
      let response = await usersDB.get(`?email=${email}&pw=${password}`);
      response = response.data[0];

      if(response.email === email && response.password === password){
        sessionStorage.setItem("user", JSON.stringify(response));
        logged = true;
        setNewUser(
         response
        )
        window.location.reload();
   
      }
    }
    catch(e){
      console.log(e)
    }


    !logged &&
      setAlert({
        showAlert: true,
        alertText: "Error: credentials are invalid!",
        alertType: "error"
      });
  };

  useEffect(() => {
    console.log("user", user);
  }, [user]);



  return (
    <div className="login-container">
      <Alert
        show={alert.showAlert}
        text={alert.alertText}
        alertType={alert.alertType}
      />

      <div className="login-contents">
        <SectionHeader>Login</SectionHeader>
        <TextInputBorder
          type="text"
          placeholder="Email"
          // ref={node => (input = node)}
          id="emailInput"
        ></TextInputBorder>
        <TextInputBorder
          type="password"
          placeholder="Password"
          // ref={node => (password = node)}
          id="passwordInput"
        ></TextInputBorder>
        <CheckBoxToggle label="Remember me" />
        <FilledButton callback={onSubmit}>Login</FilledButton>
      </div>
    </div>
  );
};

export default Login;
