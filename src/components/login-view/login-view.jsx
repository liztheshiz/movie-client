import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Alert from 'react-bootstrap/Alert';

import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    // Validates user inputs
    const validate = () => {
        let isReq = true;
        setUsernameErr('');
        setPasswordErr('');

        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 5) {
            setUsernameErr('Username must be at least 5 characters long');
            isReq = false;
        }

        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 8) {
            setPasswordErr('Password must be at least 8 characters long');
            isReq = false;
        }

        return isReq;
    }

    // If fields pass validation checks, logs user in
    const handleSubmit = (e) => {
        e.preventDefault(); // prevents page from refreshing when clicking submit button

        // Only sends axios request if all fields pass client-side validation check
        const isReq = validate();
        if (isReq) {
            axios.post('http://ec2-35-172-250-209.compute-1.amazonaws.com:8081/login', {
                Username: username,
                Password: password
            }).then(res => {
                const data = res.data;
                props.onLoggedIn(data);
            }).catch(err => {
                console.log('no such user');
                alert('Username or password does not exist! Please try again');
                /*return (
                    <Alert key='danger' variant='danger'>
                        Username or password does not exist! Please try again.
                    </Alert>
                );*/
            });
        }
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
                            {usernameErr && <p className="text-red">{usernameErr}</p>}
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                            {passwordErr && <p className="text-red">{passwordErr}</p>}
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