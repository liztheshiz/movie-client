import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//import './object-card.scss';

export class ObjectCard extends React.Component {
    // CUSTOM METHODS
    blobToDataURL(blob, callback) {
        var a = new FileReader();
        a.onload = (e) => {
            callback(e.target.result);
        };
        a.readAsDataURL(blob);
    }

    getObject(object) {
        axios.get(`http://cinemadbloadbalancer-1051342674.us-east-1.elb.amazonaws.com:8081/images/${object.Key}`, { responseType: "blob" })
            .then((response) => {
                this.blobToDataURL(response.data, (dataurl) => {
                    this.setState({
                        imageUrl: dataurl
                    });
                });
            });

        this.setState({
            showImage: true
        });
        console.log('button clicked!');
    }

    // LIFECYCLE METHODS

    constructor(props) {
        super(props);
        this.state = {
            showImage: false,
            imageUrl: {}
        };
    }

    render() {
        const { object } = this.props;
        const { showImage, imageUrl } = this.state;

        return (
            <Card className="object-card my-3">
                <Card.Body>
                    <Card.Title className="title fs-4">{object.Key}</Card.Title>
                    <Button className="button" variant="outline-dark" onClick={() => this.getObject(object)}>View file</Button>
                </Card.Body>
                {showImage && <Card.Img variant="top" crossOrigin="anonymous" src={imageUrl ? imageUrl : null} />}
            </Card >
        );
    }
}

/* <Card.Img className="card_poster" variant="top" crossOrigin="anonymous" src={movie.ImagePath} /> */