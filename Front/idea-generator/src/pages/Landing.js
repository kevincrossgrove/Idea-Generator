import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap';

import { GenerateButton, ResetButton, BackButton } from '../components/AppButton';
import { loadCategory } from '../logic/DbLogic';  

function Landing() {
    const [reset, setReset] = useState(false);
    const [loading, setLoading] = useState(false);
    const [wordCategory, setCategory] = useState(() => sessionStorage.getItem('category') ?? 'Ideas');
    const [ideas, setIdeas] = useState([]);
    const [idea, setIdea] = useState('');
    const [listData, setListData] = useState({
        position: -1,
        length: ideas.length ?? 0
    });

    // Load category, and clear result when the category is switched
    // NOTE: Due to asynchronicity, Idea/Reset are removed before Category is loaded.
    useEffect(() => {
        setLoading(true);
        setIdea('');
        setReset(false);
        loadCategory(wordCategory, setIdeas, setListData);
        setLoading(false);
        sessionStorage.setItem("category", wordCategory);
    }, [wordCategory]); 

    // Every time the position changes, the idea will change
    useEffect(() => {
        const currentIdea = (listData.position === -1 || listData.position >= listData.length) 
        ? "" : ideas[listData.position].idea;
        setIdea(currentIdea);
        setReset(listData.position >= listData.length);
    }, [listData.position]);

    const generateIdea = () => {
        if (listData.position < listData.length)
            setListData({...listData, position: listData.position + 1});
    }

    const updateCategory = (category) => {
        setCategory(category)
    }

    return (
        <>
        <Container>
            <Row>
                <ButtonGroup aria-label="Basic example">
                    <Button onClick = {() => updateCategory('Ideas')}>Ideas</Button>
                    <Button onClick = {() => updateCategory('Motivation')}>Motivation</Button>
                    <Button onClick = {() => updateCategory('Pog')}>Pog</Button>
                    <Button onClick = {() => updateCategory('Saved')}>Saved</Button>
                </ButtonGroup>
            </Row>
            <Row>
                <GenerateButton title={wordCategory} onClickFunction={() => generateIdea()} loading={loading}/>
                {listData.position>0 && <BackButton listData={listData} setListData={setListData} /> }
            </Row>
            <Row>
                <div id='result'>{idea}</div>
            </Row>
            <Row>
                {reset && !loading && <ResetButton setReset={setReset} listData={listData} setListData={setListData}/>}
            </Row>
        </Container>
        </>
    );
}

export default Landing;