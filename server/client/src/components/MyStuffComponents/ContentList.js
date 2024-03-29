import React from 'react';
import '../../css/MyStuff.css';

const ContentList = ({content}) => {
    React.useEffect(() => {
        console.log(content);
    });

    const keys = Object.keys(content);

    return (
        <div className="contentListContainer">
            <h5>All Content</h5>
            {keys.map((key, i) => {
                return (
                    <div className="contentListItem" key={i}>
                        <span className="listNumber">{i+1}.</span>  {content[key].idea}
                    </div>
                );
            })}
        </div>
    )
}

export default ContentList;