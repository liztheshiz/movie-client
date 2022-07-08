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
                this.setState({ starred: true });
            }).catch(err => console.log(err));
    }

    render() {
        const { movie, listType, removeFromFavorites } = this.props;

        return (
            <>
                <Card className="movie-card my-3 border-dark border-3" /*style={{ width: '18rem' }}*/>
                    <Card.Img variant="top" crossOrigin="anonymous" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                        <Link to={`/movies/titles/${movie._id}`}>
                            <Button variant="outline-dark">View details</Button>
                        </Link>
                        <Button variant="dark" size="sm" onClick={() => { this.addToFavorites(movie); }}>Favorite</Button>
                    </Card.Body>
                </Card >
                {(listType === "profile") && <Row className="justify-content-sm-center mt-3">
                    <Col className="text-center"><Button variant="dark" size="sm" onClick={() => removeFromFavorites(movie._id)}>Remove</Button></Col>
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
    listType: PropTypes.string,
    removeFromFavorites: PropTypes.func
}