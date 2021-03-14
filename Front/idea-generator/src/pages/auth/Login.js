import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AuthContext from '../../context/AuthContextProvider';
import '../../css/Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {getLoggedIn} = useContext(AuthContext);
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
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" placeholder="Password" 
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}  />
                        </Form.Group>
                        <Button variant="primary" id="loginButton" type="submit">
                            Login
                        </Button>
                        <Button variant="success" id="createAccountButton" type="submit">
                            Create Account
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;