import React from 'react'
import { Container } from 'react-bootstrap';
import '../css/MyButtons.css';
import { FaJoomla } from "react-icons/fa";
import { AiOutlinePlusSquare } from "react-icons/ai";

const MyButtons = () => {
    return (
        <>
        <div className="sidebar">
            <div className="sidebar-item"><AiOutlinePlusSquare />Create Button</div>
            <div className="sidebar-item"><FaJoomla />My Buttons</div>
        </div>
        <div className="content">
            <Container>

            </Container>
        </div>
        </>
    )
}

export default MyButtons;
