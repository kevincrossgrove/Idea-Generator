import React from 'react'

const MyStuffLanding = ({setStartingPage, setSavedContent, setCreateButton, setMyButtons}) => {
    return (
        <>
            <h1 id="stuffTitle"> Welcome to your dashboard!</h1>
            <div className="stuffContainer">
                <div className="stuffCol">
                    <h4 className="stuffSubtitle">View your saved content</h4>
                    <div className="stuffDescription">
                        Here you can view all of ideas and content you have saved from the main Ideas page. You can also sort the ideas by category and unsave ideas you don't need anymore.
                    </div>
                    <button onClick={() => {
                        setStartingPage(false);
                        setSavedContent(true);
                        setCreateButton(false);
                        setMyButtons(false);
                    }}> View Saved Content</button>
                </div>
                <div className="stuffCol">
                    <h4 className="stuffSubtitle">Create your own buttons</h4>
                    <div className="stuffDescription">
                        With Idea generator you have the ability to create your own buttons identical to the buttons on the main Ideas page. You can personalize and create your own categories that relate to you.
                    </div>
                    <button onClick={() => {
                        setStartingPage(false);
                        setSavedContent(false);
                        setCreateButton(true);
                        setMyButtons(false);
                    }}> Create a Button</button>
                </div>
                <div className="stuffCol">
                    <h4 className="stuffSubtitle">Use your buttons</h4>
                    <div className="stuffDescription">
                        Here you can find the buttons you have already created. You can also edit these buttons and view all of the content that they store. 
                    </div>
                    <div className="stuffButtonContainer">
                        <button onClick={() => {
                            setStartingPage(false);
                            setSavedContent(false);
                            setCreateButton(false);
                            setMyButtons(true);
                        }}>View your Buttons</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyStuffLanding;
