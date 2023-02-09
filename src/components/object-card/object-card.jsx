import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './object-card.scss';

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
        const string = `thumbnails%2Fthumb-${this.props.object.Key}`;
        axios.get(`http://cinemadbloadbalancer-1051342674.us-east-1.elb.amazonaws.com:8081/images/${string}`, { responseType: "blob" })
            .then((response) => {
                this.blobToDataURL(response.data, (dataurl) => {
                    this.setState({
                        imageUrl: dataurl,
                        isFetching: false
                    });
                });
            });
    }

    getObject(key) {
        this.props.showImage(key);
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
        const { object } = this.props;
        const { imageUrl, isFetching } = this.state;

        return (
            <Card className="object-card my-3">
                {!isFetching && <Card.Img variant="top" crossOrigin="anonymous" src={imageUrl ? imageUrl : null} />}
                {isFetching && <p className="mt-3" >Loading...</p>}
                <Card.Body>
                    <Card.Title className="fs-4">{object.Key}</Card.Title>
                    <Button className="object-button mt-2" variant="outline-dark" size="sm" onClick={() => this.getObject(object.Key)}>View file</Button>
                </Card.Body>
            </Card >
        );
    }
}

ObjectCard.propTypes = {
    object: PropTypes.shape({
        ETag: PropTypes.string.isRequired,
        Key: PropTypes.string.isRequired,
        LastModified: PropTypes.string.isRequired,
        Size: PropTypes.number.isRequired,
        StorageClass: PropTypes.string.isRequired
    }).isRequired,
    showImage: PropTypes.func.isRequired
}