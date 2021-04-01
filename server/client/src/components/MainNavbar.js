import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';
import '../css/MainNavbar.css';

const MainNavbar = () => {
    const history = useHistory();
    const { loggedIn } = useContext(AuthContext);

    const navbarLinks = document.getElementsByClassName('navbar-links')[0];
    const navbar = document.getElementsByClassName('navbar')[0];

    const toggleMenu = () => {
        navbarLinks.classList.toggle('active');
        navbar.classList.toggle('active');
    }

    const account = () => {
        if (loggedIn) history.push('/manageaccount');
        else history.push('/login');
    }

    return (
        <nav class="navbar">
            <div class="brand-title">Idea Generator</div>
            <a href="#" className="toggle-button" onClick={() => toggleMenu()}>
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </a>
            <div className="navbar-links">
                <ul>
                    <li><Link to='/'>Ideas</Link></li>
                    {loggedIn && <li><Link to='/mybuttons'>My Buttons</Link></li>}
                    <li><Link to='/submitideas'>Submit Ideas</Link></li>
                    {loggedIn && <li><Link to='/manageideas'>Manage</Link></li>}
                </ul>
            </div>
            <div className="navbar-button" onClick={() => account()}>
                {loggedIn ? 'Account' : 'Login'}
            </div>
        </nav>
    )
} 

export default MainNavbar;