import React from "react";
//components
import ContentContainer from "../../main-content/content-container/ContentContainer"
import FilledButton from "../../buttons/filledButton/FilledButton"


export const AccountActionMenu = (props) =>{


    

        
    return(
        <ContentContainer className={"simple-container center-children"} >
            {props.redirects.map(redirect => (
                <FilledButton style={{margin: "5px", width: "auto", borderRadius: "4px"}} callback={() => props.callback(redirect.value)}>{redirect.title}</FilledButton>
            ))}
        </ContentContainer>
    )
}

export default AccountActionMenu;