import React, { useEffect, useState } from 'react';
import '../css/AppButton.css';
import { VscArrowLeft, VscCheck } from "react-icons/vsc";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { saveContent } from '../logic/DbLogic';

// Button that is currently being used on Landing, and MyButtons page for generation of ideas.
export const GenerateButton = ({title, onClickFunction, loading=false, listData, setListData, currentVisible}) => {
    return (
        <div id="generateContainer">
            <button id="generateButton" 
                disabled={loading}
                onClick={onClickFunction}>
                {loading && <span className="disable-highlight">Loading</span>}
                {!loading && <span className="disable-highlight">{title}</span>}
            </button>
            {listData.position > 0 && currentVisible && <BackButton listData={listData} setListData={setListData} /> }
        </div>
    );  
}

// Go back to the previous idea within the category list.
export const BackButton = ({listData, setListData }) => {
    const goBack = (event) => {
        event.stopPropagation();
        setListData({...listData, position: listData.position-1});
    }

    return (
        <span id="backButton" >
            <VscArrowLeft style={{ color: 'black', cursor: 'pointer'}}
            size='2em'
            onClick={(event) => goBack(event)}/>
        </span>
    );
}

// Go back to the beggining of the current categories list.
export const ResetButton = ({setReset, listData, setListData}) => {
    const startOver = () => {
        setReset(false);
        setListData({...listData, position: -1});
    }

    return (
        <button 
        onClick={() => startOver()}
        id="resetButton">
        Start Over
        </button>
    );
}

// Copy Button that allows user to copy idea to clipboard.
export const CopyButton = ({currentContent, setMessage}) => {
    return (
        <button id="copyIdeaButton" className="disable-highlight" onClick={() => {
            navigator.clipboard.writeText(currentContent.idea)
            setMessage('Successfully copied to clipboard!')
            setTimeout(() => setMessage(''), 2000);
            }}>
            Copy
        </button>
    );
}

// Save Button that allows users to save Ideas.
export const SaveButton = ({userId = null, contentId, setErrorMessage}) => {
    const [title, setTitle] = useState('Save');

    useEffect(() => {
        setTitle('Save');
        setErrorMessage('');
    }, [contentId]);
    
    return ( <>
        <button
        disabled={title === 'Saving' || title === ''}
        onClick={() => {
            console.log(userId);
            if (userId !== null) saveContent(setTitle, setErrorMessage, userId, contentId);
            else setErrorMessage('Login or create an account to save ideas')
        }}
        id="saveIdeaButton"
        className="disable-highlight">
        {title}
        {title === '' && (
            <VscCheck size='1.5em' />
        )}
        </button>
     </>
    );
}

// Back button that has arrow and text
export const ArrowBackButton = ({ title, onClick }) =>
    <button className="arrowBackButton disable-highlight" onClick={() => onClick()}>
        <HiOutlineArrowLeft className="arrow" />
        {title}
    </button>
