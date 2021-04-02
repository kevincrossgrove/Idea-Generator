import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import { loadButtons } from '../../logic/MyStuffLogic';
import MyButton from './MyButton';

const MyButtons = () => {
    // All of this user's buttons
    const [data, setData] = useState([]);
    const [buttonSelected, setButtonSelected] = useState(false);
    const [buttonData, setButtonData] = useState({id: undefined, name: '', color: 'red'});

    // Load the buttons on first render
    useEffect(() => {
        loadButtons(setData);
        const timeout = setTimeout(() => console.log('Loading'), 500);
        return () => clearTimeout(timeout);
    }, []);

    // Function for loading a button when it is clicked on.
    const loadButton = (i) => {
        setButtonData(data[i]);
        setButtonSelected(true);
    }

    return (
        <div className="content">
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
            </Container>}
            {buttonSelected &&
                <MyButton buttonData={buttonData} setButtonSelected={setButtonSelected} />
            }
        </div>
    );
}

export default MyButtons;