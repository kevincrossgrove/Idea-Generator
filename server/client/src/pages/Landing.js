import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { CopyButton, GenerateButton, ResetButton, SaveButton } from '../components/AppButton';
import { loadCategory } from '../logic/DbLogic';
import AuthContext from '../context/AuthContextProvider';
import { Categories } from '../constants/Categories';
import Dropdown from '../components/Dropdown/Dropdown';

function Landing() {
    const {userData} = useContext(AuthContext);
    const [reset, setReset] = useState(false);
    const [loading, setLoading] = useState(true);
    const [wordCategory, setCategory] = useState(Categories[0]);
    const [ideas, setIdeas] = useState([]);
    const [idea, setIdea] = useState('');
    const [listData, setListData] = useState({
        position: -1,
        length: 0
    });
    const [copyMessage, setCopyMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
    }, [listData, ideas]);

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
        <Container>
            <div>
                <h2 id="landingTitle" className="neumorph" >Select Category</h2>
            </div>
            <div className="dropdownContainer">
                <Dropdown items={Categories} title="Select a category" value={wordCategory} onChange={val => updateCategory(val)}/>
            </div>
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
                    <div className='result disable-highlight'>
                        <div>{idea.idea}</div>
                    </div>
                </Row>
                <Row>
                    <div className='resultOptions'>
                        <CopyButton currentContent={idea} setMessage={setCopyMessage}/>
                        <SaveButton userId={userData?._id} contentId={idea._id} setErrorMessage={setErrorMessage} />
                    </div>
                    <p id="messageContainer">
                        <span id="savingError">
                            {errorMessage}
                        </span>
                        <span id="copyMessage">
                            {copyMessage}
                        </span>
                    </p>

                </Row>
                </> )}
            <Row>
                {reset && <ResetButton setReset={setReset} listData={listData} setListData={setListData}/>}
            </Row>
        </Container>
    );
}

export default Landing;