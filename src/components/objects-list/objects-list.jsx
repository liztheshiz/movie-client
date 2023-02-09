import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import { ObjectCard } from '../object-card/object-card';

export function ObjectsList(props) {
    const [show, setShow] = useState(false);
    const [imageUrl, setImageUrl] = useState({});
    const [isFetching, setIsFetching] = useState(true);
    const [modalTitle, setModalTitle] = useState('');

    const { objects } = props;

    const showImage = (key) => {
        setModalTitle(key);
        axios.get(`http://cinemadbloadbalancer-1051342674.us-east-1.elb.amazonaws.com:8081/images/${key}`, { responseType: "blob" })
            .then((response) => {
                blobToDataURL(response.data, (dataurl) => {
                    setImageUrl(dataurl);
                });
            }).then(() => setIsFetching(false));
        setShow(true)
    }

    const blobToDataURL = (blob, callback) => {
        var a = new FileReader();
        a.onload = (e) => {
            callback(e.target.result);
        };
        a.readAsDataURL(blob);
    }

    const handleClose = () => {
        setShow(false);
        setIsFetching(true);
        setImageUrl({});
        setModalTitle('');
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                {isFetching && <Modal.Body>Loading...</Modal.Body>}
                {!isFetching && <img crossOrigin="anonymous" src={imageUrl ? imageUrl : null} />}
            </Modal>
            <Row className="justify-content-center text-center">
                {objects.map(m =>
                    <Col className="text-center" xs={11} sm={6} lg={4} xl={3}>
                        <ObjectCard object={m} showImage={showImage} />
                    </Col>
                )}
            </Row>
        </>
    )
}

ObjectsList.propTypes = {
    objects: PropTypes.arrayOf(PropTypes.shape({
        ETag: PropTypes.string.isRequired,
        Key: PropTypes.string.isRequired,
        LastModified: PropTypes.string.isRequired,
        Size: PropTypes.number.isRequired,
        StorageClass: PropTypes.string.isRequired
    })).isRequired
}