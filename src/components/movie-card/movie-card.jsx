import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, listType, removeFromFavorites } = this.props;

        return (
            <>
                <Card className="movie-card my-3 border-dark border-3" /*style={{ width: '18rem' }}*/>
                    <Card.Img variant="top" crossOrigin="anonymous" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title className="title fs-4">{movie.Title.toUpperCase()}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                        <Link to={`/movies/titles/${movie._id}`}>
                            <Button variant="outline-dark">View details</Button>
                        </Link>
                    </Card.Body>
                </Card >
                {(listType === "profile") && <Row className="justify-content-sm-center mt-3">
                    <Col className="text-center"><Button className="button" variant="dark" size="sm" onClick={() => removeFromFavorites(movie._id)}>Remove</Button></Col>
                </Row>}
            </>

        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        }),
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    listType: PropTypes.string.isRequired,
    removeFromFavorites: PropTypes.func
}