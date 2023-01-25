import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

import './aws-view.scss';

export function AwsView() {
    const handleS3Submit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        selectedFile = document.getElementById('input-file').files[0];
        formData.append('image', selectedFile);

        axios.post('http://cinemadbloadbalancer-1051342674.us-east-1.elb.amazonaws.com:8081/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    const handleListSubmit = (e) => {
        e.preventDefault();

        console.log('handling submit');
        // list all objects below button by name; button next to each name to view file
    }

    return (
        <Container className="aws-view mt-5">
            <Row className="justify-content-sm-center mt-3">
                <Col sm={8} md={6} lg={4}>
                    <h2>AWS File Upload</h2>
                    <Form>
                        <Form.Group controlId="formImage">
                            <Form.Control id="input-file" type="file" name="image" />
                        </Form.Group>
                        <Button className="mt-4" variant="dark" type="submit" onClick={handleS3Submit}>Upload</Button>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-sm-center mt-3">
                <Col sm={8} md={6} lg={4}>
                    <Button className="mt-4" type="submit" onClick={handleListSubmit}>View Bucket Contents</Button>
                </Col>
            </Row>
        </Container>
    );
}