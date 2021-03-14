import React, { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios';
import AuthContext from '../../context/AuthContextProvider'
import { useHistory } from 'react-router';

const ManageAccount = () => {
    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();

    const logout = async () => {
        await axios.get('/auth/logout');
        await getLoggedIn();
        history.push('/');
    }

    return (
        <Container>
            <Row>
                <Col align="center">
                    <Button variant="danger" onClick={logout}>
                        Logout
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ManageAccount;