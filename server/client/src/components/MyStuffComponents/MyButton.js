import React, {useState, useEffect} from 'react'

import { GenerateButton } from '../../components/AppButton';
import ContentList from '../MyStuffComponents/ContentList';
import '../../css/MyButton.css'
import { Container } from 'react-bootstrap';

const MyButton = ({buttonData, setButtonSelected}) => {
    const title = buttonData.buttonName;
    const content = buttonData.contentArray;

    // The individual content currently displaying from content list
    const [currentContent, setCurrentContent] = useState('');

    // Keeps track of if the current Content should be visible or not.
    const [currentVisible, setCurrentVisible] = useState(true);

    // UseState that helps skeeps track of what content is being displayed
    const [listData, setListData] = useState({ position: -1, length: content.length ?? 0 });

    // Keeps trach when the buttons entire content should be displayed or not
    const [viewAll, setViewAll] = useState(false);

    const setAllContent = () => {
        setViewAll(!viewAll);
        setCurrentVisible(false);
    }

    useEffect(() => {
        const theContent = (listData.position === -1 || listData.position >= listData.length) 
        ? "" : content[listData.position].idea;
        setCurrentContent(theContent);
    }, listData.listPosition);

    const setResult = () => {
        if (listData.position < listData.length) 
            setListData({...listData, position: listData.position + 1});
        
        setViewAll(false);
        setCurrentVisible(true);
    }

    const startEditing = () => {
        console.log(buttonData._id);
    }

    return (
        <Container>
            <button id="returnButton" onClick={() => setButtonSelected(false)}>Back to Buttons</button>
            <Container align="center">
                <GenerateButton 
                title={title} 
                onClickFunction={() => setResult()}
                listData={listData} 
                setListData={setListData}
                currentVisible={currentVisible} />
                <p>
                <button onClick={() => startEditing()} id="editButton">
                    Edit
                </button>
                <button onClick={() => setAllContent()} id="viewAllButton">
                    {viewAll ? "Close": "View"} All Content
                </button>
                </p>
                {listData.position > -1 && currentVisible && <div className="result">
                    <h5 id="currentContent">{currentContent}</h5>
                </div>}
                {content.length < 1 && <h5>This button has no content added. Press edit to add content.</h5>}
                {viewAll && <ContentList content={content} />}
            </Container>
        </Container>
    );
}

export default MyButton;