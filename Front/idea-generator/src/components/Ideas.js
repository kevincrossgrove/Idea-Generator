import React from 'react';
import Idea from './Idea';

const Ideas = ({ideas}) => {
    console.log(ideas);
    return (
        <div id="ideaListing">
            {ideas.map((ideaObject) => (
                <Idea key={ideaObject._id} idea={ideaObject.idea} />
            ))}
        </div>
    )
}

export default Ideas
