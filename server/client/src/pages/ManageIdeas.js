import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap';

import '../css/ManageIdeas.css'
import Ideas from '../components/Ideas';
import { loadCategoryToManage } from '../logic/DbLogic';
import axios from 'axios';
import { Categories } from '../constants/Categories';

function ManageIdeas() {
    const [ideas, setIdeas] = useState([]);
    const [category, setCategory] = useState(Categories[0]);
    const [visible, setVisible] = useState(false);

    const loadCategory = useCallback((newCategory) => {
        setCategory(newCategory)
        loadCategoryToManage(newCategory, setIdeas, visible);
    }, [setCategory, setIdeas, visible]);

    useEffect(() => {
        loadCategory(category);
    }, [visible, loadCategory]);

    const updateDB = () => {
        axios.post('/ideas/update/all').then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <Container>
            <Row>
                <h1 id='manageTitle'>Manage {visible ? 'Visible' : 'Invisible'} Ideas</h1>
            </Row>
            <Row>
                <button id="generateButton" style={{margin: 'auto'}} 
                onClick={() => { setVisible(!visible); setIdeas([]); } }>
                    {visible ? 'Visible Ideas' : 'Invisible Ideas'}
                </button>
                <button id="generateButton" style={{margin: 'auto'}} onClick={() => updateDB()}>Update DB</button>
            </Row>
            <Row>
                <h5 id='manageCategory'>Selected: {category}</h5>
            </Row>
            <Row>
                <ButtonGroup aria-label="Basic example">
                    {Categories.map((category, index) => 
                            <Button key={index} onClick={() => loadCategory(category)}>
                                {category}
                            </Button>)}
                </ButtonGroup>
            </Row>
            <Row id='ideaListing'>
                <Ideas ideas={ideas} manage={true} visible={visible} setIdeas={setIdeas} category={category}/>
            </Row>
        </Container>
    );
}

export default ManageIdeas;