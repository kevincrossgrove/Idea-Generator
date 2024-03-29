import React, { useEffect, useState } from 'react'
import { BsFillXSquareFill } from "react-icons/bs";
import { useHistory } from 'react-router';

import '../../css/MyStuff.css';
import { LoadUserSavedContent, unsaveIdea } from '../../logic/DbLogic';

const SavedContent = () => {
    const history = useHistory();
    const [savedContent, setSavedContent] = useState([]);
    const [currentContent, setCurrentContent] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [update, setUpdate] = useState(false);
    const [empty, setEmpty] = useState('');

    LoadUserSavedContent(setSavedContent, setCurrentContent, setEmpty);

    useEffect(() => {
        if (savedContent.length) {
            const allCategories = savedContent.map(item => item.category);
            const uniqueCategories = Array.from(new Set(allCategories));
            setCategories(uniqueCategories);
        }
    }, [savedContent]);

    const selectUpdate = (e) => {
        setSelectedCategory(e.target.value);
        filterData(e.target.value);
    }

    const filterData = (currentCategory) => {
        if (currentCategory === 'All') {
            return setCurrentContent(savedContent);
        } 

        const filteredContent = savedContent.filter(item => item.category === currentCategory);

        if (filteredContent.length === 0) {
            console.log('No ideas left');
            setSelectedCategory('All');
            return filterData('All');
        }

        setCurrentContent(filteredContent);
    }

    useEffect(() => {
        filterData(selectedCategory)
    }, [update]);

    const unSave = (ideaId) => {
        unsaveIdea(ideaId, setSavedContent, setUpdate, update);
    }

    return (
        <div className="scrollable">
            <div id="savedContentTitle">
                <h5>Saved Content</h5>
            </div>
            <div id="savedContentDropdown">
                <select id="categoryDropdown" onChange={(e) => selectUpdate(e)}>
                    <option defaultValue="All">All</option>
                    {categories.map((category, index) =>
                        <option key={index} value={category}>
                            {category}
                        </option>
                    )}
                </select>
            </div>
            <div className="savedContentContainer">
            {empty &&
            <div id="emptyMessage">
                <p>You do not have any Idea's saved.</p>
                <p>Visit our Ideas page to begin saving content</p>
                <button id="goToIdeasButton" onClick={() => history.push('/ideas')}>Go to Ideas page</button>
            </div>}
            {currentContent.map(content => {
                return (
                    <div key={content._id} className="savedContent">
                        {content.idea}
                        {content.idea.length > 90 &&
                        <button className="readMore">Read More</button>}
                        <BsFillXSquareFill className="deleteSaved" onClick={() => unSave(content._id)} size={20} color={'#b8d3ff'} />
                    </div>
                );
            })}
            </div>
        </div>
    );
}

export default SavedContent;
