import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import AuthContext from '../../context/AuthContextProvider';
import { FcCheckmark } from "react-icons/fc";
import '../../css/Auth.css';

const checkmark = <FcCheckmark size={25} />

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const Register = () => {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const [passwordVerify, setPasswordVerify] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();

    const updateEmail = (email) => {
        setEmail(email);
        if (emailRegex.test(email)) setEmailValid(true);
        else setEmailValid(false);
    }

    const updatePassword = (updatedPassword) => {
        setPassword(updatedPassword);

        if (passwordRegex.test(updatedPassword)) setPasswordValid(true);
        else setPasswordValid(false);

        if (updatedPassword === passwordVerify && passwordVerify !== '') setConfirmed(true);
        else setConfirmed(false);
    }

    const updateVerify = (updatedPassword) => {
        setPasswordVerify(updatedPassword);
        if (updatedPassword === password && passwordVerify !== '' && passwordRegex.test(updatedPassword)) 
            setConfirmed(true);
        else setConfirmed(false);
    }

    const register = async (e) => {
        e.preventDefault();
        setEmailError(''); setPasswordError(''); setConfirmError('');
        
        if (!email || !password || !passwordVerify) return setEmailError('Please enter all required fields.');
        if (!emailRegex.test(email)) return setEmailError('Invalid Email Entered');
        if (password.length < 8) return setPasswordError('Password must be 8 characters or greater.');
        if (!passwordRegex.test(password)) return setPasswordError('Password requirements not met.');
        if (password !== passwordVerify) return setConfirmError('Passwords do not match.');

        try {
            const registerData = { email, password, passwordVerify }

            await axios.post("http://localhost:5000/auth", registerData );
            await getLoggedIn();
            history.push('/');
        } catch (err) {
            const response = err.response.data;
            if (response.code === 4) setEmailError(response.errorMessage);
        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="auto" className="authContainer">
                    <h1 id="registerTitle">Create a new account</h1>
                    <Form onSubmit={register}>
                        <Form.Group className="registerFormGroup" autoComplete="new-password">
                            <Form.Label>Email</Form.Label>
                            <Form.Control placeholder="Email"
                            onChange={(e) => updateEmail(e.target.value)}
                            value={email} />
                            <i className="check">{emailValid && checkmark}</i>
                            <Form.Text className="errorText">{emailError}</Form.Text>
                        </Form.Group>
                        <Form.Group className="registerFormGroup" autoComplete="new-password">
                            <Form.Label>Password (8+ characters, at least 1 letter, number, special character)</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                            onChange={(e) => updatePassword(e.target.value)}
                            value={password}  />
                            <i className="check">{passwordValid && checkmark}</i>
                            <Form.Text className="errorText">{passwordError}</Form.Text>
                        </Form.Group>
                        <Form.Group className="registerFormGroup" autoComplete="new-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Verify Password"
                            onChange={(e) => updateVerify(e.target.value)}
                            value={passwordVerify}  />
                            <i className="check">{confirmed && checkmark}</i>
                            <Form.Text className="errorText">{confirmError}</Form.Text>
                        </Form.Group>
                        <Button variant="success" id="topButton" type="submit">
                            Create Account
                        </Button>
                        <Button variant="primary" id="bottomButton" onClick={() => history.push('/login')}>
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;