import React from 'react';
import Idea from './Idea';

const Ideas = ({ideas, manage=false, setIdeas=null, category=null}) => {
    console.log(ideas);
    return (
        <div id="ideaListing">
            {ideas.map((ideaObject) => (
                <Idea key={ideaObject._id} idea={ideaObject} manage={manage} setIdeas={setIdeas} category={category}/>
            ))}
        </div>
    )
}

export default Ideas
