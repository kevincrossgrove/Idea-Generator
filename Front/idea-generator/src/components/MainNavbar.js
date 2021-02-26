import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import '../css/MainNavbar.css';

const MainNavbar = ({buttonSetter, categorySetter}) => {
    const updateButton = (title) => buttonSetter(title);
    const updateCategory = (category) => categorySetter(category);

    const onClickFunction = (buttonTitle, category) => {
        updateButton(buttonTitle);
        updateCategory(category);
    }

    return (
        <Navbar id="navbarContainer" expand="md">
        <Navbar.Brand id="navTitle">Idea Generator</Navbar.Brand>
        <Navbar.Toggle id="navToggle" />
        <Navbar.Collapse id="navItems">
            {/* className="mr-auto" */}
            <Nav>
                <Nav.Link id="navLink" onClick={() => onClickFunction('Ideas', 0)}>Ideas</Nav.Link>
                <Nav.Link id="navLink" onClick={() => onClickFunction('Motivation', 1)}>Motivation</Nav.Link>
                <Nav.Link id="navLink" onClick={() => onClickFunction('Pog', 2)}>Pog</Nav.Link>
                <Nav.Link id="navLink" onClick={() => onClickFunction('Saved', 3)}>Saved</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
} 

export default MainNavbar;