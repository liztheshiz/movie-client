import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents page from refreshing when clicking submit button
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    return (
        <Container className="login-view mt-5">
            <Row className="mb-5">
                <Col>
                    <h1>Welcome to CinemaDatabase!</h1>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button className="mt-4" variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-3">
                <Col className="text-center" md={4}>
                    <span>New user?</span><Button variant="link">Register here</Button>
                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}