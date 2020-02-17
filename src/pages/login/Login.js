import React, { useState } from "react";

//Style
import "./Login.scss";

//Components

import CheckBoxToggle from "../../components/checkBoxToggle/CheckBoxToggle";
import TextInputBorder from "../../components/inputs/TextInputBorder";
import SectionHeader from "../../components/main-content/header-text/HeaderText";
import Alert from "../../components/alert/Alert";
import FilledButton from "../../components/buttons/filledButton/FilledButton";

//Data
import users from "../../data/users/users";

export const Login = () => {
  //state
  const [alert, setAlert] = useState({
    showAlert: false,
    alertText: "",
    alertType: ""
  });

  let onSubmit = () => {
    let username = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;
    let logged = false;

    for (const user of users.data) {
      if (user.username == username && user.password == password) {
        sessionStorage.setItem("user", JSON.stringify(user));
        logged = true;
        window.location.reload();
      }
    }

    !logged &&
      setAlert({
        showAlert: true,
        alertText: "Error: credentials are invalid!",
        alertType: "error"
      });
  };

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
