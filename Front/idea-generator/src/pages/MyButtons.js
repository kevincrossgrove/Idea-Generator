import React, { useEffect, useState } from 'react';
import '../css/MyButtons.css';
import { AiFillPlusCircle, AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import CreateButton from '../components/MyButtonsComponents/CreateButton';
import MyButtonsSidebar from '../components/MyButtonsComponents/MyButtonsSidebar';
import { Container } from 'react-bootstrap';
import { GenerateButton, ResetButton } from '../components/AppButton';
import { IconContext } from 'react-icons/lib';

const MyButtons = () => {
    const [createButton, setCreateButton] = useState(false);
    const [myButtons, setMyButtons] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sideLoading, setSideLoading] = useState(false);
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
        <IconContext.Provider
        value={{
            style: { marginBottom: 3, marginLeft: 8 },
            size: 25,
            className: "sideIcon"
          }}>
        <div id="MyButtonsPage">
            <div className="sidebar">
                <div className="sidebar-item" onClick={() => {
                        setCreateButton(!createButton);
                        setMyButtons(false);
                    }}>
                    Create Button
                    <AiFillPlusCircle />
                </div>
                <div className="sidebar-item" onClick={() => {
                        setSideLoading(true);
                        setMyButtons(!myButtons);
                        setCreateButton(false);
                        setOpen(!open);
                    }}>
                    My Buttons
                    {open ? <AiFillCaretDown/> : <AiFillCaretRight/>}
                </div>
                {myButtons && <MyButtonsSidebar setButtonData={setButtonData} setContent={setContent} setListData={setListData} loading={sideLoading} setLoading={setSideLoading}/> }
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
        </IconContext.Provider>
    );
}

export default MyButtons;