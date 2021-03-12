import React, { useState } from 'react';
import '../css/MyButtons.css';
import { FaJoomla } from "react-icons/fa";
import { AiOutlinePlusSquare } from "react-icons/ai";
import CreateButton from '../components/MyButtonsComponents/CreateButton';
import MyButtonsSidebar from '../components/MyButtonsComponents/MyButtonsSidebar';

const MyButtons = () => {
    const [createButton, setCreateButton] = useState(false);
    const [myButtons, setMyButtons] = useState(false);
    const [buttonData, setButtonData] = useState({
        name: '',
        color: 'red'
    });
    const [content, setContent] = useState([]);
    const [currentContent, setCurrentContent] = useState('');

    const setResult = () => {
        setCurrentContent(content[0].idea);
    }

    return (
        <div id="MyButtonsPage">
            <div className="sidebar">
                <div className="sidebar-item" onClick={() => setCreateButton(!createButton)}>
                    <AiOutlinePlusSquare />
                    Create Button
                </div>
                <div className="sidebar-item" onClick={() => setMyButtons(!myButtons)}>
                    <FaJoomla />
                    My Buttons
                </div>
                {myButtons && <MyButtonsSidebar setButtonData={setButtonData} setContent={setContent}/> }
            </div>

            {createButton && <div className="content">
                <CreateButton />
            </div> }
            {myButtons && <div className="content">
                <button id="myButton" onClick={() => setResult()}>{buttonData.name}</button>
                <h5>{currentContent}</h5>
            </div>}
        </div>
    );
}

export default MyButtons;