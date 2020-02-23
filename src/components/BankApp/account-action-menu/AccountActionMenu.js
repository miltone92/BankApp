import React from "react";
//components
import ContentContainer from "../../main-content/content-container/ContentContainer"
import FilledButton from "../../buttons/Button/Button"


export const AccountActionMenu = (props) =>{


    

        
    return(
        <ContentContainer className={"simple-container center-children"} >
            {props.redirects.map(redirect => (
                props.view === redirect.value
                ? <FilledButton className={"nav-button nav-button--active"} callback={() => props.callback(redirect.value)}>{redirect.title}</FilledButton>
                : <FilledButton className={"nav-button"} callback={() => props.callback(redirect.value)}>{redirect.title}</FilledButton>
            ))}
        </ContentContainer>
    )
}

export default AccountActionMenu;