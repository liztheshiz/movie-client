import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function MoviesList(props) {
    const { movies, favMovies, listType, removeFromFavorites, name } = props;

    /*if (isProfile) {
        favMovies.forEach(i => {
            movie = movies.find(m => m._id === favMovies[i]);
            movies.push(movie);
        })
    }*/

    const moviesList = movies.filter(m => {
        if (listType === "profile") return favMovies.includes(m._id);
        if (listType === "genre") return m.Genre.Name === name;
        if (listType === "director") return m.Director.Name === name;
    })

    return (
        <Row>
            {moviesList.map(m =>
                <Col sm={6} lg={4} xl={3} key={m._id}>
                    <MovieCard movie={m} listType={listType} removeFromFavorites={removeFromFavorites} />
                </Col>
            )}
        </Row>
    );
}

MoviesList.propTypes = {
    favMovies: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired,
    listType: PropTypes.string.isRequired,
    removeFromFavorites: PropTypes.func,
    name: PropTypes.string
}