import React, { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios';
import AuthContext from '../../context/AuthContextProvider'
import { useHistory } from 'react-router';

const ManageAccount = () => {
    const {getLoggedIn} = useContext(AuthContext);
    const {userData} = useContext(AuthContext);
    const history = useHistory();

    const logout = async () => {
        await axios.get('/auth/logout');
        await getLoggedIn();
        history.push('/');
    }

    const displayDate = () => {
        const date = new Date(userData.creationTime)
        const month = new Intl.DateTimeFormat('en-US', { month: 'long'}).format(date);
        const year = date.getFullYear();

        return `${month} ${year}`;
    }

    return (
        <Container>
            <Row>
                <Col align="center">
                    <p>Welcome {userData.email}!</p>
                    <p>Joined {displayDate()}</p>
                    <Button variant="danger" onClick={logout}>
                        Logout
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ManageAccount;