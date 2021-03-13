import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import AuthContext from '../../context/AuthContextProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();

        try {
            const loginData = { email, password }

            await axios.post("http://localhost:5000/auth/login", loginData );
            await getLoggedIn();
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container align="center">
            <Row>
                <h1>Sign into your account</h1>
            </Row>
            <Row>
                <form onSubmit={login}>
                    <input type="email" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                    <input type="password" placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}  />
                    <button type="submit">Sign In</button>
                </form>
            </Row>
        </Container>
    )
}

export default Login;