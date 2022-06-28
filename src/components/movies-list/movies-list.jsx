import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export function MoviesList(props) {
    const [movies, setMovies] = useState('');

    if (isProfile) {
        props.favMovies.forEach(i => {
            movie = props.movies.find(m => m._id === props.favMovies[i]);
            movies.push(movie);
        })
    }

    return (
        <Row>
            {movies.map(m =>
                <Col sm={6} md={4} lg={3} key={m._id}>
                    <MovieCard movie={m} />
                    {isProfile && <Button>Delete</Button>}
                </Col>
            )}
        </Row>
    );
}

MoviesList.propTypes = {
    favMovies: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired,
    isProfile: PropTypes.bool.isRequired
}