import React, { useEffect, useState } from 'react';
import '../css/AppButton.css';
import { VscArrowLeft, VscCheck } from "react-icons/vsc";
import { saveContent } from '../logic/DbLogic';

// Button that is currently being used on Landing, and MyButtons page for generation of ideas.
export const GenerateButton = ({title, onClickFunction, loading=false, listData, setListData, currentVisible}) => {
    return (
        <button id="generateButton" 
            disabled={loading}
            onClick={onClickFunction}>
            {loading && <span className="buttonTitle">Loading</span>}
            {!loading && <span className="buttonTitle">{title}</span>}
            {listData.position > 0 && currentVisible && <BackButton listData={listData} setListData={setListData} /> }
        </button>
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

// Save Button that allows users to save Ideas from the landing page.
export const SaveButton = ({userId = null, contentId}) => {
    const [title, setTitle] = useState('Save');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setTitle('Save');
        setErrorMessage('');
    }, [contentId]);
    
    return ( <>
        <p>
            <button
            disabled={title === 'Saving' || title === ''}
            onClick={() => {
                console.log(userId);
                if (userId !== null) saveContent(setTitle, setErrorMessage, userId, contentId);
                else setErrorMessage('Login or create an account to save ideas')
            }}
            id="saveIdeaButton">
            {title}
            {title === '' && (
                <VscCheck size='1.5em' />
        )}
        </button>
        </p>
        <p id="savingError">
            {errorMessage}
        </p> </>
    );
}