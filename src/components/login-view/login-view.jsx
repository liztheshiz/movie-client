import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents page from refreshing when clicking submit button
        /* Send a request to the server for authentication */
        axios.post('https://cinemadatabase.herokuapp.com/login', {
            Username: username,
            Password: password
        }).then(res => {
            const data = res.data;
            props.onLoggedIn(data);
        }).catch(err => {
            console.log('no such user')
        });
    };

    return (
        <Container className="login-view mt-5">
            <Row className="mb-5">
                <Col className="text-center">
                    <h1>Welcome to CinemaDatabase!</h1>
                </Col>
            </Row>
            <Row className="justify-content-sm-center">
                <Col sm={8} md={6} lg={4}>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button className="mt-4" variant="dark" type="submit" onClick={handleSubmit}>Login</Button>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-sm-center mt-3">
                <Col className="text-center" md={4}>
                    <span>New user?</span><Link to="/register"><Button variant="link">Register here</Button></Link>
                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}