import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export function MoviesList(props) {
    const { movies, favMovies, isProfile } = props;

    /*if (isProfile) {
        favMovies.forEach(i => {
            movie = movies.find(m => m._id === favMovies[i]);
            movies.push(movie);
        })
    }*/

    const favMoviesList = movies.filter(m => {
        return favMovies.includes(m._id)
    })

    return (
        <Row>
            {favMoviesList.map(m =>
                <Col sm={6} lg={4} xl={3} key={m._id}>
                    <MovieCard movie={m} isProfile={isProfile} />
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