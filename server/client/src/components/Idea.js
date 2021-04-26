import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { BsFillXSquareFill, BsFillPlusSquareFill } from "react-icons/bs";
import { deleteIdea, setVisibleIdea } from '../logic/DbLogic';

const Idea = ({idea, manage, visible, setIdeas, category}) => {
    const [userData, setUserData] = useState([]);
    
    useEffect(() => {
        const getUser = async () => {
            const userDataResponse = await axios.get(`/auth/user/${idea.creatorId}`);
            console.log(userDataResponse.data);
            setUserData(userDataResponse.data);
        }
        
        getUser();
    }, [])

    return (
        <div className="ideaRow">
            <div className="creatorBox">
                {(userData.displayName) ? userData.displayName : (userData.email) ? userData.email : 'None'}
            </div>
            <div className="ideaBox">
                {idea.idea}
            </div>
            <div className="ideaOptions">
                {manage && !visible &&
                <BsFillPlusSquareFill 
                style={{ color: '#00ff2a', cursor: 'pointer'}}
                onClick={() => setVisibleIdea(idea._id, setIdeas, category)} />}
                {manage &&
                <BsFillXSquareFill 
                style={{ color: 'red', cursor: 'pointer'}}
                onClick={() => deleteIdea(idea._id, setIdeas, category, visible)} />}
            </div>
        </div>
    )
}

export default Idea;
