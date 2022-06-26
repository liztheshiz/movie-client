import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
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


    // LIFECYCLE METHODS

    constructor() {
        super();
        this.state = {
            edit: false,
            show: false
        };
    }

    render() {
        const { user } = this.props;
        const { edit, show } = this.state;

        return (
            <Container className="profile-view border-dark border-3 mt-5">
                <Row className="mb-4">
                    <Col className="profile-title" xs={3}>
                        <h2 className="value">{user}</h2>
                    </Col>
                    <Col xs={9}>
                        <Button variant="outline-dark" size="sm" onClick={() => this.editMode(true)}>Edit</Button>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-3">
                    <Col className="profile-username" lg={10}>
                        <span className="label">Username: </span>
                        {!edit && <span className="value">{user}</span>}
                        {edit && <span className="value">editing</span>}
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-4">
                    <Col className="profile-password" lg={10}>
                        <span className="label">Password: </span>
                        {!edit && <span className="value">Hidden</span>}
                        {edit && <span className="value">editing</span>}
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-4">
                    <Col className="profile-email" lg={10}>
                        <span className="label">Email: </span>
                        {!edit && <span className="value">email here</span>}
                        {edit && <span className="value">editing</span>}
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-4">
                    <Col className="profile-birthday" lg={10}>
                        <span className="label">Birthday: </span>
                        {!edit && <span className="value">birthday here</span>}
                        {edit && <span className="value">editing</span>}
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-4">
                    <Col className="text-center" md={4}>
                        <Button variant="link" onClick={() => this.showModal(true)}>Click here to delete user</Button>
                    </Col>
                </Row>
                {show && <Row>
                    <Col sm={8}>Are you certain you want to delete this user? This action is irreversible!</Col>
                    <Col sm={2}><Button variant="outline-secondary" size="sm" onClick={() => this.showModal()}>Cancel</Button></Col>
                    <Col sm={2}><Button variant="danger" size="sm" onClick={() => this.deleteUser(false)}>Delete</Button></Col>
                </Row>}
                {edit && <Row>
                    <Col>edit mode on</Col>
                    <Col><Button variant="link" onClick={() => this.editMode(false)}>click here to return</Button></Col>
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