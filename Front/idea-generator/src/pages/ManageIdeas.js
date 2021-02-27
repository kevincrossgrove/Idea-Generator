import React, { useState } from 'react'
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap';
import axios from "axios";

import '../css/ManageIdeas.css'
import Ideas from '../components/Ideas';

function ManageIdeas() {
    const [ideas, setIdeas] = useState([]);

    const loadCategory = (category) => {
        axios.get(`/ideas/${category}`).then(response => {
            response.data.map((object) => {
                console.log(object.idea);
            })
            setIdeas(response.data);
        });
    }

    return (
        <Container>
            <Row id='manageTitle'>
                <h1>Manage Ideas</h1>
            </Row>
            <Row>
                <ButtonGroup aria-label="Basic example">
                    <Button onClick={() => loadCategory('Ideas')}>Ideas</Button>
                    <Button onClick={() => loadCategory('Motivation')}>Motivation</Button>
                    <Button onClick={() => loadCategory('Pog')}>Pog</Button>
                    <Button onClick={() => loadCategory('Saved')}>Saved</Button>
                </ButtonGroup>
            </Row>
            <Row id='ideaListing'>
                <Ideas ideas={ideas} />
            </Row>
        </Container>
    )
}

export default ManageIdeas;
