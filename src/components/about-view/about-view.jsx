import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function AboutView() {
    return (
        <Container className="about-view mt-5">
            <Row className="justify-content-sm-center mt-5">
                <Col sm={9}>
                    <Row className="justify-content-md-center mb-4">
                        <Col className="about_title" lg={10}>
                            <h1 className="value">ABOUT THIS WEBSITE</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mb-5">
                        <Col className="about_text" lg={10}>
                            About here
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mb-4">
                        <Col className="about_dev_title" lg={10}>
                            <h2 className="value">ABOUT THE DEVELOPER</h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mb-4">
                        <Col className="about_dev_text" lg={10}>
                            Liz Stone is a web developer based out of Boston, Massachusetts with a passion for developing clean, practical, and engaging websites. For more information, more websites, or to get in contact, <a href="https://liztheshiz.github.io/portfolio-website/" target="_blank">visit her portfolio website here</a>.
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}