import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//import './object-card.scss';

export class ObjectCard extends React.Component {
    // CUSTOM METHODS

    getObject() {

        this.setState({
            showImage: true
        });
        console.log('button clicked!');
    }

    // LIFECYCLE METHODS

    constructor(props) {
        super(props);
        this.state = {
            showImage: false
        };
    }

    render() {
        const { object } = this.props;
        const { showImage } = this.state;

        return (
            <Card className="object-card my-3">
                <Card.Body>
                    <Card.Title className="title fs-4">{object.Key}</Card.Title>
                    <Button className="button" variant="outline-dark" onClick={() => this.getObject()}>View file</Button>
                </Card.Body>
                {showImage && <Card.Img variant="top" crossOrigin="anonymous" src={'../img/favicon.ico'} />}
            </Card >
        );
    }
}

/* <Card.Img className="card_poster" variant="top" crossOrigin="anonymous" src={movie.ImagePath} /> */