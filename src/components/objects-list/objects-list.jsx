import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { ObjectCard } from '../object-card/object-card';

export function ObjectsList(props) {
    const [show, setShow] = useState(false);
    const [imageUrl, setImageUrl] = useState({});

    const { objects } = props;

    const showImage = (key) => {
        axios.get(`http://cinemadbloadbalancer-1051342674.us-east-1.elb.amazonaws.com:8081/images/${key}`, { responseType: "blob" })
            .then((response) => {
                blobToDataURL(response.data, (dataurl) => {
                    setImageUrl(dataurl);
                });
            });
        setShow(true)
    }

    const blobToDataURL = (blob, callback) => {
        var a = new FileReader();
        a.onload = (e) => {
            callback(e.target.result);
        };
        a.readAsDataURL(blob);
    }

    const handleClose = () => setShow(false);

    const handleShow = () => {
        axios.get(`http://cinemadbloadbalancer-1051342674.us-east-1.elb.amazonaws.com:8081/images/lego.jpg`, { responseType: "blob" })
            .then((response) => {
                blobToDataURL(response.data, (dataurl) => {
                    setImageUrl(dataurl);
                });
            });
        setShow(true)
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <img crossOrigin="anonymous" src={imageUrl ? imageUrl : null} />
            </Modal>
            <Row className="justify-content-center">
                {objects.map(m =>
                    <Col xs={11} sm={6} lg={4} xl={3}>
                        <ObjectCard object={m} showImage={showImage} />
                    </Col>
                )}
            </Row>
        </>
    )
}