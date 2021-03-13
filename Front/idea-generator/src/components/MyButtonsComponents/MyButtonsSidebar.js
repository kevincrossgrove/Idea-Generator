import React, { useEffect, useState } from 'react'
import { loadButtons } from '../../logic/MyButtonsLogic';

const MyButtonsSidebar = ({setButtonData, setContent, setListData}) => {
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

        setListData({
            position: -1,
            length: button.contentArray.length
        });
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
