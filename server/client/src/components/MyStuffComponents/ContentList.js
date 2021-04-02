import React from 'react';
import '../../css/MyStuff.css';

const ContentList = ({content}) => {
    React.useEffect(() => {
        console.log(typeof(content));
        console.log(content);
        console.log(Object.keys(content));
    });

    const keys = Object.keys(content);

    return (
        <div className="contentListContainer">
            <h5>All Content</h5>
            {keys.map((key, i) => {
                return (
                    <div className="contentListItem" key={i}>
                        {i+1}. {content[key].idea}
                    </div>
                );
            })}
        </div>
    )
}

export default ContentList;