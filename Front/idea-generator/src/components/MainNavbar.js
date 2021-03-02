import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../css/MainNavbar.css';

const MainNavbar = () => {
    return (
        <Navbar id="navbarContainer" expand="md">
        <Navbar.Brand id="navTitle">Idea Generator</Navbar.Brand>
        <Navbar.Toggle id="navToggle" />
        <Navbar.Collapse id="navItems">
            <Nav>
                <Nav.Link as={Link} to='/' id="navLink" >Home</Nav.Link>
                <Nav.Link as={Link} to='/submitideas' id="navLink" >Submit Ideas</Nav.Link>
                <Nav.Link as={Link} to='/about' id="navLink" >About</Nav.Link>
                <Nav.Link as={Link} to='/manageideas' id="navLink" >Manage</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
} 

export default MainNavbar;