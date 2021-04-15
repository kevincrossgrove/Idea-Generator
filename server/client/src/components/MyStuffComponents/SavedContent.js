import React, { useEffect, useState } from 'react'
import { BsFillXSquareFill } from "react-icons/bs";

import '../../css/MyStuff.css';
import { LoadUserSavedContent, unsaveIdea } from '../../logic/DbLogic';
import MainNavbar from '../MainNavbar';

const SavedContent = () => {
    const [savedContent, setSavedContent] = useState([]);
    const [currentContent, setCurrentContent] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [update, setUpdate] = useState(false);

    LoadUserSavedContent(setSavedContent, setCurrentContent);

    useEffect(() => {
        if (savedContent.length) {
            const allCategories = savedContent.map(item => item.category);
            const uniqueCategories = Array.from(new Set(allCategories));
            setCategories(uniqueCategories);
        }
    }, [savedContent]);

    useEffect(() => {
        filterData(selectedCategory)
    }, [update]);

    const selectUpdate = (e) => {
        console.log('select update');
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

    const unSave = (ideaId) => {
        unsaveIdea(ideaId, setSavedContent, setUpdate, update);
    }

    return (
        <>
        <MainNavbar logo={false} />
        <div className="content scrollable">
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
            {currentContent.map(content => {
                return (
                    <div key={content._id} className="savedContent">
                        {content.idea}
                        {content.idea.length > 90 &&
                        <button className="readMore">Read More</button>}
                        <BsFillXSquareFill className="deleteSaved" onClick={() => unSave(content._id)} size={20} />
                    </div>
                )
            })}
            </div>
        </div>
        </>
    );
}

export default SavedContent;
