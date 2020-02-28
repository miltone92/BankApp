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
    const { title, inputs, callback, buttonTitle, selects} = props;
    //Hook Forms`
    const { register, handleSubmit, watch, errors } = useForm();
    
    let onSubmit = (data) =>{
        callback(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{fontSize : "16px"}}>{title}</h2>
            <div className="flex-col">
                {inputs !== undefined && inputs.map((input) => (
                    <TextInputBorder 
                        style={{maxWidth: "200px", borderTop: "none", borderRight: "none", borderLeft: "none", borderWidth: "1px"}}
                        placeholder={input.placeholder} 
                        name={input.name}
                        defaultValue="" 
                        refInput={register}
                        >
                    </TextInputBorder>
                ))}
                    {selects !== undefined && selects.map((select) => (
                        <select 
                            style={{maxWidth: "200px"}}
                            className="input-gray"
                            name={select.name}
                            ref={register}
                        >
                            {
                            select.options.map((option) => (
                                <option value={option}>{option}</option>
                            ))}

                        </select>
                    ))}
                <br/>
                <button className={"filled-button"} style={{width: "auto", borderRadius: "4px", minWidth: "100px", maxWidth: "200px"}} type="submit">
                    {buttonTitle === undefined 
                        ? "Submit"
                        : buttonTitle}
                </button>
            </div>
        </form>
    )
}

export default Form;
