import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

//import './object-card.scss';

export class ObjectCard extends React.Component {
    render() {
        const { object } = this.props;

        return (
            <Card className="object-card my-3">
                <Card.Body>
                    <Card.Title className="title fs-4">{object.Key}</Card.Title>
                    <Button className="button" variant="outline-dark" onClick={() => console.log('great job! you clicked the button!')}>Click me</Button>
                </Card.Body>
            </Card >
        );
    }
}

/* <Card.Img className="card_poster" variant="top" crossOrigin="anonymous" src={movie.ImagePath} /> */