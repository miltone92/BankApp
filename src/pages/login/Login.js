import React, { useState, useEffect, useContext, useCallback } from "react";
import {UserContext} from "../../contexts/UserContext";

//Style
import "./Login.scss";
//Dependencies
import {useForm} from 'react-hook-form'
//API
import usersApi from "../../api/users";
import logApi from "../../api/log"
//Components
import Alert from "../../components/alert/bar/Alert";
//Libs
import benri from "../../libs/benri";


export const Login = () => {

  //Form
  const { register, handleSubmit, watch, errors } = useForm();

  //State
  const [view, setView] = useState("signIn");
  const [alert, setAlert] = useState({showAlert: false});
  const [panel, setPanel] = useState("")

  let getAndPostLog = async (user) =>{

    let now = new Date();
    now = now.toLocaleString('en-GB');
    let logInfo = benri.getOSandBrowser();

    let log = {
      user: user,
      os: logInfo.os,
      osVersion: logInfo.osVersion,
      browser: logInfo.browser,
      browserVersion: logInfo.browserVersion,
      date: now
    }
    
    let emptyLog = {
      user: user,
      os: "unavailable",
      osVersion: "unavailable",
      browser: "unavailable",
      browserVersion: "unavailable",
      date: "unavailable"
    }

    //GET
    try{
      let response = await logApi.get(`?user=${user}`);

      sessionStorage.setItem("log", JSON.stringify(response.data));
    }
    catch(e){
      sessionStorage.setItem("log", JSON.stringify(emptyLog));
    }




    //POST
      let postResponse = await logApi.post(``, log);


     window.location.reload();
  }

  let signInSubmit = async (data) =>{

    try{
      let response = await usersApi.get(`?email=${data.email}&pw=${data.password}`);
      response = response.data[0];

      if(response.email === data.email && response.password === data.password){
          sessionStorage.setItem("user", JSON.stringify(response));
          getAndPostLog(data.email);
      
        }
    }
    catch(e){

      setAlert({
        showAlert: true,
        alertText: "Oops: credentials are invalid!",
        alertType: "error",
        callback: removeAlert
      });
    }
  }

  let signUpSubmit = async (data) =>{


    let user = {
      username: data.fullName,
      email: data.email,
      password: data.password
    }

    try{

      let response = await usersApi.post("", user);
      response.status == 200
        &&       setAlert({
          showAlert: true,
          alertText: "User has been registered!",
          alertType: "success",
          callback: removeAlert
        });
        setView("signIn")
        setPanel("")
      
    }
    catch(e){
      setAlert({
        showAlert: true,
        alertText: "Ooops: User has already been registered!",
        alertType: "error",
        callback: removeAlert
      });
      //
    }
  }
  
  let removeAlert = () =>{
    setAlert({showAlert: false});
  }

  useEffect(() =>{
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  
  signUpButton.addEventListener('click', () => {
    setView("signUp")
    setPanel("right-panel-active")
  });
  
  signInButton.addEventListener('click', () => {
    setView("signIn")
    setPanel("")
  });
},[])

  let getView = () =>{

    switch(true) {

      case view === "signIn":
        return (
        <div className="login__form--container login__sign-in-container">
          <form onSubmit={handleSubmit(signInSubmit)}  className="login__form" action="#">
            <h1 className="login__h1">Sign in</h1>
            <span className="login__span">{" "}</span>
  
            <input className="login__input" name="email" ref={register({ required: true })} type="email" placeholder="Email"  
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false" />
            <input className="login__input" name="password" ref={register({ required: true })} type="password" placeholder="Password"  
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false" />
            <input className="login__input" name="nothing" defaultValue="nothing" ref={register({ required: true })} type="password" placeholder="Nothing" style={{display: "none"}} 
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false" />
          

            {/* <a className="login__a" href="#">Forgot your password?</a> */}
            <button className="login__button">Sign In</button>
          </form>
        </div>
        )


      case view === "signUp":
        return (
          <div className="login__form--container login__sign-up-container">
          <form onSubmit={handleSubmit(signUpSubmit)} className="login__form" action="#">
            <h1 className="login__h1">Create Account</h1>
        <span className="login__span">{""}</span>
  
            <input className="login__input" name="fullName" type="text" ref={register({ required: true })} placeholder="Full name"  
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false" />
            <input className="login__input" name="email"  type="email" ref={register({ required: true })} placeholder="Email"  
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false" />
            <input className="login__input" name="password" type="password" ref={register({ required: true })} placeholder="Password"  
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false" />
  
            <button className="login__button">Sign Up</button>
          </form>
        </div>
        )

      default:
        break;
    }

  }

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw"}}> 

      <Alert
            show={alert.showAlert}
            text={alert.alertText}
            alertType={alert.alertType}
            callback={removeAlert}
      />
  
      <div className={`login__container ${panel}`} id="loginContainer">
          {getView()}
          <div className="login__overlay--container">
            <div className="login__overlay">
              <div className="login__overlay--panel login__overlay--left">
                <h1>Not new?</h1>
                <p>Please login with your personal info</p>
                <button type="submit" className=" login__button login__button--ghost" id="signIn">Sign In</button>
              </div>
              <div className="login__overlay--panel login__overlay--right">
                <h1>growBank <i class="fas fa-seedling"></i></h1>
                <p>Enter your personal details and start journey with us</p>
                <button  className="login__button login__button--ghost" id="signUp">Sign Up</button>
              </div>
            </div>
        </div>
      </div>

    </div>

  );
};

export default Login;
