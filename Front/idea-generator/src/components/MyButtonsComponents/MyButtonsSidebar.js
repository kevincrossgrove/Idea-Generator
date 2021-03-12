import React, { useEffect, useState } from 'react'
import { loadButtons } from '../../logic/MyButtonsLogic';
import { randomShuffle } from '../../logic/DbLogic';

const MyButtonsSidebar = ({setButtonData, setContent}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadButtons(setData);
    }, []);

    const setPage = (button) => {
        setButtonData({
            name: button.buttonName,
            color: button.color
        });

        setContent(button.contentArray);
    }

    return (
        <div>
            {data.map((button) => (
                <div key={button._id} className="sidebar-button" onClick={() => setPage(button)}>
                    {button.buttonName}
                </div>
            ))}
        </div>
    );
}

export default MyButtonsSidebar;
