import React, { useState, useEffect } from "react";
import "./Alert.scss";

export const Alert = (props) =>{

  const { show, alertType, text, callback } = props;
  const [margin, setMargin ] = useState("0px")

  
  useEffect(() =>{
 
  }, [])

  let removeAlert = () => {
    //animate
    setMargin("-60px")
    setTimeout(() => {
      setMargin("0px")
      callback();
    }, 850);
  
  };

  return (
     show && 
        <div className={`${alertType} alert-bar`} style={{marginTop: `${margin}`}} id="alertBar">
          <div className="alert-bar__content">
            <p className="alert-bar__content--p">{text}</p>
            <button
              className="alert-bar__content--button"
              onClick={removeAlert}
            >
              <i class="fas fa-bomb"></i>
            </button>
          </div>
        </div>
  )
}

export default Alert;
