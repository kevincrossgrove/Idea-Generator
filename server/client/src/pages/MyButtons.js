import React, { useEffect, useState } from 'react';
import '../css/MyButtons.css';
import { AiFillPlusCircle, AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import CreateButton from '../components/MyButtonsComponents/CreateButton';
import MyButtonsSidebar from '../components/MyButtonsComponents/MyButtonsSidebar';
import { Container } from 'react-bootstrap';
import { GenerateButton, ResetButton } from '../components/AppButton';
import { IconContext } from 'react-icons/lib';
import ContentList from '../components/MyButtonsComponents/ContentList';
import EditMyButton from '../components/MyButtonsComponents/EditMyButton';

const MyButtons = () => {
    // Keeps track of when createButton is open/closed
    const [createButton, setCreateButton] = useState(false);

    // Keeps track of when EditButton is open/closed
    const [editButton, setEditButton] = useState(false);

    // Keeps track of when MyButtons is open/closed
    const [myButtons, setMyButtons] = useState(false);

    // Keeps track of when sidebar buttons are open/closed
    const [open, setOpen] = useState(false);

    // For displaying loading whilst individual Buttons load.
    const [loading, setLoading] = useState(false);

    // For displaying a loading symbol whilst sidebar buttons load.
    const [sideLoading, setSideLoading] = useState(false);

    // The data for the button currently being displayed.
    const [buttonData, setButtonData] = useState({id: undefined, name: '', color: 'red'});

    // The content for the current Button
    const [content, setContent] = useState([]);

    // The individual content currently displaying from content list
    const [currentContent, setCurrentContent] = useState('');

    // Keeps track of if the current Content should be visible or not.
    const [currentVisible, setCurrentVisible] = useState(true);

    // UseState that helps skeeps track of what content is being displayed
    const [listData, setListData] = useState({ position: -1, length: content.length ?? 0 });

    // Keeps trach when the buttons entire content should be displayed or not
    const [viewAll, setViewAll] = useState(false);

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
        console.log(buttonData);
    }

    const setAllContent = () => {
        setViewAll(!viewAll);
        setCurrentVisible(false);
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
                        setOpen(false);
                    }}>
                    Create Button
                    <AiFillPlusCircle />
                </div>
                <div className="sidebar-item" onClick={() => {
                        setSideLoading(true);
                        setMyButtons(true);
                        setCreateButton(false);
                        setOpen(!open);
                    }}>
                    My Buttons
                    {open ? <AiFillCaretDown/> : <AiFillCaretRight/>}
                </div>
                {open && <MyButtonsSidebar setButtonData={setButtonData} setContent={setContent} setListData={setListData} loading={sideLoading} setLoading={setSideLoading}/> }
            </div>

            {createButton && 
            <div className="content">
                <CreateButton />
            </div> }

            {editButton &&
            <div className="content">
                <EditMyButton />
            </div> }

            {myButtons &&
            <div className="content">
                <Container align="center" id="myButtonContainer">
                    {buttonData.name === ''  && <h1 >Select a button</h1>}
                    {buttonData.name !== '' && 
                    <>
                        <GenerateButton 
                        title={buttonData.name} 
                        onClickFunction={() => setResult()}
                        loading={loading} 
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
                        {listData.position > -1 && currentVisible && <div className="contentContainer">
                            <h5 id="currentContent">{currentContent}</h5>
                        </div>}
                        {content.length < 1 && <h5>This button has no content added. Press edit to add content.</h5>}
                        {viewAll && <ContentList content={content} buttonTitle={buttonData.name} />}
                    </>}
                </Container>
            </div>}
        </div>
        </IconContext.Provider>
    );
}

export default MyButtons;