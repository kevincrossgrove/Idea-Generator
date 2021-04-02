import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import '../../css/MyButton.css';
import { saveButton } from '../../logic/MyStuffLogic';

const CreateButton = () => {
    const [title, setTitle] = useState('New Button');
    const [ideas, setIdeas] = useState([]);
    const [currentIdea, setCurrentIdea] = useState('');
    const titleRef = useRef();
    const contentRef = useRef();

    // If the user deletes their button title, reset the value.
    useEffect(() => {
        if (title === '') setTitle('New Button');
    }, [title]);

    // Add their new idea, to the array of existing ideas.
    const addIdea = (e) => {
        e.preventDefault();
        setIdeas([...ideas, { id: ideas.length, idea: currentIdea }]);
    }

    const save = async () => {
        await saveButton(title, ideas, 'red', setTitle, setIdeas);
        titleRef.current.value = '';
        contentRef.current.value = '';
    }

    return (
        <div className="content">
        <Container>
            <Row>
                <Col align="center">
                    <button id="myButton">{title}</button>
                </Col>
                <Col>
                    <Form onSubmit={(e) => e.preventDefault()} >
                        <Form.Label>Choose your button's name</Form.Label>
                        <Form.Control placeholder="New Button" ref={titleRef} onChange={(e) => {
                            setTitle(e.currentTarget.value);
                        }}/>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col align="center" className="userIdeas">
                    <h1>Added Ideas</h1>
                    {ideas.map((idea) => (
                        <h4 key={idea.id}>{idea.idea}</h4>
                    ))}
                </Col>
                <Col>
                    <Form onSubmit={(e) => addIdea(e)} >
                        <Form.Label>Add Content</Form.Label>
                        <Form.Control placeholder="Enter content related to your button" ref={contentRef} onChange={(e) => {
                            setCurrentIdea(e.currentTarget.value);
                        }}/>
                    </Form>
                    <Container align="center">
                        <button id="saveButton" onClick={() => save()}>Save</button>
                    </Container>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default CreateButton;