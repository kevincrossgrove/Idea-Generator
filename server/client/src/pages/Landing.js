import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { Container, Row, ButtonGroup, Button, Col } from 'react-bootstrap';

import { GenerateButton, ResetButton, SaveButton } from '../components/AppButton';
import { loadCategory } from '../logic/DbLogic';
import AuthContext from '../context/AuthContextProvider';

function Landing() {
    const {userData} = useContext(AuthContext);
    const [reset, setReset] = useState(false);
    const [loading, setLoading] = useState(false);
    const [wordCategory, setCategory] = useState(() => localStorage.getItem('category') ?? 'Ideas');
    const [ideas, setIdeas] = useState([]);
    const [idea, setIdea] = useState('');
    const [listData, setListData] = useState({
        position: -1,
        length: 0
    }); 

    // Load category, and clear result when the category is switched
    // NOTE: Due to asynchronicity, Idea/Reset are removed before Category is loaded.
    useEffect(() => {
        setIdea('');
        setReset(false);
        loadCategory(wordCategory, setIdeas, setListData, setLoading);
        localStorage.setItem("category", wordCategory);
    }, [wordCategory]); 

    // Every time the position changes, the idea will change
    useEffect(() => {
        const currentIdea = (listData.position === -1 || listData.position >= listData.length) 
        ? "" : ideas[listData.position];
        setIdea(currentIdea);
        setReset(listData.position >= listData.length);
    }, [listData.position]);

    const generateIdea = () => {
        if (listData.position < listData.length)
            setListData({...listData, position: listData.position + 1});
    }

    const updateCategory = (category) => {
        if (category !== wordCategory) {
            setCategory(category);
            setLoading(true);
        } 
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
                <Col md={12} align="center">
                    <GenerateButton 
                    title={wordCategory} 
                    onClickFunction={() => generateIdea()} 
                    loading={loading}       
                    listData={listData} 
                    setListData={setListData} 
                    currentVisible={true} />
                </Col>
            </Row>
            {idea !== '' && (
                <>
                <Row>
                    <div className='result'>
                        <div>{idea.idea}</div>
                    </div>
                </Row>
                <Row>
                    <div className='resultOptions'>
                        <SaveButton userId={userData._id} contentId={idea._id}/>
                    </div>
                </Row>
                </> )}
            <Row>
                {reset && <ResetButton setReset={setReset} listData={listData} setListData={setListData}/>}
            </Row>
        </Container>
        </>
    );
}

export default Landing;