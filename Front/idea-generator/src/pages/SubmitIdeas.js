import React, { useState } from 'react'
import { Button, ButtonGroup, Container, Form, Row } from 'react-bootstrap'
import axios from "axios";
import '../css/SubmitIdeas.css'

const SubmitIdeas = () => {
    const [category, setCategory] = useState("Ideas");
    const [text, setText] = useState('');

    const updateCategory = (newCategory) => {
        setCategory(newCategory);
    }

    const submitData = () => {
        axios.post('/ideas', {
            category: category,
            idea: text
          })
          .then((response) => {
            console.log(response, text);
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
                <Form.Control as="textarea" rows={3} onChange={(e) => setText(e.target.value)} />
            </Row>
            <Row>
                <h4 id="categoryTitle">Category Selected: {category}</h4>
                <Button variant="primary" type="submit" onClick={() => submitData()}>
                    Submit
                </Button>
            </Row>
        </Container>
    )
}

export default SubmitIdeas
