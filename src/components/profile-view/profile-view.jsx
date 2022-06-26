import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';

export class ProfileView extends React.Component {
    // CUSTOM METHODS

    editMode(bool) {
        this.setState({ edit: bool });
    }

    showModal(bool) {
        this.setState({ show: bool });
    }

    deleteUser() {
        alert('User deleted!');
    }

    handleSubmit(e) {
        e.preventDefault();
        alert('you did it!');
    }

    isAlphaNumeric(str) {
        /^[a-z0-9]+$/gi.test(str);
    }

    // Validate user inputs
    validate() {
        let isReq = true;
        this.setState({ usernameErr: '' });
        this.setState({ passwordErr: '' });
        this.setState({ emailErr: '' });

        if (!username) {
            this.setState({ usernameErr: 'Username Required' });
            isReq = false;
        } else if (username.length < 5) {
            this.setState({ usernameErr: 'Username must be at least 5 characters long' });
            isReq = false;
        } else if (!isAlphaNumeric(username)) {
            this.setState({ usernameErr: 'Username must include only alphanumeric characters' });
            isReq = false;
        }

        if (!password) {
            this.setState({ passwordErr: 'Password Required' });
            isReq = false;
        } else if (password.length < 8) {
            this.setState({ passwordErr: 'Password must be at least 8 characters long' });
            isReq = false;
        }

        if (!email) {
            this.setState({ emailErr: 'Email Required' });
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            this.setState({ emailErr: 'Email is not valid' });
            isReq = false;
        }

        //
        // CHECK IF BIRTHDAY MATCHES FORMAT MM/DD/YY HERE!!
        //

        return isReq;
    }


    // LIFECYCLE METHODS

    constructor() {
        super();
        this.state = {
            edit: false,
            show: false,
            usernameErr: '',
            passwordErr: '',
            emailErr: '',
            birthdayErr: ''
        };
    }

    render() {
        const { user } = this.props;
        const { edit, show, usernameErr, passwordErr, emailErr, birthdayErr } = this.state;

        return (
            <Container className="profile-view border-dark border-3 mt-5">
                <Row className="mb-4">
                    <Col xs={0} sm={2} md={2} lg={3}></Col>
                    <Col className="profile-title" xs={8} sm={6} lg={4} xl={5}>
                        <h2 className="value">{user}</h2>
                    </Col>
                    <Col>
                        <Button variant="outline-dark" size="sm" onClick={() => this.editMode(true)}>Edit</Button>
                    </Col>
                </Row>
                <Row className="justify-content-sm-center mb-5">
                    <Col sm={8} md={6} lg={4}>
                        <Form>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                {!edit && <Form.Control placeholder={user} disabled />}
                                {edit && <Form.Control type="text" placeholder={user} onChange={e => setUsername(e.target.value)} />}
                                {usernameErr && <Form.Text className="text-muted">{usernameErr}</Form.Text>}
                            </Form.Group>
                            <Form.Group className="mt-3" controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                {!edit && <Form.Control placeholder="Password hidden" disabled />}
                                {edit && <Form.Control type="password" placeholder="Password hidden" onChange={e => setPassword(e.target.value)} />}
                                {passwordErr && <Form.Text className="text-muted">{passwordErr}</Form.Text>}
                            </Form.Group>
                            <Form.Group className="mt-3" controlId="formEmail">
                                <Form.Label>Email:</Form.Label>
                                {!edit && <Form.Control placeholder="email here" disabled />}
                                {edit && <Form.Control type="email" placeholder="email here" onChange={e => setEmail(e.target.value)} />}
                                {emailErr && <Form.Text className="text-muted">{emailErr}</Form.Text>}
                            </Form.Group>
                            <Form.Group className="mt-3" controlId="formBirthday">
                                <Form.Label>Birthday:</Form.Label>
                                {edit && <Form.Text> &#x28;This field is optional&#x29;</Form.Text>}
                                {!edit && <Form.Control placeholder="birthday here" disabled />}
                                {edit && <Form.Control type="string" placeholder="birthday here" onChange={e => setBirthday(e.target.value)} />}
                                {edit && <Form.Text className="text-muted">
                                    Please use format MM/DD/YY
                                </Form.Text>}
                            </Form.Group>
                            {edit && <Row className="justify-content-sm-center mt-4">
                                <Col><Button variant="outline-secondary" onClick={() => this.editMode(false)}>Cancel</Button></Col>
                                <Col><Button variant="dark" type="submit" onClick={() => this.handleSubmit()}>Submit</Button></Col>
                            </Row>}
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-sm-center mb-4">
                    <Col className="text-center">
                        <Button variant="link" onClick={() => this.showModal(true)}>Click here to delete user</Button>
                    </Col>
                </Row>
                {show && <Row>
                    <Col sm={8}>Are you certain you want to delete this user? This action is irreversible!</Col>
                    <Col sm={2}><Button variant="outline-secondary" size="sm" onClick={() => this.showModal()}>Cancel</Button></Col>
                    <Col sm={2}><Button variant="danger" size="sm" onClick={() => this.deleteUser(false)}>Delete</Button></Col>
                </Row>}
            </Container >
        );
    }

    /*
    render() {
        <Modal show={show} onHide={this.showModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.showModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => this.showModal(false)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    }
    */
}

ProfileView.propTypes = {
    user: PropTypes.string
}