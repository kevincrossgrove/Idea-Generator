import React from 'react';
import '../css/AppButton.css';
import { VscArrowLeft } from "react-icons/vsc";

export const GenerateButton = ({title, onClickFunction, loading}) => {
    return (
        <button id="generateButton" 
            disabled={loading}
            onClick={onClickFunction}>
            {loading && <span>Loading</span>}
            {!loading && <span>{title}</span>}
        </button>
    );  
}

// Go back to the previous idea within the category list.
export const BackButton = ({listData, setListData}) => {
    const goBack = () => {
        setListData({...listData, position: listData.position-1});
    }

    return (
        <VscArrowLeft style={{ color: 'black', cursor: 'pointer'}}
        size='2em'
        onClick={() => goBack()}/>
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