import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleRegister = (e) => {
        e.preventDefault(); // prevents page from refreshing when clicking submit button
        // Adds new user to database, then logs them in
        let request = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
        console.log(`{Username: ${request.Username}; Password: ${request.Password}; Email: ${request.Email}; Birthday: ${request.Birthday}}; Req: ${request}`);
        axios.post('https://cinemadatabase.herokuapp.com/users', request).then(res => {
            const data = res.data;
            props.onLoggedIn(data);
        }).catch(err => {
            console.log(err)
        });
    };

    return (
        <Container className="registration-view mt-5">
            <Row className="mb-5">
                <Col className="text-center">
                    <h2>New user registeration:</h2>
                </Col>
            </Row>
            <Row className="justify-content-sm-center">
                <Col sm={8} md={6} lg={4}>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                            <Form.Text className="text-muted">
                                Username must be at least 5 characters long and include only alphanumeric characters.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                            <Form.Text className="text-muted">
                                Password must be at least 8 characters long and include only alphanumeric characters.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control type="string" onChange={e => setBirthday(e.target.value)} />
                            <Form.Text className="text-muted">
                                &#x28;This field is optional.&#x29; Please use format MM/DD/YY.
                            </Form.Text>
                        </Form.Group>
                        <Button className="mt-4" variant="dark" type="submit" onClick={handleRegister}>Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

RegistrationView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}