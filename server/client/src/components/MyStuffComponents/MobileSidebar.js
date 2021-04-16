import React from 'react'
import { AiFillPlusCircle, AiFillCrown, AiFillSave, AiFillHome } from "react-icons/ai";

import '../../css/MobileSidebar.css';

const MobileSidebar = ({setStartingPage, setSavedContent, setCreateButton, setMyButtons}) => {
    return (
        <div className="sidebar-mobile">
            <div 
            className="mobile-item" title="Home"
            onClick={() => {
                setStartingPage(true);
                setSavedContent(false);
                setCreateButton(false);
                setMyButtons(false);
            }}>
                <AiFillHome />
            </div>
            <div 
            className="mobile-item" title="Saved Content"
            onClick={() => {
                setStartingPage(false);
                setSavedContent(true);
                setCreateButton(false);
                setMyButtons(false);
            }}>
                <AiFillSave />
            </div>
            <div 
            className="mobile-item" title="Create Button"
            onClick={() => {
                setStartingPage(false);
                setSavedContent(false);
                setCreateButton(true);
                setMyButtons(false);
            }}>
                <AiFillPlusCircle />
            </div>
            <div 
            className="mobile-item" title="My Buttons"
            onClick={() => {
                setStartingPage(false);
                setSavedContent(false);
                setCreateButton(false);
                setMyButtons(true);
            }}>
                <AiFillCrown />
            </div>
        </div>
    );
}

export default MobileSidebar;
