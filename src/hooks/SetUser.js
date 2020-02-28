import React, { useState, useContext, useEffect } from "react";
import { default as produce } from "immer";
import { UserContext } from "../contexts/UserContext";


export const SetUser = () => {
    const [state, setState] = useContext(UserContext);
  
    const setNewUser = newData => {

      setState(
        produce(state, draftState => {
          draftState.user = newData;
        })
      );
    };

    return {
        user: state.user,
        setNewUser: setNewUser
    }
}

export default SetUser;