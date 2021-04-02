import React, { useEffect, useState } from 'react';
import '../css/MyStuff.css';
import { AiFillPlusCircle, AiFillCrown, AiFillSave } from "react-icons/ai";
import CreateButton from '../components/MyStuffComponents/CreateButton';
import { IconContext } from 'react-icons/lib';
import SavedContent from '../components/MyStuffComponents/SavedContent';
import MyButtons from '../components/MyStuffComponents/MyButtons';

const MyStuff = () => {
    // Keep track of when the main components should be open / closed
    const [createButton, setCreateButton] = useState(false);
    const [myButtons, setMyButtons] = useState(false);
    const [savedContent, setSavedContent] = useState(false);

    const startEditing = () => {

    }

    return (
        <IconContext.Provider
        value={{
            style: { marginBottom: 3, marginLeft: 8 },
            size: 25,
            className: "sideIcon"
          }}>
        <div id="MyButtonsPage">
            <div className="sidebar">
                <div className="sidebar-item" onClick={() => {
                    setSavedContent(true);
                    setCreateButton(false); 
                    setMyButtons(false);
                }}>
                    Saved Content
                    <AiFillSave />
                </div>
                <div className="sidebar-item" onClick={() => {
                    setSavedContent(false);
                    setCreateButton(true); 
                    setMyButtons(false);
                }}>
                    Create Button
                    <AiFillPlusCircle />
                </div>
                <div className="sidebar-item" onClick={() => {
                    setSavedContent(false);
                    setCreateButton(false); 
                    setMyButtons(true);
                }}>
                    My Buttons
                    <AiFillCrown />
                </div>
            </div>

            {/* The components that will show when sidebar option is selected */}
            {savedContent && <SavedContent /> }
            {createButton && <CreateButton /> }
            {myButtons && <MyButtons /> }       
        </div>
        </IconContext.Provider>
    );
}

export default MyStuff;