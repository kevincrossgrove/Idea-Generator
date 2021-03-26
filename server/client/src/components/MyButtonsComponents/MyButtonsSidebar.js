import React, { useEffect, useState } from 'react'
import { loadButtons, deleteButton } from '../../logic/MyButtonsLogic';
import { BsPencil, BsFillXSquareFill } from "react-icons/bs";
import { IconContext } from 'react-icons/lib';
import { Spinner } from 'react-bootstrap';

const MyButtonsSidebar = ({setButtonData, setContent, setListData, loading, setLoading}) => {
    const [data, setData] = useState([]);
    const [iconVisibility, setIconVisibility] = useState(false);
    const [hoverButton, setHoverButton] = useState('');

    useEffect(() => {
        loadButtons(setData);
        const timeout = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timeout);
    }, []);

    const startEditing = (e, id) => {
        e.stopPropagation();
        console.log("Starting Editing");
    }

    const deleteIcon = (e, id) => {
        e.stopPropagation();
        deleteButton(id, setData);
    }

    const setIcon = (e, bool) => {
        setHoverButton(e.target.innerHTML);
        setIconVisibility(bool);
    }

    const setPage = (button) => {
        setButtonData({
            id: button._id,
            name: button.buttonName,
            color: button.color
        });

        setContent(button.contentArray);

        setListData({
            position: -1,
            length: button.contentArray.length
        });
        setLoading(false);
    }

    return (
        <IconContext.Provider
            value={{
                style: { marginBottom: 3, marginLeft: 8 },
                size: 17,
            }}>
            <div>
                {loading ? (
                <div id="loading">
                    <Spinner animation="border" variant="light" />
                </div>) :
                data.map((button) => (
                    <div key={button._id} className="sidebar-button" 
                    onClick={() => setPage(button)} 
                    onMouseEnter={(e) => setIcon(e, true)} 
                    onMouseLeave={(e) => setIcon(e, false)}>
                        {button.buttonName}
                    {iconVisibility && hoverButton === button.buttonName && ( <>
                        <BsPencil id="editIcon" onClick={(e) => startEditing(e, button._id)}/>
                        <BsFillXSquareFill id="deleteIcon" onClick={(e) => deleteIcon(e, button._id)}/> </>) }
                    </div>
                ))}
            </div>
        </IconContext.Provider>
    );
}

export default MyButtonsSidebar;