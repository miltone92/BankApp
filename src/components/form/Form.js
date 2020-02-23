import React, {useState, useEffect} from 'react'

//Hooks
import {useForm} from 'react-hook-form'
//Custom libs
import benri from "../../libs/benri"
//Components
import TextInputBorder from "../inputs/TextInputBorder";

/********************
 * Component
 * 
********************/
export const Form = (props) =>{

    //Props
    const { title, inputs, callback } = props;
    //Hook Forms`
    const { register, handleSubmit, watch, errors } = useForm();
    
    let onSubmit = (data) =>{
        console.log(data)
        callback(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{fontSize : "16px"}}>{title}</h2>

            <div className="flex-col">
                {inputs.map((input) => (
                    <TextInputBorder 
                        style={{maxWidth: "200px", borderTop: "none", borderRight: "none", borderLeft: "none", borderWidth: "1px"}}
                        placeholder={input.placeholder} 
                        name={input.name}
                        defaultValue="" 
                        refInput={register}
                        >
                    </TextInputBorder>
                ))}
                <input className={"filled-button"} style={{width: "auto", borderRadius: "4px", minWidth: "100px", maxWidth: "200px"}} type="submit" />
            </div>
        </form>
    )
}

export default Form;
