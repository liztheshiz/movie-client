import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ObjectCard } from '../object-card/object-card';

export function ObjectsList(props) {
    const { objects } = props;

    const showImage = () => {
        console.log('click function was called!');
    }

    return (
        <Row className="justify-content-center">
            {objects.map(m =>
                <Col xs={11} sm={6} lg={4} xl={3}>
                    <ObjectCard object={m} showImage={showImage} />
                </Col>
            )}
        </Row>
    )
}