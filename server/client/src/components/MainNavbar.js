import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';
import '../css/MainNavbar.css';

const MainNavbar = ({logo = true}) => {
    const history = useHistory();
    const { loggedIn, userData } = useContext(AuthContext);
    const [toggle, setToggle] = useState(true);

    const linksInactive = { borderTop: 'none' }
    const linksActive = {
        margin: 0,
        display: 'flex',
        borderTop: '2px solid rgba(255, 255, 255, 0.507)'
    }

    const navbarInactive = { borderBottom: 'none' }
    const navbarActive = { borderBottom: '2px solid rgba(255, 255, 255, 0.507)' }

    const account = () => {
        if (loggedIn) history.push('/mystuff');
        else history.push('/login');
    }

    const checkSize = () => {
        const win = window.matchMedia('(max-width: 700px)')
        if(!win.matches && toggle === false) {
            setToggle(true);
            window.removeEventListener('resize', checkSize);
        } 
    }

    window.addEventListener('resize', checkSize);

    return (
        <nav className={!logo ? "navbar nav-sidebar" : "navbar"}
        style={toggle ? navbarInactive : navbarActive} >
            {logo && <div className="brand-title">Idea Generator</div>}
            <div className="toggle-button" onClick={() => setToggle(!toggle)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <div className={!logo ? "navbar-links links-sidebar" : "navbar-links"} 
            style={toggle ? linksInactive : linksActive}>
                <ul>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/ideas'>Ideas</Link></li>
                    {loggedIn && <li><Link to='/mystuff'>My Stuff</Link></li>}
                    <li><Link to='/submitideas'>Submit Ideas</Link></li>
                    {loggedIn && userData?.admin === true && <li><Link to='/manageideas'>Manage</Link></li>}
                </ul>
            </div>
            <div className="navbar-button disable-highlight" onClick={() => account()}>
                {loggedIn ? 'My Stuff' : 'Login'}
            </div>
        </nav>
    )
} 

export default MainNavbar;