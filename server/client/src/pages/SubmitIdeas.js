import React, { useState, useRef, useContext } from 'react'
import { Button, ButtonGroup, Container, Form, Row, Col } from 'react-bootstrap'
import axios from "axios";

import AuthContext from '../context/AuthContextProvider';
import '../css/SubmitIdeas.css'
import { Categories } from '../constants/Categories';

const SubmitIdeas = () => {
    // The data for the current user
    const {userData} = useContext(AuthContext);
    // The current category selected by the user
    const [category, setCategory] = useState(Categories[0]);
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
        if (userData === null) return setErrorMessage('Please login to submit an idea.');
        if (text === '') return setErrorMessage('Please enter an idea before submitting.');
        else setErrorMessage('');

        await axios.post(`/ideas`, {
            category: category,
            idea: text,
            creatorId: userData._id,
            creationTime: Date.now()
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
        <Container align="center">
            <Row>
                <h1 id="submitTitle">
                    Submit Ideas
                </h1>
            </Row>
            <Row className="justify-content-center">
                <Col md="auto">
                    <ButtonGroup>
                    {Categories.map((category, index) => 
                        <Button key={index} autoFocus={index === 0} onClick={() => updateCategory(category)}>
                            {category}
                        </Button>)}
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
    )
}

export default SubmitIdeas;