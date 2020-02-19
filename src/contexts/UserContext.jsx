import React, {createContext, useState, useEffect} from 'react';

const UserContext = createContext([{}, ()=> {}]);

const UserProvider = (props) =>{
    const [user, setUser] = useState({
        user: null
    });

  
    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}


export  { UserContext, UserProvider};
