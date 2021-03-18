import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [userData, setUserData] = useState(undefined);
    const [loggedIn, setLoggedIn] = useState(undefined);
    

    const getLoggedIn = async () => {
        const isLoggedIn = await axios.get('/auth/loggedin');
        setLoggedIn(isLoggedIn.data);
        console.log(isLoggedIn.data);

        const userDataResponse = await axios.get('/auth/user');
        setUserData(userDataResponse.data)
        console.log(userDataResponse.data);
    }

    useEffect(() => {
        getLoggedIn();
    }, []);

    return <AuthContext.Provider value={{loggedIn, getLoggedIn, userData}}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
export {AuthContextProvider};