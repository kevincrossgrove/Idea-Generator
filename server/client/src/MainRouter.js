import React, { useContext } from 'react'
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import AuthContext from './context/AuthContextProvider';

// Page imports
import Landing from './pages/Landing';
import About from './pages/About';
import ManageIdeas from './pages/ManageIdeas';
import SubmitIdeas from './pages/SubmitIdeas';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ManageAccount from './pages/auth/ManageAccount';
import MyStuff from './pages/MyStuff';
import MainNavbar from './components/MainNavbar';

const MainRouter = () => {
    const { loggedIn, userData } = useContext(AuthContext);
    let location = useLocation();

    return (
        <>
        {location.pathname !== '/mystuff' && <MainNavbar />}
        <Switch>
            <Redirect exact from="/" to="/About" />
            <Route path="/Ideas" component={Landing}/>
            {loggedIn && <Route path="/MyStuff" component={MyStuff}/>}
            <Route path="/SubmitIdeas" component={SubmitIdeas}/>
            <Route path="/About" component={About}/>
            {loggedIn && userData?.admin === true && <Route path="/ManageIdeas" component={ManageIdeas}/>}
            {loggedIn === false && <Route path="/Register" component={Register} />}
            {loggedIn === false && <Route path="/Login" component={Login} />}
            {loggedIn && <Route path="/ManageAccount" component={ManageAccount} />}
        </Switch>
        </>
    );
}

export default MainRouter;
