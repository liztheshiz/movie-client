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
                <Row className="mt-5">
                    <Col sm={10}>
                        <Row className="mb-4">
                            <Col className="profile-title" xs={3}>
                                <h2 className="value">{user}</h2>
                            </Col>
                            <Col xs={9}>
                                <Button variant="outline-dark" size="sm" onClick={() => this.editMode(true)}>edit user</Button>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-3">
                            <Col className="profile-username" lg={10}>
                                <span className="label">Username: </span>
                                <span className="value">{user}</span>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="profile-password" lg={10}>
                                <span className="label">Password: </span>
                                <span className="value">Hidden</span>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="profile-email" lg={10}>
                                <span className="label">Email: </span>
                                <span className="value">email here</span>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="profile-birthday" lg={10}>
                                <span className="label">Birthday: </span>
                                <span className="value">birthday here</span>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="text-center" md={4}>
                                <Button variant="link" onClick={() => this.showModal(true)}>Click here to delete user</Button>
                            </Col>
                        </Row>
                        {edit && <Row>
                            <Col>edit mode on</Col>
                            <Col><Button variant="link" onClick={() => this.editMode(false)}>click here to return</Button></Col>
                        </Row>}
                        {show && <Row>
                            <Col>modal shown</Col>
                            <Col><Button variant="link" onClick={() => this.showModal(false)}>click here to return</Button></Col>
                        </Row>}
                    </Col>
                </Row>
            </Container>
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