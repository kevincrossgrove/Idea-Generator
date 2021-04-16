import React, { useState } from 'react';
import '../css/MyStuff.css';
import { AiFillPlusCircle, AiFillCrown, AiFillSave, AiFillHome } from "react-icons/ai";
import MyStuffLanding from '../components/MyStuffComponents/MyStuffLanding';
import CreateButton from '../components/MyStuffComponents/CreateButton';
import { IconContext } from 'react-icons/lib';
import SavedContent from '../components/MyStuffComponents/SavedContent';
import MyButtons from '../components/MyStuffComponents/MyButtons';


const MyStuff = () => {
    // Keep track of when the main components should be open / closed
    const [startingPage, setStartingPage] = useState(true);
    const [createButton, setCreateButton] = useState(false);
    const [myButtons, setMyButtons] = useState(false);
    const [savedContent, setSavedContent] = useState(false);

    return (
        <IconContext.Provider
        value={{
            style: { marginBottom: 3, marginLeft: 0, marginRight: 8 },
            size: 25,
            className: "sideIcon"
          }}>
        <div id="MyButtonsPage">
            <div className="sidebar">
                <div className="brand-title for-sidebar">Idea Generator</div>
                <div className="sidebar-item" onClick={() => {
                    setStartingPage(true);
                    setSavedContent(false);
                    setCreateButton(false); 
                    setMyButtons(false);
                }}>
                    <AiFillHome />
                    Home
                </div>
                <div className="sidebar-item" onClick={() => {
                    setStartingPage(false);
                    setSavedContent(true);
                    setCreateButton(false); 
                    setMyButtons(false);
                }}>
                    <AiFillSave />
                    Saved Content
                </div>
                <div className="sidebar-item" onClick={() => {
                    setStartingPage(false);
                    setSavedContent(false);
                    setCreateButton(true); 
                    setMyButtons(false);
                }}>
                    <AiFillPlusCircle />
                    Create Button
                </div>
                <div className="sidebar-item" onClick={() => {
                    setStartingPage(false);
                    setSavedContent(false);
                    setCreateButton(false); 
                    setMyButtons(true);
                }}>
                    <AiFillCrown />
                    My Buttons
                </div>
            </div>

            {/* The components that will show when sidebar option is selected */}
            {startingPage && <MyStuffLanding setStartingPage={setStartingPage} setSavedContent={setSavedContent} setCreateButton={setCreateButton} setMyButtons={setMyButtons} />}
            {savedContent && <SavedContent /> }
            {createButton && <CreateButton /> }
            {myButtons && <MyButtons /> }       
        </div>
        </IconContext.Provider>
    );
}

export default MyStuff;