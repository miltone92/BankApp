import React, {useState, useEffect} from "react";

import axios from "axios";

//API
import usersDB from "../../api/users";


//Components
import SectionHeader from "../../components/main-content/header-text/HeaderText";


export const UserList = () =>{

    let getUserData = async () =>{
        let response = await usersDB.get();
        response = response.data;
        console.log(response)
    }

    useEffect(() =>{

        console.log("works...")
        getUserData();
    }, [])

    return (<div>
        <h1>User List</h1>
    </div>)
}

export default UserList;