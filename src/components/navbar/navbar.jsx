import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        MainView.setState({ user: null });
    }


    // LIFECYCLE METHODS

    render() {
        return (
            <Router>
                < Navbar bg="dark" variant="dark" expand="md" >
                    <Container>
                        <Navbar.Brand href="#">CinemaDatabase</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Switch>
                            <Route exact path="/" render={() => {
                                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                                    <Nav className="me-auto">
                                        <Nav.Link href="#">About</Nav.Link>
                                        <Nav.Link href="#">Profile</Nav.Link>
                                        <Nav.Link onClick={() => onLoggedOut()}>Logout</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            }} />
                            <Route path="/moves/:movieId" render={() => {
                                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                                    <Nav className="me-auto">
                                        <Nav.Link href="#">About</Nav.Link>
                                        <Nav.Link href="#">Profile</Nav.Link>
                                        <Nav.Link onClick={() => onLoggedOut()}>Logout</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            }} />
                            <Route exact path="/login" render={() => {
                                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                                    <Nav className="me-auto">
                                        <Nav.Link>test</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            }} />
                        </Switch>
                    </Container>
                </Navbar >
            </Router>
        )
    }
}