import React, { useEffect, useState } from 'react';
import '../css/MyButtons.css';
import { FaJoomla } from "react-icons/fa";
import { AiOutlinePlusSquare } from "react-icons/ai";
import CreateButton from '../components/MyButtonsComponents/CreateButton';
import MyButtonsSidebar from '../components/MyButtonsComponents/MyButtonsSidebar';
import { Container } from 'react-bootstrap';
import { GenerateButton, ResetButton } from '../components/AppButton';

const MyButtons = () => {
    const [createButton, setCreateButton] = useState(false);
    const [myButtons, setMyButtons] = useState(false);
    const [loading, setLoading] = useState(false);
    const [buttonData, setButtonData] = useState({
        name: '',
        color: 'red'
    });
    const [content, setContent] = useState([]);
    const [currentContent, setCurrentContent] = useState('');
    const [listData, setListData] = useState({
        position: -1,
        length: content.length ?? 0
    });

    useEffect(() => {
        const theContent = (listData.position === -1 || listData.position >= listData.length) 
        ? "" : content[listData.position].idea;
        setCurrentContent(theContent);
    }, listData.listPosition);

    const setResult = () => {
        if (listData.position < listData.length) {
            setListData({...listData, position: listData.position + 1});
        }
    }

    return (
        <div id="MyButtonsPage">
            <div className="sidebar">
                <div className="sidebar-item" onClick={() => {
                        setCreateButton(!createButton);
                        setMyButtons(false);
                    }}>
                    {/* <AiOutlinePlusSquare /> */}
                    Create Button
                </div>
                <div className="sidebar-item" onClick={() => {
                        setMyButtons(!myButtons);
                        setCreateButton(false);
                    }}>
                    {/* <FaJoomla /> */}
                    My Buttons
                </div>
                {myButtons && <MyButtonsSidebar setButtonData={setButtonData} setContent={setContent} setListData={setListData}/> }
            </div>

            {createButton && <div className="content">
                <CreateButton />
            </div> }
            {myButtons && <div className="content">
                <Container align="center" id="myButtonContainer">
                    {buttonData.name === ''  && <h1 >Select a button</h1>}
                    {buttonData.name !== '' && 
                    <>
                        <GenerateButton title={buttonData.name} onClickFunction={() => setResult()}
                        loading={loading} listData={listData} setListData={setListData} />
                        <h5 id="currentContent">{currentContent}</h5> 
                        {content.length < 1 && <h5>This button has no content added. Press edit to add content.</h5>}
                    </>}
                </Container>
            </div>}
        </div>
    );
}

export default MyButtons;