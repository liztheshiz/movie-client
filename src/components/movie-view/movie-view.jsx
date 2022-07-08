import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

    // Adds given movie to given user's favorites list
    addToFavorites(movie) {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');

        axios.post(`https://cinemadatabase.herokuapp.com/users/${user}/FavoriteMovies/${movie._id}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                alert('It worked!!');
            }).catch(err => console.log(err));
    }

    // Checks if movieid is already present in user's favorites list
    isFavorite(user, movie) {
        return user.FavoriteMovies.includes(movie._id);
    }


    // LIFECYCLE METHODS

    constructor() {
        super();
    }

    render() {
        const { movie, user, onBackClick } = this.props;

        return (
            <Container className="movie-view border-dark border-3 mt-5">
                <Row className="mt-5">
                    <Col sm={10}>
                        <Row className="mb-4">
                            <Col xs={1}>
                                <Button variant="outline-dark" size="sm" onClick={() => { onBackClick(null); }}>&lt;</Button>
                            </Col>
                            <Col className="movie-title" xs={10}>
                                <h2 className="value">{movie.Title}</h2>
                            </Col>
                            {!this.isFavorite(user, movie) && <Col xs={1}>
                                <Button variant="outline-dark" size="sm" onClick={() => { this.addToFavorites(movie); }}>Fav</Button>
                            </Col>}
                        </Row>
                        <Row className="justify-content-md-center mb-3">
                            <Col className="movie-director" lg={10}>
                                <span className="label">Director: </span>
                                <Link to={`/directors/${movie.Director.Name}`}>
                                    <Button variant="link">{movie.Director.Name}</Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="movie-genre" lg={10}>
                                <span className="label">Genre: </span>
                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <Button variant="link">{movie.Genre.Name}</Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="movie-description" lg={10}>
                                <span className="label">Description: </span>
                                <span className="value">{movie.Description}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="movie-poster" sm={2}>
                        <img crossOrigin="anonymous" src={movie.ImagePath} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

MovieView.propTypes = {
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
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}