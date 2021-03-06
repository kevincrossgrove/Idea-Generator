import React, { useState, useRef } from 'react'
import { Button, ButtonGroup, Container, Form, Row, Col } from 'react-bootstrap'
import axios from "axios";
import '../css/SubmitIdeas.css'

const URL = 'http://localhost:5000';

const SubmitIdeas = () => {
    const [category, setCategory] = useState("Ideas");
    const [text, setText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
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
        <Container>
            <Row>
                <h1 id="submitTitle">Submit Ideas</h1>
            </Row>
            <Row>
                <ButtonGroup>
                    <Button onClick={() => updateCategory('Ideas')} autoFocus={true}>Ideas</Button>
                    <Button onClick={() => updateCategory('Motivation')}>Motivation</Button>
                    <Button onClick={() => updateCategory('Pog')}>Pog</Button>
                    <Button onClick={() => updateCategory('Saved')}>Saved</Button>
                </ButtonGroup>
            </Row>
            <Row>
                <Form.Control as="textarea" ref={formRef} rows={3} placeholder="Enter your idea here"
                onChange={(e) => setText(e.target.value)} />
            </Row>
            <Row>
                <h4 id="categoryTitle">Category Selected: {category}</h4>
            </Row>
            <Row>
                <Col align="center">
                    <Button variant="outline-light" id="submitButton" size="lg"
                     onClick={() => submitData()} >
                        Submit
                    </Button>
                </Col>
            </Row>
            <Row align="center">
                <h4 id="errorMessage">{errorMessage}</h4>
            </Row>
        </Container>
    )
}

export default SubmitIdeas
