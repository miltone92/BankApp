import React, { useState, useEffect } from "react";
//style
import "./AlertBox.scss"

//Components
import ContentContainer from "../../main-content/content-container/ContentContainer";
import Button from "../../buttons/Button/Button";

export const AlertBox = (props) =>{

const { callback, title, message, buttonLabel, type } = props;

  let getAlertIcon = () =>{

    switch(true){
      case type === "success":
        return <i class="far fa-check-circle"></i>
      case type === "error":
        return <i class="fas fa-exclamation-circle"></i>
      default:
        break;

    }
  }  

  return (
        <ContentContainer className="simple-container">
            <h1 className={`alert-box-${type}`}>{title}{" "}
              {
                getAlertIcon()
              }
            </h1>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p>{message}</p>
                <Button callback={() => callback()} style={{borderRadius: "10px"}}>{buttonLabel}</Button>
            </div>
        </ContentContainer>
  )
}

export default AlertBox;
