import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import '../../css/MyButtons.css';
import { saveButton } from '../../logic/MyButtonsLogic';
import MyButton from './MyButton';

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
        <Container>
            <Row>
                <Col align="center">
                    <MyButton title={title} color="red"/>
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
    );
}

export default CreateButton;