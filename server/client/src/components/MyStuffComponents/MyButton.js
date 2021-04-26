import React, {useState, useEffect} from 'react'

import { ArrowBackButton, BackButton, GenerateButton, ResetButton } from '../../components/AppButton';
import ContentList from '../MyStuffComponents/ContentList';
import '../../css/MyButton.css'
import { Container, Row } from 'react-bootstrap';
import CreateButton from './CreateButton';

const MyButton = ({buttonData, setButtonData, setButtonSelected}) => {
    const title = buttonData.buttonName;
    const content = buttonData.contentArray;

    const [editing, setEditing] = useState(false);
    const [reset, setReset] = useState(false);

    // The individual content currently displaying from content list
    const [currentContent, setCurrentContent] = useState('');

    // Keeps track of if the current Content should be visible or not.
    const [currentVisible, setCurrentVisible] = useState(true);

    // UseState that helps keep track of what content is being displayed
    const [listData, setListData] = useState({ position: -1, length: content.length ?? 0 });

    // Keeps trach when the buttons entire content should be displayed or not
    const [viewAll, setViewAll] = useState(false);

    const setAllContent = () => {
        setViewAll(!viewAll);
        setCurrentVisible(!currentVisible);
    }

    useEffect(() => {
        const theContent = (listData.position === -1 || listData.position >= listData.length) 
        ? "" : content[listData.position].idea;
        setCurrentContent(theContent);
        setReset(listData.position >= listData.length);
    }, [listData, content]);

    const setResult = () => {
        if (listData.position < listData.length) 
            setListData({...listData, position: listData.position + 1});
        
        setViewAll(false);
        setCurrentVisible(true);
    }

    return (
        <>
        {editing ? <CreateButton 
                    isEditing={true}
                    buttonData={buttonData}
                    setButtonData={setButtonData}
                    listData={listData}
                    setListData={setListData}
                    setEditing= {setEditing} /> :
        <Container>
            <ArrowBackButton title="Back to Buttons" onClick={() => setButtonSelected(false)} />
            <Container align="center">
                <GenerateButton 
                title={title} 
                onClickFunction={() => setResult()}
                listData={listData} 
                setListData={setListData}
                currentVisible={currentVisible} />
                <p>
                <div className="otherButtonsContainer">
                    <button onClick={() => setEditing(true)} id="editButton" className="disable-highlight">
                        Edit
                    </button>
                    <button onClick={() => setAllContent()} id="viewAllButton" className="disable-highlight">
                        {viewAll ? "Close": "View"} All Content
                    </button>
                </div>
                </p>
                <Row>
                    {listData.position > -1 && listData.position < listData.length && !viewAll && <div className="result disable-highlight">
                        {currentContent}
                    </div>}
                </Row>
                {reset && !viewAll && <ResetButton setReset={setReset} listData={listData} setListData={setListData}/> }
                {content.length < 1 && <h5>This button has no content added. Press edit to add content.</h5>}
                {viewAll && <ContentList content={content} />}
            </Container>
        </Container>}
        </>
    );
}

export default MyButton;