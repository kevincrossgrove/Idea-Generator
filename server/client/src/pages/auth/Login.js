import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AuthContext from '../../context/AuthContextProvider';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import '../../css/Auth.css';
import MainNavbar from '../../components/MainNavbar';

const eye = <AiFillEye size={25} />
const invisibleEye = <AiFillEyeInvisible size={25} />

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {getLoggedIn} = useContext(AuthContext);
    const [visibility, setVisibility] = useState(false);
    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const loginData = { email, password }

        try {
            await axios.post("http://localhost:5000/auth/login", loginData );
            await getLoggedIn();
            history.push('/');
        } catch (err) {
            console.log(err.response);
            setErrorMessage(err.response.data.errorMessage);
        }
    }

    return (
        <>
        <MainNavbar />
        <Container align="center">
            <Row className="justify-content-center">
                <Col md="auto" className="authContainer">
                    <Form onSubmit={login}>
                        <h1 id="loginTitle">Login</h1>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="email" placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email} />
                            <Form.Text className="text-muted">{errorMessage}</Form.Text>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type={visibility ? "text" : "password"} placeholder="Password" 
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}  />
                                 <i id="passwordEye" onClick={() => setVisibility(!visibility)}>
                                     {visibility ? invisibleEye : eye}
                                </i>
                        </Form.Group>
                        <div id="forgotPassword">Forgot Password?</div>
                        <Button variant="primary" id="topButton" type="submit">
                            Login
                        </Button>
                        <Button variant="success" id="bottomButton" onClick={() => history.push('/register')}>
                            Create Account
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Login;