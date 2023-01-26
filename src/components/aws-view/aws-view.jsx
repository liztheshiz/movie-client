import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { ObjectsList } from '../../objects-list/objects-list';

import axios from 'axios';

import './aws-view.scss';

export function AwsView() {
    const [displayList, setDisplayList] = useState(false);
    const [objects, setObjects] = useState([]);

    const handleS3Submit = (e) => {
        // keeps page from reloading
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
        // keeps page from reloading
        e.preventDefault();

        console.log('handling submit');
        axios.get('http://cinemadbloadbalancer-1051342674.us-east-1.elb.amazonaws.com:8081/images')
            .then((res) => setObjects(res.data.Contents))
            .then(() => setDisplayList(true));
    }

    return (
        <Container className="aws-view mt-5">
            <Row className="justify-content-sm-center mt-3">
                <Col sm={8} md={6} lg={4}>
                    <h2>AWS File Upload</h2>
                    <Form className="mt-4">
                        <Form.Group controlId="formImage">
                            <Form.Control id="input-file" type="file" name="image" />
                        </Form.Group>
                        <Button className="mt-4" variant="dark" size="sm" type="submit" onClick={handleS3Submit}>Upload</Button>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-sm-center mt-5">
                <Col className="text-center">
                    <Button className="mt-4" variant="outline-dark" size="lg" type="submit" onClick={handleListSubmit}>View Bucket Contents</Button>
                </Col>
            </Row>
            {displayList && <div>
                <Row className="justify-content-sm-center mt-4">
                    <Col sm={8} md={6} lg={4}>
                        <h1>Objects:</h1>
                    </Col>
                </Row>
                <ObjectsList objects={objects} />
            </div>}
        </Container>
    );
}