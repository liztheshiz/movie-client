import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export class Navbar extends React.Component {
    // CUSTOM METHODS

    getToken() {
        let accessToken = localStorage.getItem('token');
        if (accessToken) {
            return accessToken;
        } else {
            return false;
        }
    }

    onLoggedOut() {
        localStorage.clear();
        window.open("/", "_self");
    }


    // LIFECYCLE METHODS

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="md" >
                <Container>
                    <Navbar.Brand href="/">CinemaDatabase</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            {this.getToken() && <Nav.Link href="/about.html">About</Nav.Link>}
                            {this.getToken() && <Nav.Link href="#">Profile</Nav.Link>}
                            {this.getToken() && <Nav.Link onClick={() => this.onLoggedOut()}>Logout</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        )
    }
}

Navbar.propTypes = {
    user: PropTypes.string
}