import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './navbar.scss';

export class Navbar extends React.Component {
    // CUSTOM METHODS

    // Logs user out of site
    onLoggedOut() {
        localStorage.clear();
        window.open("/", "_self");
    }


    // LIFECYCLE METHODS

    render() {
        return (
            <Navbar className="navbar" variant="dark" expand="md" >
                <Container>
                    <Navbar.Brand className="brand" href="/">CINEMA.DATABASE</Navbar.Brand>
                    {localStorage.getItem('token') && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
                    {localStorage.getItem('token') && <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href={`/users/${localStorage.getItem('user')}`}>Profile</Nav.Link>
                            <Nav.Link onClick={() => this.onLoggedOut()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>}
                </Container>
            </Navbar >
        )
    }
}