import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';

import MoviesList from '../movies-list/movies-list';

export function ProfileView(props) {
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');

    // CUSTOM METHODS

    // Changes edit var to given bool; determines if user can edit form fields
    const editMode = (bool) => {
        // When user cancels an edit, edit values are reset
        if (bool === false) {
            setUsername('');
            setPassword('');
            setEmail('');
            setBirthday('');
            setUsernameErr('');
            setPasswordErr('');
            setEmailErr('');
            setBirthdayErr('');
        }
        setEdit(bool);
    }

    // Changes show var to given bool; determines if modal is showing after user clicks delete button
    // (for now modal doesn't work; displays under button)
    const showModal = (bool) => { setShow(bool); }

    // Deletes current user
    const deleteUser = () => {
        axios.delete(`https://cinemadatabase.herokuapp.com/users/${props.user.Username}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => {
            alert('User deleted!');
            localStorage.clear();
            window.open("/", "_self");
        }).catch(err => console.log(err));
    }

    // Used to validate if string is alphanumeric
    const isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);

    // Validates user inputs
    const validate = () => {
        let isReq = true;
        setUsernameErr('');
        setPasswordErr('');
        setEmailErr('');
        setBirthdayErr('');

        if (!(username === '')) {
            console.log(username);
            if (username.length < 5) {
                setUsernameErr('Username must be at least 5 characters long');
                isReq = false;
            } else if (!isAlphaNumeric(username)) {
                setUsernameErr('Username must include only alphanumeric characters');
                isReq = false;
            }
        }

        if (password) {
            if (password.length < 8) {
                setPasswordErr('Password must be at least 8 characters long');
                isReq = false;
            }
        }

        if (email) {
            if (email.indexOf('@') === -1) {
                setEmailErr('Email is not valid');
                isReq = false;
            }
        }

        //
        // CHECK IF BIRTHDAY MATCHES FORMAT MM/DD/YY HERE (WHEN PRESENT)!!
        //

        return isReq;
    }

    // Updates current user's info with what is given in the profile form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Only sends axios request if all fields pass client-side validation check
        const isReq = validate();
        //const isReq = true;
        if (isReq) {
            // Updates user with given info
            let request = {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            };
            axios.put(`https://cinemadatabase.herokuapp.com/users/${props.user.Username}`, request, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then(res => {
                const data = res.data;
                console.log(data);
                localStorage.setItem('user', username);
                window.open(`/users/${username}`, '_self');
            }).catch(err => {
                console.log(err)
            });
        }
    }

    // Removes given movie from user's list of favorites
    const removeFromFavorites = (movieid) => {
        axios.delete(`https://cinemadatabase.herokuapp.com/users/${props.user.Username}/FavoriteMovies/${movieid}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => alert('Movie removed from favorites list!')).catch(err => console.log(err));
    }


    // RENDER

    return (
        <Container className="profile-view border-dark border-3 mt-5">
            <Row className="mb-4">
                <Col xs={0} sm={2} md={2} lg={3}></Col>
                <Col className="profile-title" xs={8} sm={6} lg={4} xl={5}>
                    <h2 className="value">{props.user.Username}</h2>
                </Col>
                {!edit && <Col>
                    <Button variant="outline-dark" size="sm" onClick={() => editMode(true)}>Edit</Button>
                </Col>}
            </Row>
            <Row className="justify-content-sm-center mb-5">
                <Col sm={8} md={6} lg={4}>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            {!edit && <Form.Control placeholder={props.user.Username} disabled />}
                            {edit && <Form.Control type="text" placeholder={props.user.Username} onChange={e => setUsername(e.target.value)} />}
                            {usernameErr && <Form.Text className="text-muted">{usernameErr}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            {!edit && <Form.Control type="password" placeholder="Hidden" disabled />}
                            {edit && <Form.Control type="password" placeholder="New password" onChange={e => setPassword(e.target.value)} />}
                            {passwordErr && <Form.Text className="text-muted">{passwordErr}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            {!edit && <Form.Control placeholder={props.user.Email} disabled />}
                            {edit && <Form.Control type="email" placeholder={props.user.Email} onChange={e => setEmail(e.target.value)} />}
                            {emailErr && <Form.Text className="text-muted">{emailErr}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            {!props.user.Birthday && !edit && <Form.Text> No birthday present</Form.Text>}
                            {props.user.Birthday && !edit && <Form.Control placeholder={props.user.Birthday} disabled />}
                            {edit && <Form.Control type="string" placeholder={props.user.Birthday} onChange={e => setBirthday(e.target.value)} />}
                            {edit && <Form.Text className="text-muted">
                                Please use format MM/DD/YY
                            </Form.Text>}
                        </Form.Group>
                        {edit && <Row className="justify-content-sm-center mt-4">
                            <Col><Button variant="outline-secondary" onClick={() => editMode(false)}>Cancel</Button></Col>
                            <Col><Button variant="dark" type="submit" onClick={handleSubmit}>Submit</Button></Col>
                        </Row>}
                    </Form>
                </Col>
            </Row>
            {(props.user.FavoriteMovies.length > 0) && <Row>
                <Col><h3>Favorites list:</h3></Col>
            </Row>}
            {(props.user.FavoriteMovies.length === 0) && <Row>
                <Col><h3>Favorites list is empty! Return to home to view available movies.</h3></Col>
            </Row>}
            <MoviesList movies={props.movies} user={props.user} listType={"profile"} removeFromFavorites={removeFromFavorites} />
            {!show && <Row className="justify-content-sm-center my-4">
                <Col className="text-center">
                    <Button variant="link" onClick={() => showModal(true)}>Click here to delete user</Button>
                </Col>
            </Row>}
            {show && <Row className="my-4">
                <Col sm={8}>Are you certain you want to delete this user? This action is irreversible!</Col>
                <Col sm={2}><Button variant="outline-secondary" size="sm" onClick={() => showModal(false)}>Cancel</Button></Col>
                <Col sm={2}><Button variant="danger" size="sm" onClick={() => deleteUser()}>Delete</Button></Col>
            </Row>}
        </Container >
    );
}

/* this render function is just to hold the modal skeleton until Modal is imported correctly...
render() {
    <Modal show={show} onHide={() => showModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => showModal(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={() => showModal(false)}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
}
*/

ProfileView.propTypes = {
    //user: PropTypes.string.isRequired
}