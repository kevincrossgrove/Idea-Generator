import React from 'react'
import '../../css/MyButton.css'

const MyButton = ({title, color}) => {
    return (
        <button id="myButton" style={{color: {color}}}>
            {title}
        </button>
    );
}

export default MyButton;