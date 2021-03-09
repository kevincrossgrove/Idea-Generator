import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';
import '../css/MainNavbar.css';

const MainNavbar = () => {

    const { loggedIn } = useContext(AuthContext);

    return (
        <Navbar id="navbarContainer" expand="md">
        <Navbar.Brand id="navTitle">Idea Generator</Navbar.Brand>
        <Navbar.Toggle id="navToggle" />
        <Navbar.Collapse id="navItems">
            <Nav>
                <Nav.Link as={Link} to='/' id="navLink" >Home</Nav.Link>
                {loggedIn && <Nav.Link as={Link} to='/mybuttons' id="navLink" >My Buttons</Nav.Link>}
                <Nav.Link as={Link} to='/submitideas' id="navLink" >Submit Ideas</Nav.Link>
                <Nav.Link as={Link} to='/about' id="navLink" >About</Nav.Link>
                {loggedIn && <Nav.Link as={Link} to='/manageideas' id="navLink" >Manage</Nav.Link>}
                {loggedIn === false && <Nav.Link as={Link} to='/register' id="navLink" >Sign Up</Nav.Link>}
                {loggedIn === false && <Nav.Link as={Link} to='/login' id="navLink" >Sign In</Nav.Link>}
                {loggedIn && <Nav.Link as={Link} to='/manageaccount' id="navLink" >Account</Nav.Link>}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
} 

export default MainNavbar;