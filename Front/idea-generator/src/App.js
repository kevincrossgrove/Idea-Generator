import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './App.css';
import GenerateButton from './components/GenerateButton';
import MainNavbar from './components/MainNavbar';
import Weather from './components/Weather';

function App() {
  const [result, setResult] = useState('Start');
  const [buttonTitle, setButtonTitle] = useState('Discover Ideas');
  const [wordCategory, setCategory] = useState(0);

  // Clear result when the category is switched
  useEffect(() => {
    setResult('');
  }, [buttonTitle]); 

  const categories = [
    ['Go Poop', 'Eat Ass', 'Suck a chode', 'Jump off a bridge', 'Get drunk'],
    ['Dont be gay', 'Grow up', 'Seggs', 'Money'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['11', '22', '33', '44', '55', '66', '77', '88', '99']
  ];

  const randomText = () => {
    console.log(wordCategory)
    const i = Math.floor(Math.random() * Math.floor(categories[wordCategory].length));
    setResult(`${buttonTitle} : ${categories[wordCategory][i]}`);
  }

  return (
    <>
      <MainNavbar buttonSetter={setButtonTitle} categorySetter={setCategory} />
      <Container>
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

export default App;
