import React from 'react'
import { Row } from 'react-bootstrap'
import { BsFillXSquareFill, BsFillPlusSquareFill } from "react-icons/bs";
import { deleteIdea, setVisibleIdea } from '../logic/DbLogic';

const Idea = ({idea, manage, visible, setIdeas, category}) => {
    return (
        <Row>
            <h4>{idea.idea}
            {manage && visible &&
            <BsFillXSquareFill 
            style={{ color: 'red', cursor: 'pointer', marginLeft: 10}}
            onClick={() => deleteIdea(idea._id, setIdeas, category)} />}
            {manage && !visible &&
            <BsFillPlusSquareFill 
            style={{ color: '#00ff2a', cursor: 'pointer', marginLeft: 10}}
            onClick={() => setVisibleIdea(idea._id, setIdeas, category)} />}
            </h4>
        </Row>
    )
}

export default Idea;
