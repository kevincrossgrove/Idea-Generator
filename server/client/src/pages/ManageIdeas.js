import React, { useState, useEffect } from 'react'
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap';

import '../css/ManageIdeas.css'
import Ideas from '../components/Ideas';
import { loadCategoryToManage } from '../logic/DbLogic';
import MainNavbar from '../components/MainNavbar';

function ManageIdeas() {
    const [ideas, setIdeas] = useState([]);
    const [category, setCategory] = useState('Ideas');

    const loadCategory = (newCategory) => {
        setCategory(newCategory)
        loadCategoryToManage(newCategory, setIdeas);
    }

    useEffect(() => {
        loadCategory('Ideas');
    }, []);

    return (
        <>
        <MainNavbar />
        <Container>
            <Row>
                <h1 id='manageTitle'>Manage Ideas</h1>
            </Row>
            <Row>
                <h5 id='manageCategory'>Selected: {category}</h5>
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
                <Ideas ideas={ideas} manage={true} setIdeas={setIdeas} category={category}/>
            </Row>
        </Container>
        </>
    );
}

export default ManageIdeas;
