import React, { useState } from 'react';
import '../css/MyButtons.css';
import { FaJoomla } from "react-icons/fa";
import { AiOutlinePlusSquare } from "react-icons/ai";
import CreateButton from '../components/MyButtonsComponents/CreateButton';

const MyButtons = () => {
    const [createButton, setCreateButton] = useState(false);

    return (
        <div id="MyButtonsPage">
            <div className="sidebar">
                <div className="sidebar-item" onClick={() => setCreateButton(!createButton)}><AiOutlinePlusSquare />Create Button</div>
                <div className="sidebar-item"><FaJoomla />My Buttons</div>
            </div>
            {createButton && <div className="content">
                <CreateButton />
            </div> }
        </div>
    );
}

export default MyButtons;