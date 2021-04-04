import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import '../../css/MyButton.css';
import { loadSingleButton, saveButton, updateButton } from '../../logic/MyStuffLogic';
import { BsFillXSquareFill } from "react-icons/bs";
import Ideas from '../Ideas';

const CreateButton = ({isEditing = false, editButtonId = null, contentArray = null, buttonTitle= null, setEditing = null}) => {
    const [title, setTitle] = useState('New Button');
    const [ideas, setIdeas] = useState([]);
    const [buttonId, setButtonId] = useState(null);
    const [currentIdea, setCurrentIdea] = useState('');
    const [deleteHover, setDeleteHover] = useState(false);
    const [hoverId, setHoverId] = useState('');
    const titleRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        const loadButton = () => {
            setButtonId(editButtonId);
            setTitle(buttonTitle);
            setIdeas(contentArray);
            titleRef.current.value = buttonTitle;
        }

        if (isEditing) loadButton();

    }, []);

    // If the user deletes their button title, reset the value.
    useEffect(() => {
        if (title === '') setTitle('New Button');
    }, [title]);

    // Remove an item from the array of existing ideas
    const removeItem = (id) => {
        const index = ideas.findIndex(item => {
            return item.id === id;
        });
        ideas.splice(index, 1);
        console.log(ideas);
        setIdeas([...ideas]);
    }

    const randomId = () => {
        const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
        return uint32.toString(16);
    }

    // Add their new idea, to the array of existing ideas.
    const addContent = () => {
        if (contentRef.current.value === '') return;
        setIdeas([...ideas, { id: randomId(), idea: currentIdea }]);
        contentRef.current.value = document.getElementById("contentForm").defaultValue;
    }

    const save = async () => {
        if (buttonId) 
            return await updateButton(buttonId, title, ideas);
        await saveButton(setButtonId, title, ideas);
    }

    const finish = async () => {
        await save();
        setTitle('New Button');
        setIdeas([]);
        setButtonId(null);
        titleRef.current.value = '';
        contentRef.current.value = '';
        if (isEditing) setEditing(false);
    }

    const hover = (bool, id) => {
        setDeleteHover(bool);
        setHoverId(id);
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            addContent();
            return false; 
        }
    }

    return (
        <div className="content">
        <Container>
            <Row>
                <Col lg={6} align="center">
                    <button id="myButton">{title}</button>
                </Col>
                <Col lg={6}>
                    <Form onSubmit={(e) => e.preventDefault()} >
                        <Form.Label>Choose your button's name</Form.Label>
                        <Form.Control placeholder="New Button" ref={titleRef} onChange={(e) => {
                            setTitle(e.currentTarget.value);
                        }}/>
                    </Form>
                </Col>
            </Row>
            <Row id="bottomRow">
                <Col lg={6} align="center" className="userIdeas">
                    <h1>Added Ideas</h1>
                    {ideas.map((idea) => (
                        <div key={idea.id}
                        className="addedIdeaContainer" 
                        onMouseEnter={() => hover(true, idea.id)}
                        onMouseLeave={() => hover(false, '')}>
                            <h5>{idea.idea}</h5>
                            {deleteHover && hoverId == idea.id && 
                            <BsFillXSquareFill 
                            className="addedIdeaIcon" 
                            onClick={() => removeItem(idea.id)}/>}
                        </div>
                    ))}
                </Col>
                <Col lg={6}>
                    <Form >
                        <Form.Label>Add Content</Form.Label>
                        <Form.Control id="contentForm"
                        placeholder="Enter content related to your button" 
                        as="textarea" 
                        ref={contentRef} 
                        rows={3} 
                        onKeyDown={(e) => handleKeyPress(e)}
                        onChange={(e) => {
                            setCurrentIdea(e.currentTarget.value);
                        }}/>
                    </Form>
                    <div id="createButtonsContainer">
                        <button className="createButton add" onClick={() => addContent()}>Add Content</button>
                        <button className="createButton save" onClick={() => save()}>Save</button>
                        <button className="createButton finish" onClick={() => finish()}>Finish</button>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default CreateButton;