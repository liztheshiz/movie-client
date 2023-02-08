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

    getThumbnail() {
        const string = this.props.object.Key;
        const newString = string.replace('/', '%2F');

        axios.get(`http://cinemadbloadbalancer-1051342674.us-east-1.elb.amazonaws.com:8081/images/${newString}`, { responseType: "blob" })
            .then((response) => {
                this.blobToDataURL(response.data, (dataurl) => {
                    this.setState({
                        imageUrl: dataurl
                    });
                });
            }).then(this.setState({ isFetching: false }));
    }

    getObject(showImage) {
        showImage();
        console.log('button clicked!');
    }

    // LIFECYCLE METHODS

    constructor(props) {
        super(props);
        this.state = {
            imageUrl: {},
            isFetching: true
        };
    }

    componentDidMount() {
        this.getThumbnail();
    }

    render() {
        const { object, showImage } = this.props;
        const { imageUrl, isFetching } = this.state;

        return (
            <Card className="object-card my-3">
                <Card.Body>
                    <Card.Title className="title fs-4">{object.Key}</Card.Title>
                    <Button className="button" variant="outline-dark" onClick={() => this.getObject(showImage)}>View file</Button>
                    {isFetching && <p className="mt-3" >Loading...</p>}
                </Card.Body>
                {!isFetching && <Card.Img variant="top" crossOrigin="anonymous" src={imageUrl ? imageUrl : null} />}
            </Card >
        );
    }
}

/* <Card.Img className="card_poster" variant="top" crossOrigin="anonymous" src={movie.ImagePath} /> */