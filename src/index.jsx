import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

// Import custom styling
import './index.scss';

// Import components
import { MainView } from './components/main-view/main-view';
import { Navbar } from './components/navbar/navbar';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Container>
                    <MainView />
                </Container>
            </div>
        );
    }

    /*
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="md" >
                <Container>
                    <Navbar.Brand>CinemaDatabase</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link href="#">About</Nav.Link>
                            <Nav.Link href="#">Profile</Nav.Link>
                            <Nav.Link href="#">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        );
    }
    */
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);