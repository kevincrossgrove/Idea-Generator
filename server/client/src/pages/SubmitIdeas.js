import React, { useState, useRef } from 'react'
import { Button, ButtonGroup, Container, Form, Row, Col } from 'react-bootstrap'
import axios from "axios";
import '../css/SubmitIdeas.css'
import MainNavbar from '../components/MainNavbar';

const SubmitIdeas = () => {
    // The current category selected by the user
    const [category, setCategory] = useState("Ideas");
    // The text inside of the text area
    const [text, setText] = useState('');
    // The errorMessage text
    const [errorMessage, setErrorMessage] = useState('');
    // UseRef referencing the text area.
    const formRef = useRef();

    const updateCategory = (newCategory) => {
        setCategory(newCategory);
    }

    const submitData = async () => {
        if (text === '') return setErrorMessage('Please enter an idea before submitting.');
        else setErrorMessage('');

        await axios.post(`/ideas`, {
            category: category,
            idea: text
          })
          .then((response) => {
            console.log(response, text);
            formRef.current.value = '';
            setText('');
          }, (error) => {
            console.log(error);
          });
    }

    return (
        <>
        <MainNavbar />
        <Container align="center">
            <Row>
                <h1 id="submitTitle">
                    Submit Ideas
                </h1>
            </Row>
            <Row className="justify-content-center">
                <Col md="auto">
                    <ButtonGroup>
                        <Button onClick={() => updateCategory('Ideas')} autoFocus={true}>Ideas</Button>
                        <Button onClick={() => updateCategory('Motivation')}>Motivation</Button>
                        <Button onClick={() => updateCategory('Pog')}>Pog</Button>
                        <Button onClick={() => updateCategory('Saved')}>Saved</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md="auto">
                    <Form.Control 
                    id="submitTextArea" 
                    as="textarea" 
                    ref={formRef} 
                    rows={4} 
                    placeholder="Enter your idea here"
                    onChange={(e) => setText(e.target.value)} />
                </Col>
            </Row>
            <Row>
                <h4 id="categoryTitle">
                    Category Selected: {category}
                </h4>
            </Row>
            <Row>
                <Col align="center">
                    <Button 
                    variant="outline-light" 
                    id="submitButton" 
                    size="lg"
                    onClick={() => submitData()} >
                        Submit
                    </Button>
                </Col>
            </Row>
            <Row align="center">
                <h4 id="errorMessage">{errorMessage}</h4>
            </Row>
        </Container>
        </>
    )
}

export default SubmitIdeas;