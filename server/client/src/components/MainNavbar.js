import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';
import '../css/MainNavbar.css';

const MainNavbar = ({logo = true}) => {
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
        <nav className={!logo ? "navbar nav-sidebar" : "navbar"}>
            {logo && <div className="brand-title">Idea Generator</div>}
            <a href="#" className="toggle-button" onClick={() => toggleMenu()}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </a>
            <div className={!logo ? "navbar-links links-sidebar" : "navbar-links"}>
                <ul>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/'>Ideas</Link></li>
                    {loggedIn && <li><Link to='/mystuff'>My Stuff</Link></li>}
                    <li><Link to='/submitideas'>Submit Ideas</Link></li>
                    {/* {loggedIn && <li><Link to='/manageideas'>Manage</Link></li>} */}
                </ul>
            </div>
            <div className="navbar-button" onClick={() => account()}>
                {loggedIn ? 'Account' : 'Login'}
            </div>
        </nav>
    )
} 

export default MainNavbar;