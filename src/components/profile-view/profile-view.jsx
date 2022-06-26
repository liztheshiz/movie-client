import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class ProfileView extends React.Component {
    // CUSTOM METHODS

    showModal() {
        alert('Show modal!');
    }

    deleteUser() {

    }


    // LIFECYCLE METHODS

    constructor() {
        super();
        this.state = {
            edit: false
        };
    }

    render() {
        const { user } = this.props;

        return (
            <Container className="profile-view border-dark border-3 mt-5">
                <Row className="mt-5">
                    <Col sm={10}>
                        <Row className="mb-4">
                            <Col className="profile-title" xs={3}>
                                <h2 className="value">{user}</h2>
                            </Col>
                            <Col xs={9}>
                                <Button variant="outline-dark" size="sm">Edit user</Button>
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
                                <Button variant="link" onClick={() => this.showModal()}>Click here to delete user</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

ProfileView.propTypes = {
    user: PropTypes.string
}