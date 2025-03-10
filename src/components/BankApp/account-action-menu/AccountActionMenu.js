import React from "react";
//components
import ContentContainer from "../../main-content/content-container/ContentContainer"
import FilledButton from "../../buttons/Button/Button"


export const AccountActionMenu = (props) =>{


    

        
    return(
       
        <ContentContainer className={"simple-container center-children overflow-y"} >
            {props.redirects.map((redirect, i) => (
                props.view === redirect.value
                ? <FilledButton key={`redirect-${i}`} className={"nav-button nav-button--active"} callback={() => props.callback(redirect.value)}>{redirect.title}</FilledButton>
                : <FilledButton key={`redirect-${i}`} className={"nav-button"} callback={() => props.callback(redirect.value)}>{redirect.title}</FilledButton>
            ))}
        </ContentContainer>
       
    )
}

export default AccountActionMenu;