import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';

import '../css/About.css';
import AuthContext from '../context/AuthContextProvider';

function About() {
    const { loggedIn } = useContext(AuthContext);
    const history = useHistory();

    return (
        <Container>
            <Row align="center">
                <Col lg={8}>
                    <div id="aboutLeftColumn">
                        <h1><span className="mainWords" onClick={() => history.push('/ideas')}>Discover</span> new Ideas</h1>
                        <div className="description">
                            With Idea Generator, finding new ideas is fast and simple.
                            With various categories to choose from, you can starting finding random ideas now.
                            Click Get Started if you want to find ideas now.
                        </div>
                        <h1><span className="mainWords" onClick={() => history.push('/submitIdeas')}>Share</span> your ideas</h1>
                        <div className="description">
                            Share your ideas for the world to see. Be recognized as a contributor. We allow
                            users to submit their ideas for any category. User's with accepted ideas will
                            be credited, and top contributors will be recognized
                        </div>
                        <h1><span className="mainWords" onClick={() => history.push('/ideas')}>Save</span> your ideas</h1>
                        <div className="description">
                            Idea Generator users will be provided far more features. This includes the ability
                            to save ideas you like. Learn more by creating an account, and viewing your dashboard.
                        </div>
                    </div>
                </Col>
                <Col lg={4} >
                    <div id="aboutRightColumn">
                        <Link to='/ideas'><button>Get Started</button></Link>
                        {!loggedIn && <Link to='/register'><button>Sign up for free</button></Link>}
                    </div>
                    
                </Col>
            </Row>
        </Container>
    );
}

export default About;