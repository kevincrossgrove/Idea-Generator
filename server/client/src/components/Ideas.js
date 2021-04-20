import React from 'react';
import Idea from './Idea';

const Ideas = ({ideas, manage=false, visible=null, setIdeas=null, category=null}) => {
    return (
        <div id="ideaListing">
            {ideas.map((ideaObject) => (
                <Idea key={ideaObject._id} idea={ideaObject} manage={manage} visible={visible} setIdeas={setIdeas} category={category}/>
            ))}
        </div>
    )
}

export default Ideas;