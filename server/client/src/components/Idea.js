import React from 'react'
import { Row } from 'react-bootstrap'
import { BsFillXSquareFill } from "react-icons/bs";
import { deleteIdea } from '../logic/DbLogic';

const Idea = ({idea, manage, setIdeas, category}) => {
    return (
        <Row>
            <h4>{idea.idea}
            {manage && 
            <BsFillXSquareFill 
            style={{ color: 'red', cursor: 'pointer', marginLeft: 10}}
            onClick={() => deleteIdea(idea._id, setIdeas, category)} />}
            </h4>
        </Row>
    )
}

export default Idea;
