import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

import './registration-view.scss';

export function RegistrationView(props) {
    // LOCAL STATE

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');


    // CUSTOM METHODS

    // Used to validate if string is alphanumeric
    const isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);
    // Used to validate if string is in MM/DD/YY format
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{2}$/;

    // Validates user inputs
    const validate = () => {
        let isReq = true;
        setUsernameErr('');
        setPasswordErr('');
        setEmailErr('');

        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 5) {
            setUsernameErr('Username must be at least 5 characters long');
            isReq = false;
        } else if (!isAlphaNumeric(username)) {
            setUsernameErr('Username must include only alphanumeric characters');
            isReq = false;
        }

        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 8) {
            setPasswordErr('Password must be at least 8 characters long');
            isReq = false;
        }

        if (!email) {
            setEmailErr('Email Required');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('Email is not valid');
            isReq = false;
        }

        if (birthday && !regex.test(birthday)) {
            setBirthdayErr('Birthday must use format MM/DD/YY');
            isReq = false;
        }

        return isReq;
    }

    // If fields pass validation checks, posts user info to database and logs them in
    const handleRegister = (e) => {
        e.preventDefault(); // prevents page from refreshing when clicking submit button

        // Only sends axios request if all fields pass client-side validation check
        const isReq = validate();
        if (isReq) {
            // Adds new user to database, then logs them in
            let request = {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            };
            axios.post('https://cinemadatabase.herokuapp.com/users', request).then(res => {
                alert('User successfully registered! Redirecting to login...');
                window.open('/', '_self');

                /* const data = { user: { Username: res.data.Username, Password: res.data.Password } };
                console.log(data);
                props.onLoggedIn(data); // Logs user in automatically when they register */
            }).catch(err => {
                console.log(err);
            });
        }
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
                            {usernameErr && <Form.Text className="text-red">{usernameErr}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                            {passwordErr && <Form.Text className="text-red">{passwordErr}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
                            {emailErr && <Form.Text className="text-red">{emailErr}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Text> &#x28;This field is optional&#x29;</Form.Text>
                            <Form.Control type="string" onChange={e => setBirthday(e.target.value)} />
                            {birthdayErr && <Form.Text className="text-red">{birthdayErr}</Form.Text>}
                            {!birthdayErr && <Form.Text className="text-muted">
                                Please use format MM/DD/YY
                            </Form.Text>}
                        </Form.Group>
                        <Button className="mt-4" variant="dark" type="submit" onClick={handleRegister}>Register</Button>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-sm-center mt-3">
                <Col className="text-center" md={4}>
                    <span>Already have an account?</span><Link to="/"><Button variant="link">Return to login</Button></Link>
                </Col>
            </Row>
        </Container>
    );
}

RegistrationView.propTypes = {
    // onLoggedIn: PropTypes.func.isRequired
}