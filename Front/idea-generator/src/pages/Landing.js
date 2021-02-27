import React from 'react'
import { useEffect, useState } from 'react';
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap';
import GenerateButton from '../components/GenerateButton';

function Landing() {
    const [result, setResult] = useState('Start');
    const [buttonTitle, setButtonTitle] = useState('Discover Ideas');
    const [wordCategory, setCategory] = useState(0);

    // Clear result when the category is switched
    useEffect(() => {
        setResult('');
    }, [buttonTitle]); 

    const categories = [
        ['Go Poop', 'Eat Ass', 'Suck a chode', 'Jump off a bridge', 'Get drunk', 'Jump out of a plane'],
        ['Dont be gay', 'Grow up', 'Seggs', 'Money'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['11', '22', '33', '44', '55', '66', '77', '88', '99']
    ];

    const setStates = (buttonText, category) => {
        setButtonTitle(buttonText);
        setCategory(category);
    }

    const randomText = () => {
        console.log(wordCategory)
        const i = Math.floor(Math.random() * Math.floor(categories[wordCategory].length));
        setResult(`${buttonTitle} : ${categories[wordCategory][i]}`);
    }

    return (
        <>
        <Container>
            <Row>
                <ButtonGroup aria-label="Basic example">
                    <Button onClick = {() => setStates('Ideas', 0)}>Ideas</Button>
                    <Button onClick = {() => setStates('Motivation', 1)}>Motivation</Button>
                    <Button onClick = {() => setStates('Pog', 2)}>Pog</Button>
                    <Button onClick = {() => setStates('Saved', 3)}>Saved</Button>
                </ButtonGroup>
            </Row>
            <Row>
                <GenerateButton title={buttonTitle} onClickFunction={() => randomText()}/>
            </Row>
            <Row>
                <div id='result'>{result}</div>
            </Row>
        </Container>
        </>
    );
}

export default Landing;