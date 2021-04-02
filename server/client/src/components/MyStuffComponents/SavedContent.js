import React, { useEffect, useState } from 'react'

import '../../css/MyStuff.css';
import { loadUserSavedContent } from '../../logic/DbLogic';

const SavedContent = () => {
    const [savedContent, setSavedContent] = useState([]);

    useEffect(() => {
        loadUserSavedContent(setSavedContent);
    }, []);

    useEffect(() => {
        console.log(savedContent);
    }, [savedContent]);

    return (
        <div className="content">
            <div id="savedContentTitle">
                <h5>Saved Content</h5>
            </div>
            <div id="savedContentDropdown">
                <select id="categoryDropdown">
                    <option value="All" selected>All</option>
                    <option value="Test">Testing 1234</option>
                </select>
            </div>
            <div className="savedContentContainer">
            {savedContent.map(content => {
                return (
                    <div key={content._id} className="savedContent">
                        {content.idea}
                        {content.idea.length > 90 &&
                        <button className="readMore">Read More</button>}
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default SavedContent;
