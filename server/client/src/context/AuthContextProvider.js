import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [userData, setUserData] = useState(undefined);
    const [loggedIn, setLoggedIn] = useState(undefined);
    
    // Determine if the user is logged in, if they are acquire their data.
    const getLoggedIn = async () => {
        const isLoggedIn = await axios.get('/auth/loggedin');
        setLoggedIn(isLoggedIn.data);

        const userDataResponse = await axios.get('/auth/user');
        setUserData(userDataResponse.data);
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