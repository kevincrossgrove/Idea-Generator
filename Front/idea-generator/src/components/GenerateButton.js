import React from 'react'
import '../css/GenerateButton.css';

const GenerateButton = ({title, onClickFunction, textColor='#fff'}) => {
    return (
        <button id="generateButton" 
        style={{color: textColor}}
        onClick={onClickFunction}>
        {title}
        </button>
    );  
}

export default GenerateButton;