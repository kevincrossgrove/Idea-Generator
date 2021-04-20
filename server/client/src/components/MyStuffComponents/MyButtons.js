import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import { loadButtons } from '../../logic/MyStuffLogic';
import MyButton from './MyButton';

const MyButtons = ({ setStartingPage, setSavedContent, setCreateButton, setMyButtons}) => {
    // All of this user's buttons
    const [data, setData] = useState([]);
    const [buttonSelected, setButtonSelected] = useState(false);
    const [buttonData, setButtonData] = useState({id: undefined, name: ''});
    const [empty, setEmpty] = useState(false);

    // Load the buttons on first render
    useEffect(() => {
        loadButtons(setData, setEmpty);
        const timeout = setTimeout(() => console.log('Loading'), 500);
        return () => clearTimeout(timeout);
    }, []);

    // Function for loading a button when it is clicked on.
    const loadButton = (i) => {
        setButtonData(data[i]);
        setButtonSelected(true);
    }

    return (
        <>
        {!buttonSelected &&
        <Container align="center" id="myButtonsContainer">
            <h1>Select a button</h1>
            <div className="previewContainer">
                {data.map((button, index) => {
                    return (
                        <div key={button._id} onClick={() => loadButton(index)}>
                            <button className="previewButton">{button.buttonName}</button>
                        </div>
                    );
                })}
            </div>
            {empty &&
            <div id="emptyMessage">
                <p>You have not created any Buttons</p>
                <p>Visit our Create Button page to begin creating Buttons</p>
                <button id="goToIdeasButton" onClick={() => {
                    setStartingPage(false);
                    setSavedContent(false);
                    setCreateButton(true); 
                    setMyButtons(false);
                }}>Go to Create Button</button>
            </div>}
        </Container>
        }
        {buttonSelected &&
            <MyButton buttonData={buttonData} setButtonData={setButtonData} setButtonSelected={setButtonSelected} />
        }
        </>
    );
}

export default MyButtons;