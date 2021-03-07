import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';
import AuthContext from './context/AuthContextProvider';

// Page imports
import Landing from './pages/Landing';
import About from './pages/About';
import ManageIdeas from './pages/ManageIdeas';
import SubmitIdeas from './pages/SubmitIdeas';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ManageAccount from './pages/auth/ManageAccount';


const MainRouter = () => {
    const { loggedIn } = useContext(AuthContext);

    return (
        <Router>
            <MainNavbar/>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/SubmitIdeas" component={SubmitIdeas}/>
                <Route path="/About" component={About}/>
                <Route path="/ManageIdeas" component={ManageIdeas}/>
                {loggedIn === false && <Route path="/Register" component={Register} />}
                {loggedIn === false && <Route path="/Login" component={Login} />}
                {loggedIn && <Route path="/ManageAccount" component={ManageAccount} />}
            </Switch>
        </Router>
    );
}

export default MainRouter;
