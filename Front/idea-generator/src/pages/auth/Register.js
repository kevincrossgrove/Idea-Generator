import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import AuthContext from '../../context/AuthContextProvider';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();

    const register = async (e) => {
        e.preventDefault();

        try {
            const registerData = { email, password, passwordVerify }

            await axios.post("http://localhost:5000/auth", registerData );
            await getLoggedIn();
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container align="center">
            <Row>
                <h1>Register a new account</h1>
            </Row>
            <Row>
                <form onSubmit={register}>
                    <input type="email" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                    <input type="password" placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}  />
                    <input type="password" placeholder="Verify Password"
                    onChange={(e) => setPasswordVerify(e.target.value)}
                    value={passwordVerify}  />
                    <button type="submit">Register</button>
                </form>
            </Row>
        </Container>
    )
}

export default Register;