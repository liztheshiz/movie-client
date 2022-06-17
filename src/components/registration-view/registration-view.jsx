import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents page from refreshing when clicking submit button
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    return (
        <div className="registration-view">
            <h2>Register:</h2>
            <Form style={{ width: "12rem" }}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="string" onChange={e => setBirthday(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
            </Form>
        </div>
    );
}

RegistrationView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}