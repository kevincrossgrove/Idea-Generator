import React, { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios';
import AuthContext from '../../context/AuthContextProvider';
import { useHistory } from 'react-router';
import { ArrowBackButton } from '../../components/AppButton';

const ManageAccount = ({ setManageAccount, setProfile }) => {
    const {getLoggedIn} = useContext(AuthContext);
    const {userData} = useContext(AuthContext);
    const history = useHistory();

    const logout = async () => {
        try {
            await axios.get('/auth/logout');
            history.push('/ideas');
            await getLoggedIn();
        } catch (err)  { console.log(err); }
    }

    const displayDate = () => {
        const date = new Date(userData.creationTime)
        const month = new Intl.DateTimeFormat('en-US', { month: 'long'}).format(date);
        const year = date.getFullYear();

        return `${month} ${year}`;
    }

    const goBack = () => {
        setManageAccount(false);
        setProfile(true);
    }

    return (
        <Container>
            <ArrowBackButton title="Return to profile" onClick={() => goBack()}/>
            <Row>
                <Col align="center">
                    <p>Welcome {userData.email}!</p>
                    <p>Joined {displayDate()}</p>
                    <Button variant="danger" onClick={() => logout()}>
                        Logout
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ManageAccount;