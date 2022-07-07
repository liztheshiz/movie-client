import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export class Navbar extends React.Component {
    // CUSTOM METHODS

    // Checks if there is a token stores in localStorage
    // Used to determine if user is logged in
    getToken() {
        let accessToken = localStorage.getItem('token');
        if (accessToken) {
            return accessToken;
        } else {
            return false;
        }
    }

    // Logs user out of site
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
                    {this.getToken() && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
                    {this.getToken() && <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link href="/about.html">About</Nav.Link>
                            <Nav.Link href={`/users/${localStorage.getItem('user')}`}>Profile</Nav.Link>
                            <Nav.Link onClick={() => this.onLoggedOut()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>}
                </Container>
            </Navbar >
        )
    }
}